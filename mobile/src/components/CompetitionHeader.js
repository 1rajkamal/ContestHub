import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function CompetitionHeader({ competition, isRegistered }) {
  const { t } = useApp();

  if (!competition) return null;

  const maxSpots = competition.maxParticipants || 20;
  const bookedSpots = competition.bookedSpots || 0;
  const spotsLeft = Math.max(0, maxSpots - bookedSpots);
  const progressRatio = Math.min(1, Math.max(0.05, bookedSpots / maxSpots));

  return (
    <View style={styles.card}>
      {/* Top Title & Registration Status Badge */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{competition.title}</Text>
        
        <View
          style={[
            styles.statusBadge,
            isRegistered ? styles.badgeRegistered : styles.badgeUnregistered,
          ]}
        >
          <Ionicons
            name={isRegistered ? 'checkmark-circle' : 'time-outline'}
            size={14}
            color={isRegistered ? theme.colors.primary : theme.colors.textSecondary}
          />
          <Text
            style={[
              styles.statusText,
              isRegistered ? styles.statusTextRegistered : styles.statusTextUnregistered,
            ]}
          >
            {isRegistered ? t('registered') : t('notRegistered')}
          </Text>
        </View>
      </View>

      {/* Tags & Winner Certificate */}
      <View style={styles.tagsRow}>
        {competition.tags?.map((tag, idx) => (
          <View key={idx} style={styles.tagCapsule}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}

        <View style={styles.certificateContainer}>
          <Ionicons name="trophy-outline" size={15} color={theme.colors.primary} />
          <Text style={styles.certificateText}>
            {competition.winnerCertificate || t('winnersCertificate')}
          </Text>
        </View>
      </View>

      {/* Metrics Row: Prize Pool, Entry Fee, and Availability Progress */}
      <View style={styles.metricsRow}>
        {/* Prize Pool */}
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>{t('prizePool')}</Text>
          <Text style={styles.prizeAmount}>₹ {competition.prizePool?.toLocaleString('en-IN')}</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>{t('entryFee')}</Text>
          <Text style={styles.feeAmount}>₹ {competition.entryFee}</Text>
        </View>

        {/* Spots Left & Progress Bar */}
        <View style={styles.spotsCol}>
          <View style={styles.spotsHeader}>
            <Ionicons name="people-outline" size={14} color={theme.colors.primary} />
            <Text style={styles.spotsText}>
              {spotsLeft === 0
                ? t('compFull')
                : t('spotsLeft', { count: spotsLeft })}
            </Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressRatio * 100}%` },
              ]}
            />
          </View>

          {/* Booked Ratio */}
          <Text style={styles.bookedRatio}>
            {t('booked', { booked: bookedSpots, max: maxSpots })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    ...theme.shadows.card,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
    flexShrink: 0,
  },
  badgeRegistered: {
    backgroundColor: '#E6F4F1',
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  badgeUnregistered: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextRegistered: {
    color: theme.colors.primary,
  },
  statusTextUnregistered: {
    color: theme.colors.textSecondary,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    marginBottom: 16,
  },
  tagCapsule: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  certificateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 4,
  },
  certificateText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 6,
  },
  metricCol: {
    flex: 0.9,
  },
  metricLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  prizeAmount: {
    fontSize: 19,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  feeAmount: {
    fontSize: 19,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  spotsCol: {
    flex: 1.4,
    alignItems: 'flex-end',
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  spotsText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  progressBarTrack: {
    height: 6,
    width: '100%',
    backgroundColor: '#D1EAE5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  bookedRatio: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});
