const mongoose = require('mongoose');
const Competition = require('../src/models/Competition');
const User = require('../src/models/User');
const Registration = require('../src/models/Registration');
const Submission = require('../src/models/Submission');
const PreviousWinner = require('../src/models/PreviousWinner');
const Review = require('../src/models/Review');
const { connectDB, disconnectDB } = require('../src/config/db');

async function seedData() {
  console.log('[Seed] Starting database seed with Feedants reference data...');

  // Clear existing collections
  await Competition.deleteMany({});
  await User.deleteMany({});
  await Registration.deleteMany({});
  await Submission.deleteMany({});
  await PreviousWinner.deleteMany({});
  await Review.deleteMany({});

  // 1. Create Demo Users
  const user1 = await User.create({
    name: 'Rohan Sharma',
    email: 'rohan@example.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    referralCode: 'referral123',
    walletBalance: 50,
  });

  const user2 = await User.create({
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 12345',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    referralCode: 'priya456',
    walletBalance: 0,
  });

  // Calculate dynamic dates matching the reference countdown (approx 1 day, 6 hours, 28 minutes)
  const now = new Date();
  const registrationDeadline = new Date(now.getTime() + (1 * 86400 + 6 * 3600 + 28 * 60 + 32) * 1000);
  const submissionStart = new Date(now.getTime() - 2 * 86400 * 1000); // Already open
  const submissionEnd = new Date(now.getTime() + 15 * 86400 * 1000);
  const resultDate = new Date(now.getTime() + 18 * 86400 * 1000);

  // 2. Create the Primary Competition
  const competition = await Competition.create({
    title: 'Feedants Classical Dance',
    category: 'Dance',
    tags: ['Dance', 'Multi-Win'],
    winnerCertificate: 'Winners get certificate',
    prizePool: 1500,
    entryFee: 99,
    maxParticipants: 20,
    bookedSpots: 1, // 1/20 Booked, leaving 19 spots left
    registrationDeadline,
    submissionStart,
    submissionEnd,
    resultDate,
    status: 'REGISTRATION_OPEN',
    judge: {
      name: 'Manju Dubey',
      title: 'Professional Kathak Dancer',
      experience: '12+ Years of Experience',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      bio: 'Smt. Manju Dubey is an accomplished Kathak exponent with over 12 years of performance, choreography, and teaching experience. She has performed at premier Indian classical festivals globally.',
    },
    about: {
      shortDescription:
        'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
      fullDescription:
        'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.\n\nWhether you specialize in Kathak, Bharatanatyam, Odissi, Kathakali, or Mohiniyattam, this competition offers a national stage to showcase your technique, rhythm, and abhinaya. Certified master judges evaluate every video entry with constructive feedback. All participants receive verified certificates, and top performers share from the guaranteed ₹1,500 prize pool!',
    },
    judgingParameters: [
      {
        title: 'Taal & Rhythm (ताल और लय)',
        weightage: '30%',
        description: 'Accuracy of beats, tempo control, and footwork synchronization.',
      },
      {
        title: 'Bhava & Expressions (भाव और अभिनय)',
        weightage: '30%',
        description: 'Facial expressions, storytelling, eye movements, and emotional depth.',
      },
      {
        title: 'Mudras & Posture (मुद्रा और अंगशुद्धि)',
        weightage: '20%',
        description: 'Clarity of hand gestures, body alignment, and technical precision.',
      },
      {
        title: 'Costume & Presentation (वेशभूषा और प्रस्तुति)',
        weightage: '20%',
        description: 'Authenticity of classical attire, stage presence, and overall aesthetic appeal.',
      },
    ],
    rulesAndEligibility: [
      {
        title: 'Eligibility',
        rule: 'Open to classical dance enthusiasts of all age groups and skill levels across India.',
      },
      {
        title: 'Video Duration',
        rule: 'Performance video must be between 2 to 3 minutes in length.',
      },
      {
        title: 'Solo Performance',
        rule: 'Only solo entries are allowed. Group performances will not be evaluated.',
      },
      {
        title: 'Recording Format',
        rule: 'Record in landscape orientation with full body visible and good lighting.',
      },
      {
        title: 'Audio Quality',
        rule: 'Ensure original classical audio track is clear without heavy background interference.',
      },
      {
        title: 'Original Content',
        rule: 'The video must be recent and performed by the registered participant.',
      },
    ],
    rewards: [
      { position: 1, title: '1st Winner', amount: 550, iconType: 'gold' },
      { position: 2, title: '2nd Winner', amount: 300, iconType: 'silver' },
      { position: 3, title: '3rd Winner', amount: 240, iconType: 'bronze' },
      { position: 4, title: '4th Winner', amount: 200, iconType: 'star' },
      { position: 5, title: '5th Winner', amount: 130, iconType: 'star' },
      { position: 6, title: '6th Winner', amount: 80, iconType: 'star' },
    ],
    disclaimer: 'Only contributions from paid participants will be considered for judging.',
    prizeMoneyInfo: {
      title: 'How will you receive prize money?',
      subtitle: 'Watch video to know more',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description:
        'Winners are verified upon result announcement. Prize money is deposited directly to your registered UPI ID or Bank Account within 48 hours powered by instant automated payouts.',
    },
    referralProgram: {
      headline: 'Refer & Earn more discount',
      rewardPerSignup: 10,
      rewardText: 'You earn ₹10 for every signup',
      referralBaseUrl: 'https://feedants.com/r/',
    },
    refundPolicy: {
      title: 'Refund policy',
      terms: [
        'Full 100% refund is processed automatically if the competition is cancelled or rescheduled by Feedants.',
        'Participants may request a cancellation up to 24 hours prior to the registration deadline.',
        'No refunds are applicable once the video submission window closes and judging commences.',
        'All approved refunds are credited back to the original payment source within 3-5 business days.',
      ],
    },
    paymentGateway: {
      provider: 'Razorpay',
      badgeText: 'Secure payments powered by',
      isTestMode: true,
    },
  });

  // 3. Register user1 (Rohan) so the default screen matches the "Registered" state in Objective_Page.png!
  await Registration.create({
    competitionId: competition._id,
    userId: user1._id,
    paymentStatus: 'COMPLETED',
    paymentId: 'pay_razor_test_1001',
    amountPaid: 99,
    registeredAt: new Date(now.getTime() - 3600 * 1000),
  });

  // 4. Create Previous Winners from the design reference
  await PreviousWinner.insertMany([
    {
      competitionId: competition._id,
      name: 'Riya Shah',
      position: '1st Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      danceStyle: 'Kathak Tarana',
      rankOrder: 1,
    },
    {
      competitionId: competition._id,
      name: 'Aarav Mehta',
      position: '1st Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      danceStyle: 'Bharatanatyam Alarippu',
      rankOrder: 2,
    },
    {
      competitionId: competition._id,
      name: 'Neha Verma',
      position: '2nd Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      danceStyle: 'Kathak Thumri',
      rankOrder: 3,
    },
    {
      competitionId: competition._id,
      name: 'Ishita Chouhan',
      position: '3rd Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      danceStyle: 'Odissi Mangalacharan',
      rankOrder: 4,
    },
  ]);

  // 5. Create Participant Reviews & Testimonials
  await Review.insertMany([
    {
      competitionId: competition._id,
      userName: 'Ananya Deshmukh',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      userRole: 'Classical Dancer & Past Winner',
      rating: 5,
      comment:
        'Feedants provided such an authentic platform! Judge Manju Ma’am provided detailed feedback on my footwork. Received my prize money directly via UPI within 24 hours!',
    },
    {
      competitionId: competition._id,
      userName: 'Kunal Trivedi',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      userRole: 'Dance Academy Instructor',
      rating: 5,
      comment:
        'The competition structure, rules, and judging criteria are transparent. My students participated and gained massive confidence.',
    },
    {
      competitionId: competition._id,
      userName: 'Shalini Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      userRole: 'Kathak Practitioner',
      rating: 5,
      comment:
        'Loved the seamless registration and video submission process. The certificate looks prestigious and the community is very supportive.',
    },
  ]);

  console.log('[Seed] Database seeded successfully!');
  console.log(`[Seed] Competition ID: ${competition._id}`);
  console.log(`[Seed] Demo Registered User ID (Rohan): ${user1._id}`);
  console.log(`[Seed] Demo Unregistered User ID (Priya): ${user2._id}`);

  return {
    competitionId: competition._id,
    user1Id: user1._id,
    user2Id: user2._id,
  };
}

// Standalone execution support
if (require.main === module) {
  require('dotenv').config();
  connectDB()
    .then(() => seedData())
    .then(() => disconnectDB())
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Seed] Error during seeding:', err);
      process.exit(1);
    });
}

module.exports = { seedData };
