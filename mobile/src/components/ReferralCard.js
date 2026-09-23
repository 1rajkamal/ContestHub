import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function ReferralCard({ referralLink = 'https://feedants.com/r/referral123' }) {
  const { t, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(referralLink);
      }
      setCopied(true);
      showToast(t('copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard copy error:', err);
    }
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Join Feedants Classical Dance Competition',
          text: 'Participate in Feedants Classical Dance Competition and win guaranteed cash prizes!',
          url: referralLink,
        });
      } else {
        await Share.share({
          message: `Join Feedants Classical Dance Competition and win cash prizes! Register here: ${referralLink}`,
          url: referralLink,
        });
      }
    } catch (err) {
      handleCopyLink();
    }
  };

  return (
    <View style={styles.card}>
      {/* Top Title with Megaphone */}
      <View style={styles.titleRow}>
        <View style={styles.megaphoneCircle}>
          <MaterialCommunityIcons name="bullhorn-outline" size={20} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>{t('referAndEarn')}</Text>
      </View>

      {/* Action Row */}
      <View style={styles.actionRow}>
        {/* Link Box with Copy Button */}
        <View style={styles.linkBox}>
          <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="middle">
            {referralLink}
          </Text>
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={handleCopyLink}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Copy referral link"
          >
            <Text style={styles.copyBtnText}>{copied ? t('copied') : t('copyLink')}</Text>
          </TouchableOpacity>
        </View>

        {/* Refer Now CTA & Reward Text */}
        <View style={styles.referCTAContainer}>
          <TouchableOpacity
            style={styles.referNowBtn}
            onPress={handleShare}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Refer Now"
          >
            <Text style={styles.referNowText}>{t('referNow')}</Text>
          </TouchableOpacity>
          <Text style={styles.rewardSubtext}>{t('earnReward')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8F7F5',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#D4EFEA',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  megaphoneCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1EAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  linkBox: {
    flex: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#B2DFDB',
    height: 38,
  },
  linkText: {
    flex: 1,
    fontSize: 11,
    color: '#475569',
    marginRight: 4,
  },
  copyBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  referCTAContainer: {
    flex: 1,
    alignItems: 'center',
  },
  referNowBtn: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 14,
    width: '100%',
    alignItems: 'center',
  },
  referNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  rewardSubtext: {
    fontSize: 9,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
});
