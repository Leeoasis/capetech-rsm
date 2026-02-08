import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatDateTime } from '../../utils/formatters';
import Card from '../common/Card';

const TimelineView = ({ timeline = [] }) => {
  const renderTimelineItem = ({ item }) => (
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{item.title || item.event}</Text>
        <Text style={styles.timelineDescription}>{item.description || item.notes}</Text>
        <Text style={styles.timelineDate}>{formatDateTime(item.created_at || item.date)}</Text>
      </View>
    </View>
  );

  if (timeline.length === 0) {
    return (
      <Card>
        <Text style={styles.emptyText}>No timeline events yet</Text>
      </Card>
    );
  }

  return (
    <Card noPadding>
      <View style={styles.container}>
        <FlatList
          data={timeline}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderTimelineItem}
          scrollEnabled={false}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
    marginTop: spacing.xs,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  timelineDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  timelineDate: {
    fontSize: typography.fontSize.xs,
    color: colors.text.hint,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSize.base,
  },
});

export default TimelineView;
