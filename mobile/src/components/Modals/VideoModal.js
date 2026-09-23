import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

export default function VideoModal({ visible, title, subtitle, videoUrl, onClose }) {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title || 'Video Player'}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>

          {/* Video Player Box */}
          <View style={styles.playerContainer}>
            {Platform.OS === 'web' ? (
              <video
                src={videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', borderRadius: 8, backgroundColor: '#000' }}
              />
            ) : (
              <View style={styles.mobilePlaceholder}>
                <Ionicons name="play-circle" size={56} color={theme.colors.primary} />
                <Text style={styles.mobilePlaceholderText}>Playing: {title}</Text>
                <Text style={styles.mobileUrlText} numberOfLines={1}>{videoUrl}</Text>
              </View>
            )}
          </View>

          {/* Footer Note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Official Feedants High-Definition Masterclass & Evaluation Video
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 520,
    overflow: 'hidden',
    ...theme.shadows.float,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  playerContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobilePlaceholder: {
    alignItems: 'center',
    gap: 8,
    padding: 20,
  },
  mobilePlaceholderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  mobileUrlText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  footer: {
    padding: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
  },
});
