import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../common/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatPhone } from '../../utils/formatters';

const CustomerCard = ({ customer, onPress }) => {
  return (
    <Card onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {customer.first_name} {customer.last_name}
        </Text>
        {customer.is_active !== undefined && !customer.is_active && (
          <View style={styles.inactiveBadge}>
            <Text style={styles.inactiveText}>Inactive</Text>
          </View>
        )}
      </View>

      <Text style={styles.phone}>{formatPhone(customer.phone)}</Text>
      {customer.email && <Text style={styles.email}>{customer.email}</Text>}
      {customer.address && (
        <Text style={styles.address} numberOfLines={1}>
          {customer.address}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  inactiveBadge: {
    backgroundColor: colors.grey[200],
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inactiveText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  phone: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  address: {
    fontSize: typography.fontSize.xs,
    color: colors.text.hint,
  },
});

export default CustomerCard;
