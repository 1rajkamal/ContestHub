import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function PreviousWinners({ winners, onSelectWinner }) {
  const { t } = useApp();

  if (!winners || winners.length === 0) return null;

  const renderWinnerCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelectWinner(item)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Watch ${item.name} performance`}
    >
      {/* Thumbnail with overlay play icon */}
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: item.avatarUrl }} style={styles.thumbnail} resizeMode="cover" />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={12} color="#FFFFFF" style={{ marginLeft: 1 }} />
        </View>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.winnerName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.winnerPosition}>{item.position}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{t('previousWinners')}</Text>

      <FlatList
        data={winners}
        renderItem={renderWinnerCard}
        keyExtractor={(item) => item._id || item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDF2',
    minWidth: 145,
    ...theme.shadows.card,
  },
  thumbnailWrapper: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  details: {
    justifyContent: 'center',
    flex: 1,
  },
  winnerName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  winnerPosition: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});
