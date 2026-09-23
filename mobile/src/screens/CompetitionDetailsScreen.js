import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { theme } from '../styles/theme';
import { api } from '../api/client';
import { useApp } from '../context/AppContext';

// Components
import TopNav from '../components/TopNav';
import CompetitionHeader from '../components/CompetitionHeader';
import JudgeCard from '../components/JudgeCard';
import CountdownBanner from '../components/CountdownBanner';
import ImportantDates from '../components/ImportantDates';
import PreviousWinners from '../components/PreviousWinners';
import CompetitionTabs from '../components/CompetitionTabs';
import RewardsList from '../components/RewardsList';
import Disclaimer from '../components/Disclaimer';
import PolicyAndPrizeInfo from '../components/PolicyAndPrizeInfo';
import ReferralCard from '../components/ReferralCard';
import UserReviews from '../components/UserReviews';
import AdPlaceholder from '../components/AdPlaceholder';
import BottomCTA from '../components/BottomCTA';
import BottomNavigation from '../components/BottomNavigation';

// Modals
import VideoModal from '../components/Modals/VideoModal';
import SubmissionModal from '../components/Modals/SubmissionModal';
import RefundModal from '../components/Modals/RefundModal';
import ReviewsModal from '../components/Modals/ReviewsModal';
import UserSwitcherModal from '../components/Modals/UserSwitcherModal';

