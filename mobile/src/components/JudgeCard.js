import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function JudgeCard({ judge, onPlayVideo }) {
  const { t } = useApp();

  if (!judge) return null;

  return (
    <View style={styles.card}>
      {/* Judge Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri:
              judge.avatarUrl ||
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      {/* Judge Details */}
      <View style={styles.infoCol}>
        <Text style={styles.judgeLabel}>{t('judge')}</Text>
        <Text style={styles.judgeName}>{judge.name}</Text>
        <Text style={styles.judgeTitle}>{judge.title}</Text>
        <Text style={styles.judgeExperience}>{judge.experience}</Text>
      </View>

      {/* Intro Video CTA Button */}
      <TouchableOpacity
        style={styles.videoCTA}
        onPress={() => onPlayVideo(judge)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Watch Judge Intro Video"
      >
        <View style={styles.playButtonCircle}>
          <Ionicons name="play" size={18} color={theme.colors.primary} style={{ marginLeft: 2 }} />
        </View>
        <Text style={styles.videoText}>{t('introVideo')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDF2',
    ...theme.shadows.card,
  },
  avatarWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    padding: 2,
    borderWidth: 1.5,
    borderColor: '#B2DFDB',
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  judgeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 2,
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  judgeTitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  judgeExperience: {
    fontSize: 12,
    color: '#94A3B8',
  },
  videoCTA: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  playButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F7F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  videoText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});
