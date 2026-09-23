import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function AdPlaceholder() {
  const { t } = useApp();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="bullhorn-outline" size={16} color="#94A3B8" />
      <Text style={styles.text}>{t('adHere')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
