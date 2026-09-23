const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../src/config/db');
const Competition = require('../src/models/Competition');
const User = require('../src/models/User');
const Registration = require('../src/models/Registration');
const registrationService = require('../src/services/registrationService');
const competitionService = require('../src/services/competitionService');

async function runConcurrencyAndBusinessLogicTests() {
  console.log('\n============================================================');
  console.log('🧪 RUNNING CONCURRENCY & BUSINESS LOGIC TEST SUITE');
  console.log('============================================================\n');

  await connectDB();

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      throw new Error(`Test failed: ${testName}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // TEST 1: Concurrent Registration Capacity Safety
    // -------------------------------------------------------------
    console.log('[Test 1] Testing 25 simultaneous concurrent registrations for 5 spots...');
    const capacityComp = await Competition.create({
      title: 'Concurrency Test Classical Dance',
      category: 'Dance',
      prizePool: 1000,
      entryFee: 50,
      maxParticipants: 5, // Strict limit of 5
      bookedSpots: 0,
      registrationDeadline: new Date(Date.now() + 86400 * 1000),
      submissionStart: new Date(),
      submissionEnd: new Date(Date.now() + 86400 * 2000),
      resultDate: new Date(Date.now() + 86400 * 3000),
      judge: { name: 'Test Judge', title: 'Dancer', experience: '10y' },
      about: { shortDescription: 'Short', fullDescription: 'Full' },
    });

    // Create 25 separate users
    const users = [];
    for (let i = 0; i < 25; i++) {
      const u = await User.create({
        name: `User_${i}`,
        email: `concurrent_user_${Date.now()}_${i}@test.com`,
      });
      users.push(u);
    }

    // Fire all 25 parallel registration promises at once
    const registrationPromises = users.map((user) =>
      registrationService.registerUserForCompetition({
        competitionId: capacityComp._id,
        userId: user._id,
        paymentDetails: { paymentId: `mock_pay_${user._id}` },
      })
    );

    const results = await Promise.allSettled(registrationPromises);

    const successfulRegistrations = results.filter((r) => r.status === 'fulfilled');
    const rejectedRegistrations = results.filter((r) => r.status === 'rejected');

    const freshComp = await Competition.findById(capacityComp._id);
    const dbRegistrationCount = await Registration.countDocuments({ competitionId: capacityComp._id });

    console.log(`    → Total Concurrent Requests: 25`);
    console.log(`    → Successful (Fulfilled): ${successfulRegistrations.length}`);
    console.log(`    → Rejected (Capacity Exceeded): ${rejectedRegistrations.length}`);
    console.log(`    → Final DB bookedSpots: ${freshComp.bookedSpots} / ${freshComp.maxParticipants}`);
    console.log(`    → Actual DB Registrations: ${dbRegistrationCount}`);

    assert(successfulRegistrations.length === 5, 'Exactly 5 concurrent registrations succeeded');
    assert(rejectedRegistrations.length === 20, 'Exactly 20 concurrent registrations were safely rejected');
    assert(freshComp.bookedSpots === 5, 'Competition bookedSpots in database is strictly 5 (never 6+)');
    assert(dbRegistrationCount === 5, 'Total registration documents in MongoDB is strictly 5');

    // -------------------------------------------------------------
    // TEST 2: Duplicate Registration Protection
    // -------------------------------------------------------------
    console.log('\n[Test 2] Testing duplicate registration prevention for same user...');
    const singleUser = await User.create({
      name: 'Single User',
      email: `single_user_${Date.now()}@test.com`,
    });

    const dupComp = await Competition.create({
      title: 'Duplicate Test Dance',
      prizePool: 500,
      entryFee: 10,
      maxParticipants: 10,
      bookedSpots: 0,
      registrationDeadline: new Date(Date.now() + 86400 * 1000),
      submissionStart: new Date(),
      submissionEnd: new Date(Date.now() + 86400 * 2000),
      resultDate: new Date(Date.now() + 86400 * 3000),
      judge: { name: 'Judge', title: 'Dancer', experience: '5y' },
      about: { shortDescription: 'Short', fullDescription: 'Full' },
    });

    // Fire 5 duplicate requests for the exact same user in parallel
    const dupPromises = [1, 2, 3, 4, 5].map(() =>
      registrationService.registerUserForCompetition({
        competitionId: dupComp._id,
        userId: singleUser._id,
        paymentDetails: { paymentId: 'dup_pay' },
      })
    );

    const dupResults = await Promise.allSettled(dupPromises);
    const dupSuccess = dupResults.filter((r) => r.status === 'fulfilled');
    const dupRejected = dupResults.filter((r) => r.status === 'rejected');

    const freshDupComp = await Competition.findById(dupComp._id);
    const dupRegCount = await Registration.countDocuments({ competitionId: dupComp._id, userId: singleUser._id });

    assert(dupSuccess.length === 1, 'Only 1 registration succeeded for the duplicate user');
    assert(dupRejected.length === 4, 'Remaining 4 duplicate requests were rejected with 409 Conflict');
    assert(freshDupComp.bookedSpots === 1, 'Booked spots incremented only once despite parallel calls');
    assert(dupRegCount === 1, 'MongoDB contains strictly 1 registration record for the user');

    // -------------------------------------------------------------
    // TEST 3: Registration After Deadline Rejected
    // -------------------------------------------------------------
    console.log('\n[Test 3] Testing registration after deadline has passed...');
    const expiredComp = await Competition.create({
      title: 'Expired Deadline Competition',
      prizePool: 500,
      entryFee: 10,
      maxParticipants: 10,
      bookedSpots: 0,
      registrationDeadline: new Date(Date.now() - 3600 * 1000), // 1 hour ago
      submissionStart: new Date(),
      submissionEnd: new Date(Date.now() + 86400 * 1000),
      resultDate: new Date(Date.now() + 86400 * 2000),
      judge: { name: 'Judge', title: 'Dancer', experience: '5y' },
      about: { shortDescription: 'Short', fullDescription: 'Full' },
    });

    let expiredError = null;
    try {
      await registrationService.registerUserForCompetition({
        competitionId: expiredComp._id,
        userId: singleUser._id,
      });
    } catch (err) {
      expiredError = err;
    }

    assert(expiredError !== null, 'Registration rejected when deadline passed');
    assert(expiredError.statusCode === 400, 'Returned HTTP 400 Bad Request');
    assert(expiredError.code === 'DEADLINE_PASSED', 'Returned error code DEADLINE_PASSED');

    // -------------------------------------------------------------
    // TEST 4: Submission Timing and Eligibility Validation
    // -------------------------------------------------------------
    console.log('\n[Test 4] Testing submission validation (unregistered vs registered)...');
    const unregUser = await User.create({
      name: 'Unregistered User',
      email: `unregistered_${Date.now()}@test.com`,
    });

    let subError = null;
    try {
      await competitionService.submitEntry({
        competitionId: dupComp._id,
        userId: unregUser._id,
        title: 'Kathak Dance',
        videoUrl: 'https://youtube.com/watch?v=demo',
      });
    } catch (err) {
      subError = err;
    }

    assert(subError !== null, 'Unregistered user rejected from uploading submission');
    assert(subError.statusCode === 403, 'Returned HTTP 403 Forbidden');
    assert(subError.code === 'NOT_REGISTERED', 'Returned error code NOT_REGISTERED');

    // Registered user submitting
    const validSubmission = await competitionService.submitEntry({
      competitionId: dupComp._id,
      userId: singleUser._id,
      title: 'Kathak Tarana Performance',
      danceStyle: 'Kathak',
      videoUrl: 'https://storage.feedants.com/videos/sub1.mp4',
      notes: 'Recorded in Delhi auditorium',
    });

    assert(validSubmission !== null, 'Registered user can successfully submit performance');
    assert(validSubmission.status === 'SUBMITTED', 'Submission status is SUBMITTED');

    console.log('\n============================================================');
    console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
    console.log('============================================================\n');
  } catch (err) {
    console.error('\n❌ Test suite failed with error:', err);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

runConcurrencyAndBusinessLogicTests()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