export default function CompetitionDetailsScreen() {
  const { currentUser, setCurrentUser, setDemoUsers, t, showToast, toastMessage } = useApp();
  const scrollViewRef = React.useRef(null);

  const [competition, setCompetition] = useState(null);
  const [winners, setWinners] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [referralLink, setReferralLink] = useState('https://feedants.com/r/referral123');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Active Modals
  const [activeModal, setActiveModal] = useState(null); // { type: 'video'|'submission'|'refund'|'reviews'|'userSwitcher', data: ... }
  const [activeNavTab, setActiveNavTab] = useState('competitions');

  // Load Competition and related datasets from Backend API
  const loadData = useCallback(async () => {
    try {
      setError(null);
      // 1. Fetch competition list and demo users in parallel
      const [compsRes, usersRes] = await Promise.all([
        api.getCompetitions(),
        api.getDemoUsers().catch(() => ({ data: [] })),
      ]);
      const compList = compsRes.data || [];
      const targetCompId = compList[0]?._id;

      if (!targetCompId) {
        throw new Error('No active competitions found on server.');
      }

      let activeUserId = currentUser?._id;
      if (usersRes.data && usersRes.data.length > 0) {
        setDemoUsers(usersRes.data);
        const urlUser = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('user') : null;
        if (urlUser === 'priya') {
          const priya = usersRes.data.find((u) => u.name.includes('Priya')) || usersRes.data[1];
          if (priya) {
            setCurrentUser(priya);
            activeUserId = priya._id;
          }
        } else if (!currentUser?._id || !usersRes.data.some((u) => u._id === currentUser._id)) {
          setCurrentUser(usersRes.data[0]);
          activeUserId = usersRes.data[0]._id;
        }
      }

      // 2. Fetch full details with user dynamic state
      const compDetails = await api.getCompetitionById(targetCompId, activeUserId);
      setCompetition(compDetails.data);

      // 3. Fetch winners, reviews, referral in parallel
      const [winnersRes, reviewsRes, refRes] = await Promise.all([
        api.getWinners(targetCompId).catch(() => ({ data: [] })),
        api.getReviews(targetCompId).catch(() => ({ data: [] })),
        api.getReferral(targetCompId, currentUser?._id).catch(() => ({
          data: { referralLink: `https://feedants.com/r/${currentUser?.referralCode || 'referral123'}` },
        })),
      ]);

      setWinners(winnersRes.data || []);
      setReviews(reviewsRes.data || []);
      if (refRes.data?.referralLink) {
        setReferralLink(refRes.data.referralLink);
      }
    } catch (err) {
      console.error('[Screen] Load data failed:', err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const modalParam = p.get('modal');
      if (modalParam === 'submission') {
        setActiveModal({ type: 'submission' });
      } else if (modalParam === 'video') {
        setActiveModal({
          type: 'video',
          data: {
            title: 'Smt. Manju Dubey — Intro Video',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            judgeName: 'Manju Dubey',
          },
        });
      } else if (modalParam === 'switcher') {
        setActiveModal({ type: 'userSwitcher' });
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && !loading) {
      const p = new URLSearchParams(window.location.search);
      if (p.get('scroll') === 'bottom') {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 850, animated: false });
        }, 500);
      }
    }
  }, [loading]);

  // Pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  // User Registration Handler
  const handleRegister = async () => {
    if (!competition) return;
    setActionLoading(true);

    try {
      const res = await api.register(competition._id, currentUser._id);
      showToast(t('registrationSuccess'));
      // Update local state to reflect registered immediately
      setCompetition((prev) => ({
        ...prev,
        bookedSpots: res.bookedSpots,
        userParticipation: {
          ...prev.userParticipation,
          isRegistered: true,
          registration: res.registration,
        },
      }));
    } catch (err) {
      const msg = err.data?.error || err.message || 'Registration failed';
      if (Platform.OS === 'web') {
        alert(`Registration Error: ${msg}`);
      } else {
        Alert.alert('Registration Failed', msg);
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Upload Submission Handler
  const handleSubmitEntry = async (submissionPayload) => {
    if (!competition) return;
    const res = await api.submitEntry(competition._id, {
      ...submissionPayload,
      userId: currentUser._id,
    });
    setCompetition((prev) => ({
      ...prev,
      userParticipation: {
        ...prev.userParticipation,
        hasSubmitted: true,
        submission: res.data,
      },
    }));
  };

  // Bottom CTA Click
  const handleBottomCTAPress = () => {
    const isRegistered = Boolean(competition?.userParticipation?.isRegistered);

    if (!isRegistered) {
      // Trigger Registration Flow
      handleRegister();
    } else {
      // Open Submission Dialog
      setActiveModal({
        type: 'submission',
        data: competition?.userParticipation?.submission,
      });
    }
  };

  // Video Modals
  const handlePlayJudgeVideo = (judge) => {
    setActiveModal({
      type: 'video',
      data: {
        title: `${judge.name} — Intro & Masterclass`,
        subtitle: judge.title,
        videoUrl: judge.introVideoUrl,
      },
    });
  };

  const handlePlayWinnerVideo = (winner) => {
    setActiveModal({
      type: 'video',
      data: {
        title: `${winner.name} (${winner.position})`,
        subtitle: `${winner.danceStyle} Performance Recital`,
        videoUrl: winner.videoUrl,
      },
    });
  };

  const handlePlayPrizeVideo = () => {
    setActiveModal({
      type: 'video',
      data: {
        title: 'Prize Money Distribution Process',
        subtitle: 'UPI & Instant Bank Transfer via Razorpay',
        videoUrl:
          competition?.prizeMoneyInfo?.videoUrl ||
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    });
  };

  // Loading State
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading Competition Details...</Text>
      </SafeAreaView>
    );
  }

  // Error State
  if (error && !competition) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Failed to Load</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <Text style={styles.retryHint}>Please verify the API server is running on port 5000.</Text>
      </SafeAreaView>
    );
  }

  const isUserRegistered = Boolean(competition?.userParticipation?.isRegistered);
  const hasUserSubmitted = Boolean(competition?.userParticipation?.hasSubmitted);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Frame wrapper keeps mobile screen layout centered and responsive */}
      <View style={styles.appContainer}>
        {/* Top Header */}
        <TopNav
          onBack={() => {
            if (Platform.OS === 'web') alert('Back pressed');
          }}
          onOpenUserSwitcher={() => setActiveModal({ type: 'userSwitcher' })}
        />

        {/* Scrollable Competition Details */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          }
        >
          {/* 1. Header Card (Title, Badges, Fee, Spots, Progress) */}
          <CompetitionHeader
            competition={competition}
            isRegistered={isUserRegistered}
          />

          {/* 2. Judge Card */}
          <JudgeCard
            judge={competition?.judge}
            onPlayVideo={handlePlayJudgeVideo}
          />

          {/* 3. Live Registration Countdown Banner */}
          <CountdownBanner
            targetDate={competition?.registrationDeadline}
          />

          {/* 4. Important Dates (2x2 Grid) */}
          <ImportantDates competition={competition} />

          {/* 5. Previous Winners (Horizontal FlatList) */}
          <PreviousWinners
            winners={winners}
            onSelectWinner={handlePlayWinnerVideo}
          />

          {/* 6. Tabs: About / Judging Parameters / Rules */}
          <CompetitionTabs competition={competition} />

          {/* 7. Rewards List (All 6 Positions) */}
          <RewardsList rewards={competition?.rewards} />

          {/* 8. Disclaimer Banner */}
          <Disclaimer text={competition?.disclaimer} />

          {/* 9. Policy & Prize Information Grid */}
          <PolicyAndPrizeInfo
            onOpenPrizeVideo={handlePlayPrizeVideo}
            onOpenRefundPolicy={() =>
              setActiveModal({
                type: 'refund',
                data: competition?.refundPolicy,
              })
            }
          />

          {/* 10. Referral & Earn Discount Banner */}
          <ReferralCard referralLink={referralLink} />

          {/* 11. User Reviews Row */}
          <UserReviews
            onOpenReviews={() =>
              setActiveModal({
                type: 'reviews',
                data: reviews,
              })
            }
          />

          {/* 12. Ad Placeholder */}
          <AdPlaceholder />

          {/* Spacing for floating bottom bar */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Floating / Sticky Bottom Action CTA */}
        <BottomCTA
          competition={competition}
          isRegistered={isUserRegistered}
          hasSubmitted={hasUserSubmitted}
          isLoading={actionLoading}
          onPressCTA={handleBottomCTAPress}
        />

        {/* Bottom 5-Tab Navigation Bar */}
        <BottomNavigation
          activeTab={activeNavTab}
          onTabPress={(tab) => {
            setActiveNavTab(tab);
            if (tab === 'profile') {
              setActiveModal({ type: 'userSwitcher' });
            }
          }}
        />
      </View>

      {/* Interactive Modals */}
      {activeModal?.type === 'video' && (
        <VideoModal
          visible
          title={activeModal.data?.title}
          subtitle={activeModal.data?.subtitle}
          videoUrl={activeModal.data?.videoUrl}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal?.type === 'submission' && (
        <SubmissionModal
          visible
          competitionId={competition?._id}
          existingSubmission={activeModal.data}
          onSubmit={handleSubmitEntry}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal?.type === 'refund' && (
        <RefundModal
          visible
          policy={activeModal.data}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal?.type === 'reviews' && (
        <ReviewsModal
          visible
          reviews={reviews}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal?.type === 'userSwitcher' && (
        <UserSwitcherModal
          visible
          onClose={() => setActiveModal(null)}
          onUserChanged={() => loadData()}
        />
      )}

      {/* Floating Toast Message */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480, // Keeps smartphone aspect ratio on web/desktop view
    alignSelf: 'center',
    backgroundColor: '#F5F7FA',
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryHint: {
    fontSize: 11,
    color: '#94A3B8',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    ...theme.shadows.float,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
