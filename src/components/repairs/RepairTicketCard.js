import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../common/Card';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatDate, formatCurrency } from '../../utils/formatters';

const RepairTicketCard = ({ ticket, onPress }) => {
  return (
    <Card onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.ticketNumber}>#{ticket.ticket_number || ticket.id}</Text>
        <PriorityBadge priority={ticket.priority} />
      </View>

      <Text style={styles.customerName}>
        {ticket.customer?.first_name} {ticket.customer?.last_name}
      </Text>

      <Text style={styles.deviceInfo}>
        {ticket.device?.brand} {ticket.device?.model}
      </Text>

      <Text style={styles.fault} numberOfLines={2}>
        {ticket.fault_description}
      </Text>

      <View style={styles.footer}>
        <StatusBadge status={ticket.status} size="small" />
        <View style={styles.footerRight}>
          {ticket.estimated_cost && (
            <Text style={styles.cost}>{formatCurrency(ticket.estimated_cost)}</Text>
          )}
          <Text style={styles.date}>{formatDate(ticket.created_at)}</Text>
        </View>
      </View>

      {ticket.technician && (
        <Text style={styles.technician}>Assigned: {ticket.technician.name}</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ticketNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  customerName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  deviceInfo: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  fault: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  cost: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.success,
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.text.hint,
    marginTop: spacing.xs,
  },
  technician: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});

export default RepairTicketCard;
