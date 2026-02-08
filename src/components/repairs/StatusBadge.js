import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { REPAIR_STATUS_LABELS } from '../../utils/constants';

const StatusBadge = ({ status, size = 'medium' }) => {
  const statusColor = colors.status[status] || colors.grey[500];

  return (
    <View style={[styles.badge, styles[size], { backgroundColor: statusColor + '20' }]}>
      <View style={[styles.dot, { backgroundColor: statusColor }]} />
      <Text style={[styles.text, styles[`${size}Text`], { color: statusColor }]}>
        {REPAIR_STATUS_LABELS[status] || status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  large: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  text: {
    fontWeight: typography.fontWeight.medium,
  },
  smallText: {
    fontSize: typography.fontSize.xs,
  },
  mediumText: {
    fontSize: typography.fontSize.sm,
  },
  largeText: {
    fontSize: typography.fontSize.base,
  },
});

export default StatusBadge;
