import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function PolicyAndPrizeInfo({ onOpenPrizeVideo, onOpenRefundPolicy }) {
  const { t } = useApp();

  return (
    <View style={styles.grid}>
      {/* Left Card: Prize Money Video */}
      <TouchableOpacity
        style={styles.card}
        onPress={onOpenPrizeVideo}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="How will you receive prize money"
      >
        <View style={styles.playIconCircle}>
          <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
        </View>
        <View style={styles.prizeTextContainer}>
          <Text style={styles.prizeTitle}>{t('howReceivePrize')}</Text>
          <Text style={styles.prizeSubtitle}>{t('watchVideo')}</Text>
        </View>
      </TouchableOpacity>

      {/* Right Card: Refund Policy & Razorpay Branding */}
      <View style={styles.card}>
        {/* Refund Policy Row */}
        <TouchableOpacity
          style={styles.policyRow}
          onPress={onOpenRefundPolicy}
          activeOpacity={0.7}
        >
          <Ionicons name="shield-checkmark-outline" size={17} color={theme.colors.primary} />
          <Text style={styles.policyText}>{t('refundPolicy')}</Text>
        </TouchableOpacity>

        {/* Razorpay Row */}
        <View style={styles.securityRow}>
          <Ionicons name="shield-checkmark-outline" size={17} color={theme.colors.primary} />
          <View style={styles.razorpayContainer}>
            <Text style={styles.securityText}>{t('securePayments')}</Text>
            <Text style={styles.razorpayBrand}>
              <Text style={styles.razorpayR}>R</Text>azorpay
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  card: {
    flex: 1,
    backgroundColor: '#E8F7F5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D4EFEA',
    justifyContent: 'space-between',
  },
  playIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  prizeTextContainer: {
    gap: 2,
  },
  prizeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    lineHeight: 16,
  },
  prizeSubtitle: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D4EFEA',
  },
  policyText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
  razorpayContainer: {
    flex: 1,
  },
  securityText: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  razorpayBrand: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0C2340',
    fontStyle: 'italic',
  },
  razorpayR: {
    color: '#00BAF2',
  },
});
