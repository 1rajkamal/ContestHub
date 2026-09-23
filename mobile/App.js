import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import CompetitionDetailsScreen from './src/screens/CompetitionDetailsScreen';

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <CompetitionDetailsScreen />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
});
