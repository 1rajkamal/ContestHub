import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { useApp } from '../../context/AppContext';

export default function RefundModal({ visible, onClose, policy }) {
  const { t } = useApp();

  if (!visible) return null;

  const terms = policy?.terms || [
    '100% full refund is issued automatically if the competition is cancelled or rescheduled by Feedants.',
    'Participants may request a cancellation up to 24 hours prior to the registration deadline.',
    'No refunds can be issued after the video submission deadline closes and judging commences.',
    'All refunds are credited directly back to the original source (UPI/Card) within 3-5 business days via Razorpay.',
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="shield-checkmark" size={22} color={theme.colors.primary} />
              <Text style={styles.title}>{t('refundPolicy')}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body}>
            <Text style={styles.intro}>
              Feedants is committed to fair, transparent competition practices. All entry payments are securely held in escrow until judging begins.
            </Text>

            <View style={styles.termsList}>
              {terms.map((term, index) => (
                <View key={index} style={styles.termItem}>
                  <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} style={{ marginTop: 2 }} />
                  <Text style={styles.termText}>{term}</Text>
                </View>
              ))}
            </View>

            <View style={styles.securityBox}>
              <Text style={styles.securityTitle}>Secure Payments by Razorpay</Text>
              <Text style={styles.securityDesc}>
                Feedants uses industry-standard 256-bit SSL encryption. We never store your card numbers or UPI PINs.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
              <Text style={styles.doneBtnText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 16,
  },
  intro: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 16,
  },
  termsList: {
    gap: 12,
    marginBottom: 16,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  termText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  securityBox: {
    backgroundColor: '#E8F7F5',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  securityTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  securityDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  doneBtn: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
