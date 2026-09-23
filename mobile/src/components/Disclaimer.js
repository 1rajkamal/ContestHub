import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function Disclaimer({ text }) {
  const { t } = useApp();

  return (
    <View style={styles.container}>
      <Ionicons
        name="information-circle-outline"
        size={18}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.text}>
        <Text style={styles.bold}>Disclaimer: </Text>
        {text || t('disclaimer').replace('Disclaimer: ', '')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F7F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#D4EFEA',
  },
  icon: {
    marginRight: 8,
    marginTop: 1,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#334155',
  },
  bold: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
