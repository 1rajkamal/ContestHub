import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function TopNav({ onBack, onOpenUserSwitcher }) {
  const { language, toggleLanguage, t } = useApp();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        <Text style={styles.backText}>{t('goBack')}</Text>
      </TouchableOpacity>

      <View style={styles.rightActions}>
        {/* ENG / हिंदी Language Selector Capsule */}
        <View style={styles.langCapsule}>
          <TouchableOpacity
            style={[styles.langPill, language === 'en' && styles.langPillActive]}
            onPress={() => toggleLanguage('en')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.langText,
                language === 'en' && styles.langTextActive,
              ]}
            >
              ENG
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langPill, language === 'hi' && styles.langPillActive]}
            onPress={() => toggleLanguage('hi')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.langText,
                language === 'hi' && styles.langTextActive,
              ]}
            >
              हिंदी
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo User Switcher icon for testing states */}
        {onOpenUserSwitcher && (
          <TouchableOpacity
            style={styles.userSwitchBtn}
            onPress={onOpenUserSwitcher}
            title="Switch User State"
          >
            <Ionicons name="swap-horizontal" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  langPillActive: {
    backgroundColor: theme.colors.primaryDark,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  langTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  userSwitchBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
  },
});
