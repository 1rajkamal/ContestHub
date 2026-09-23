import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function ImportantDates({ competition }) {
  const { t } = useApp();

  if (!competition) return null;

  // Formatter to render date matching reference: "10 Aug 26", "11:50 PM"
  const formatDateTime = (dateVal) => {
    if (!dateVal) return { date: 'TBD', time: '11:50 PM' };
    const d = new Date(dateVal);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hourStr = String(hours).padStart(2, '0');

    return {
      date: `${day} ${month} ${year}`,
      time: `${hourStr}:${minutes} ${ampm}`,
    };
  };

  const regBefore = formatDateTime(competition.registrationDeadline);
  const subStart = formatDateTime(competition.submissionStart);
  const subEnd = formatDateTime(competition.submissionEnd);
  const result = formatDateTime(competition.resultDate);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{t('importantDates')}</Text>

      <View style={styles.grid}>
        {/* Row 1 */}
        <View style={styles.row}>
          {/* Register Before */}
          <View style={[styles.cell, styles.cellRightBorder, styles.cellBottomBorder]}>
            <View style={styles.cellIconWrapper}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t('registerBefore')}</Text>
              <Text style={styles.cellDate}>{regBefore.date}</Text>
              <Text style={styles.cellTime}>{regBefore.time}</Text>
            </View>
          </View>

          {/* Submission Starts */}
          <View style={[styles.cell, styles.cellBottomBorder]}>
            <View style={styles.cellIconWrapper}>
              <Feather name="send" size={19} color={theme.colors.primary} />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t('submissionStarts')}</Text>
              <Text style={styles.cellDate}>{subStart.date}</Text>
              <Text style={styles.cellTime}>{subStart.time}</Text>
            </View>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          {/* Submission Ends */}
          <View style={[styles.cell, styles.cellRightBorder]}>
            <View style={styles.cellIconWrapper}>
              <Feather name="upload" size={19} color={theme.colors.primary} />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t('submissionEnds')}</Text>
              <Text style={styles.cellDate}>{subEnd.date}</Text>
              <Text style={styles.cellTime}>{subEnd.time}</Text>
            </View>
          </View>

          {/* Result Date */}
          <View style={styles.cell}>
            <View style={styles.cellIconWrapper}>
              <Ionicons name="trophy-outline" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t('resultDate')}</Text>
              <Text style={styles.cellDate}>{result.date}</Text>
              <Text style={styles.cellTime}>{result.time}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    ...theme.shadows.card,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  grid: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  cellBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cellIconWrapper: {
    marginRight: 10,
    marginTop: 2,
  },
  cellContent: {
    flex: 1,
  },
  cellLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  cellDate: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 1,
  },
  cellTime: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
});
