import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function UserReviews({ onOpenReviews }) {
  const { t } = useApp();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onOpenReviews}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Hear From Our Users"
    >
      {/* Chat Icon */}
      <View style={styles.iconWrapper}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme.colors.textPrimary} />
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.title}>{t('hearFromUsers')}</Text>
        <Text style={styles.subtitle}>{t('seeWhatParticipantsSay')}</Text>
      </View>

      {/* Chevron Arrow */}
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDF2',
    ...theme.shadows.card,
  },
  iconWrapper: {
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
});
