/**
 * Computes dynamic competition lifecycle state based on authoritative dates and spots.
 * Ensures the system does not rely on a stale manually stored string status.
 */
function computeCompetitionLifecycle(competition, now = new Date()) {
  const currentTime = now.getTime();
  const regDeadlineTime = new Date(competition.registrationDeadline).getTime();
  const subStartTime = new Date(competition.submissionStart).getTime();
  const subEndTime = new Date(competition.submissionEnd).getTime();
  const resultDateTime = new Date(competition.resultDate).getTime();

  const isFull = competition.bookedSpots >= competition.maxParticipants;
  const isRegistrationDeadlinePassed = currentTime >= regDeadlineTime;
  const isSubmissionNotStarted = currentTime < subStartTime;
  const isSubmissionOpen = currentTime >= subStartTime && currentTime <= subEndTime;
  const isSubmissionEnded = currentTime > subEndTime;
  const isResultDeclared = currentTime >= resultDateTime;

  const isRegistrationOpen =
    !isRegistrationDeadlinePassed &&
    !isFull &&
    competition.status !== 'ENDED' &&
    competition.status !== 'REGISTRATION_CLOSED';

  let computedStatus = competition.status;

  if (isResultDeclared || competition.status === 'ENDED') {
    computedStatus = 'ENDED';
  } else if (isSubmissionEnded) {
    computedStatus = 'SUBMISSION_CLOSED';
  } else if (isSubmissionOpen) {
    computedStatus = 'SUBMISSION_OPEN';
  } else if (isFull && !isRegistrationDeadlinePassed) {
    computedStatus = 'COMPETITION_FULL';
  } else if (isRegistrationDeadlinePassed) {
    computedStatus = 'REGISTRATION_CLOSED';
  } else if (isRegistrationOpen) {
    computedStatus = 'REGISTRATION_OPEN';
  }

  const remainingSpots = Math.max(0, competition.maxParticipants - competition.bookedSpots);
  const remainingRegistrationMs = Math.max(0, regDeadlineTime - currentTime);

  return {
    computedStatus,
    isRegistrationOpen,
    isFull,
    isRegistrationDeadlinePassed,
    isSubmissionNotStarted,
    isSubmissionOpen,
    isSubmissionEnded,
    isResultDeclared,
    remainingSpots,
    bookedRatio: `${competition.bookedSpots} / ${competition.maxParticipants} Booked`,
    remainingRegistrationMs,
    serverTimestamp: now.toISOString(),
  };
}

module.exports = { computeCompetitionLifecycle };
