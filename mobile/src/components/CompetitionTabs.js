import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function CompetitionTabs({ competition }) {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'judging', 'rules'
  const [isExpanded, setIsExpanded] = useState(false);

  if (!competition) return null;

  return (
    <View style={styles.card}>
      {/* Tab Navigation Headers */}
      <View style={styles.tabBar}>
        {/* Tab 1: About Competition */}
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'about' && styles.tabItemActive]}
          onPress={() => setActiveTab('about')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'about' && styles.tabTextActive]}>
            {t('aboutCompetition')}
          </Text>
          {activeTab === 'about' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        {/* Tab 2: Judging Parameters */}
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'judging' && styles.tabItemActive]}
          onPress={() => setActiveTab('judging')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'judging' && styles.tabTextActive]}>
            {t('judgingParameters')}
          </Text>
          {activeTab === 'judging' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        {/* Tab 3: Rules & Eligibility */}
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'rules' && styles.tabItemActive]}
          onPress={() => setActiveTab('rules')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'rules' && styles.tabTextActive]}>
            {t('rulesAndEligibility')}
          </Text>
          {activeTab === 'rules' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Tab Content Display */}
      <View style={styles.contentContainer}>
        {activeTab === 'about' && (
          <View>
            <Text style={styles.bodyText}>
              {isExpanded
                ? competition.about?.fullDescription || competition.about?.shortDescription
                : competition.about?.shortDescription}
            </Text>

            {/* View More / View Less Toggle */}
            <TouchableOpacity
              style={styles.viewMoreBtn}
              onPress={() => setIsExpanded(!isExpanded)}
              activeOpacity={0.7}
            >
              <Text style={styles.viewMoreText}>
                {isExpanded ? t('viewLess') : t('viewMore')}
              </Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={14}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'judging' && (
          <View style={styles.parametersList}>
            {competition.judgingParameters?.map((param, idx) => (
              <View key={idx} style={styles.paramItem}>
                <View style={styles.paramHeader}>
                  <Text style={styles.paramTitle}>{param.title}</Text>
                  {param.weightage && (
                    <View style={styles.weightBadge}>
                      <Text style={styles.weightText}>{param.weightage}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.paramDesc}>{param.description}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'rules' && (
          <View style={styles.rulesList}>
            {competition.rulesAndEligibility?.map((item, idx) => (
              <View key={idx} style={styles.ruleItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={theme.colors.primary}
                  style={{ marginTop: 2 }}
                />
                <View style={styles.ruleContent}>
                  <Text style={styles.ruleTitle}>{item.title}</Text>
                  <Text style={styles.ruleDesc}>{item.rule}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    position: 'relative',
  },
  tabItemActive: {},
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2.5,
    width: '80%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  contentContainer: {
    padding: 16,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
  },
  viewMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
    paddingVertical: 4,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  parametersList: {
    gap: 10,
  },
  paramItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  paramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  paramTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  weightBadge: {
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  paramDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  rulesList: {
    gap: 10,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  ruleContent: {
    flex: 1,
  },
  ruleTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 1,
  },
  ruleDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
});
