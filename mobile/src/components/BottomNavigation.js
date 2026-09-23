import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function BottomNavigation({ activeTab = 'competitions', onTabPress }) {
  const { t, currentUser } = useApp();

  return (
    <View style={styles.navBar}>
      {/* 1. Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={22}
          color={activeTab === 'home' ? theme.colors.primary : '#94A3B8'}
        />
        <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
          {t('home')}
        </Text>
      </TouchableOpacity>

      {/* 2. Explore */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('explore')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'explore' ? 'search' : 'search-outline'}
          size={22}
          color={activeTab === 'explore' ? theme.colors.primary : '#94A3B8'}
        />
        <Text style={[styles.navText, activeTab === 'explore' && styles.navTextActive]}>
          {t('explore')}
        </Text>
      </TouchableOpacity>

      {/* 3. Center Floating (+) Action */}
      <TouchableOpacity
        style={styles.centerPlusButton}
        onPress={() => onTabPress?.('create')}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Create Submission"
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* 4. Competitions (Active) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('competitions')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'competitions' ? 'trophy' : 'trophy-outline'}
          size={22}
          color={activeTab === 'competitions' ? theme.colors.primary : '#94A3B8'}
        />
        <Text style={[styles.navText, activeTab === 'competitions' && styles.navTextActive]}>
          {t('competitions')}
        </Text>
      </TouchableOpacity>

      {/* 5. Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('profile')}
        activeOpacity={0.7}
      >
        <View style={styles.profileAvatarWrapper}>
          <Image
            source={{
              uri:
                currentUser?.avatarUrl ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            }}
            style={styles.profileAvatar}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>
          {t('profile')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 8,
    height: 58,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94A3B8',
  },
  navTextActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  centerPlusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    ...theme.shadows.float,
  },
  profileAvatarWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
  },
});
