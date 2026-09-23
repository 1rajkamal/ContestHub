import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { useApp } from '../../context/AppContext';

export default function UserSwitcherModal({ visible, onClose, onUserChanged }) {
  const { currentUser, setCurrentUser, demoUsers } = useApp();

  if (!visible) return null;

  const handleSelectUser = (user) => {
    setCurrentUser(user);
    onUserChanged?.(user);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Evaluator / Demo Switcher</Text>
              <Text style={styles.subtitle}>Test Dynamic States (Registered vs Unregistered)</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            {demoUsers.map((user) => {
              const isSelected = currentUser._id === user._id;
              const isRegisteredDemo = user.defaultState === 'registered';

              return (
                <TouchableOpacity
                  key={user._id}
                  style={[styles.userCard, isSelected && styles.userCardActive]}
                  onPress={() => handleSelectUser(user)}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userRole}>
                      {isRegisteredDemo ? '✅ Registered Demo User' : '🆕 Unregistered Demo User'}
                    </Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={22}
                    color={isSelected ? theme.colors.primary : '#94A3B8'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              💡 Tip: Switch to Priya to test the live registration flow and watch the available spots decrease and status change dynamically!
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 420,
    padding: 16,
    ...theme.shadows.float,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
  list: {
    paddingVertical: 12,
    gap: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  userCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#E8F7F5',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  userRole: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: 2,
  },
  userEmail: {
    fontSize: 11,
    color: '#64748B',
  },
  hintContainer: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  hintText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
});
