import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function BottomCTA({
  competition,
  isRegistered,
  hasSubmitted,
  isLoading,
  onPressCTA,
}) {
  const { t } = useApp();

  if (!competition) return null;

  const isFull = (competition.bookedSpots || 0) >= (competition.maxParticipants || 20);
  const isDeadlinePassed =
    new Date(competition.registrationDeadline).getTime() <= Date.now();
  const isEnded = competition.status === 'ENDED';

  let mainText = t('uploadSubmission');
  let subText = t('registered');
  let disabled = false;
  let bgStyle = styles.btnActive;

  if (isEnded) {
    mainText = t('ended');
    subText = '';
    disabled = true;
    bgStyle = styles.btnDisabled;
  } else if (!isRegistered) {
    if (isDeadlinePassed) {
      mainText = t('regClosed');
      subText = 'Deadline Passed';
      disabled = true;
      bgStyle = styles.btnDisabled;
    } else if (isFull) {
      mainText = t('compFull');
      subText = 'All spots booked';
      disabled = true;
      bgStyle = styles.btnDisabled;
    } else {
      mainText = `${t('registerNow')} (₹${competition.entryFee})`;
      subText = 'Instant Entry';
    }
  } else {
    // User is registered
    if (hasSubmitted) {
      mainText = 'View Submission';
      subText = 'Status: Submitted';
    } else {
      mainText = t('uploadSubmission');
      subText = t('registered');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, bgStyle]}
        onPress={onPressCTA}
        disabled={disabled || isLoading}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={mainText}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>{mainText}</Text>
            {subText ? <Text style={styles.subText}>{subText}</Text> : null}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: theme.colors.primaryDark,
  },
  btnDisabled: {
    backgroundColor: '#94A3B8',
  },
  textContainer: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 11,
    color: '#E0F2FE',
    marginTop: 1,
    fontWeight: '500',
  },
});
