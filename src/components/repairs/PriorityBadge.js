import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PRIORITY_LABELS } from '../../utils/constants';

const PriorityBadge = ({ priority, size = 'small' }) => {
  const priorityColor = colors.priority[priority] || colors.grey[500];

  return (
    <View style={[styles.badge, styles[size], { backgroundColor: priorityColor + '20' }]}>
      <Text style={[styles.text, styles[`${size}Text`], { color: priorityColor }]}>
        {PRIORITY_LABELS[priority] || priority}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
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
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
  smallText: {
    fontSize: typography.fontSize.xs,
  },
  mediumText: {
    fontSize: typography.fontSize.sm,
  },
});

export default PriorityBadge;
