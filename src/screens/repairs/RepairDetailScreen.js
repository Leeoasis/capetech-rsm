import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchRepairTicket, fetchTicketTimeline } from '../../store/slices/repairTicketsSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/repairs/StatusBadge';
import PriorityBadge from '../../components/repairs/PriorityBadge';
import TimelineView from '../../components/repairs/TimelineView';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatDate, formatCurrency } from '../../utils/formatters';

const RepairDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { ticketId } = route.params;
  const { currentTicket, timeline, loading } = useSelector(state => state.repairTickets);

  useEffect(() => {
    dispatch(fetchRepairTicket(ticketId));
    dispatch(fetchTicketTimeline(ticketId));
  }, [dispatch, ticketId]);

  const handleUpdateStatus = () => {
    navigation.navigate('UpdateStatus', { ticketId });
  };

  if (loading || !currentTicket) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.ticketNumber}>#{currentTicket.ticket_number || currentTicket.id}</Text>
          <View style={styles.badges}>
            <StatusBadge status={currentTicket.status} size="medium" />
            <PriorityBadge priority={currentTicket.priority} size="medium" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Customer</Text>
        <Text style={styles.text}>
          {currentTicket.customer?.first_name} {currentTicket.customer?.last_name}
        </Text>
        <Text style={styles.text}>{currentTicket.customer?.phone}</Text>

        <Text style={styles.sectionTitle}>Device</Text>
        <Text style={styles.text}>
          {currentTicket.device?.device_type}: {currentTicket.device?.brand}{' '}
          {currentTicket.device?.model}
        </Text>

        <Text style={styles.sectionTitle}>Fault Description</Text>
        <Text style={styles.text}>{currentTicket.fault_description}</Text>

        {currentTicket.accessories_received && (
          <>
            <Text style={styles.sectionTitle}>Accessories</Text>
            <Text style={styles.text}>{currentTicket.accessories_received}</Text>
          </>
        )}

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Estimated Cost</Text>
            <Text style={styles.value}>
              {formatCurrency(currentTicket.estimated_cost || 0)}
            </Text>
          </View>
          {currentTicket.actual_cost && (
            <View style={styles.col}>
              <Text style={styles.label}>Actual Cost</Text>
              <Text style={styles.value}>{formatCurrency(currentTicket.actual_cost)}</Text>
            </View>
          )}
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.value}>{formatDate(currentTicket.created_at)}</Text>
          </View>
          {currentTicket.completed_at && (
            <View style={styles.col}>
              <Text style={styles.label}>Completed</Text>
              <Text style={styles.value}>{formatDate(currentTicket.completed_at)}</Text>
            </View>
          )}
        </View>
      </Card>

      <Text style={styles.timelineTitle}>Timeline</Text>
      <TimelineView timeline={timeline} />

      <Button
        title="Update Status"
        onPress={handleUpdateStatus}
        fullWidth
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  ticketNumber: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  badges: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  text: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  timelineTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  button: {
    marginVertical: spacing.md,
  },
});

export default RepairDetailScreen;
