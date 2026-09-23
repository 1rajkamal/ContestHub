import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function RewardsList({ rewards }) {
  const { t } = useApp();

  if (!rewards || rewards.length === 0) return null;

  const renderRewardIcon = (iconType, pos) => {
    if (pos === 1 || iconType === 'gold') {
      return <Text style={styles.emojiIcon}>🏆</Text>;
    }
    if (pos === 2 || iconType === 'silver') {
      return <Text style={styles.emojiIcon}>🥈</Text>;
    }
    if (pos === 3 || iconType === 'bronze') {
      return <Text style={styles.emojiIcon}>🥉</Text>;
    }
    return (
      <Ionicons
        name="star-outline"
        size={17}
        color="#0284C7"
        style={styles.starIcon}
      />
    );
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('rewards')}</Text>
        <Text style={styles.subtitle}>{t('allPositions')}</Text>
      </View>

      {/* Rewards List */}
      <View style={styles.list}>
        {rewards.map((reward, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index !== rewards.length - 1 && styles.rowDivider,
            ]}
          >
            {/* Position Title & Icon */}
            <View style={styles.posInfo}>
              {renderRewardIcon(reward.iconType, reward.position)}
              <Text style={styles.positionText}>{reward.title}</Text>
            </View>

            {/* Amount */}
            <Text style={styles.amountText}>
              ₹ {reward.amount?.toLocaleString('en-IN')}
            </Text>
          </View>
        ))}
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
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    ...theme.shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  list: {
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  posInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emojiIcon: {
    fontSize: 16,
  },
  starIcon: {
    width: 20,
    textAlign: 'center',
  },
  positionText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
