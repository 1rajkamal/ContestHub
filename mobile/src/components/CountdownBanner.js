import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useCountdown } from '../hooks/useCountdown';
import { useApp } from '../context/AppContext';

export default function CountdownBanner({ targetDate }) {
  const { t } = useApp();
  const { formatted, isExpired } = useCountdown(targetDate);

  return (
    <View style={styles.banner}>
      {/* Left: Hourglass & Label */}
      <View style={styles.leftSection}>
        <Ionicons name="hourglass-outline" size={17} color={theme.colors.primary} />
        <Text style={styles.label}>{t('closesIn')}</Text>
      </View>

      {/* Center: Live Dynamic Countdown */}
      <View style={styles.timerSection}>
        <Text style={styles.timerText}>
          {isExpired ? '00d : 00h : 00m : 00s' : formatted}
        </Text>
      </View>

      {/* Right: Stopwatch & Hurry up! */}
      <View style={styles.rightSection}>
        <MaterialCommunityIcons name="timer-outline" size={18} color={theme.colors.primary} />
        <Text style={styles.hurryText}>{isExpired ? t('regClosed') : t('hurryUp')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#E8F7F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D4EFEA',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
  },
  timerSection: {
    paddingHorizontal: 4,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hurryText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
