import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Card from '../../components/common/Card';
import { formatCurrency } from '../../utils/formatters';
import { useSelector } from 'react-redux';
import useRefresh from '../../hooks/useRefresh';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { stats } = useSelector(state => state.ui);
  const { refreshing, onRefresh } = useRefresh(async () => {
    // Refresh dashboard data
    console.log('Refreshing dashboard...');
  });

  const StatCard = ({ title, value, color = colors.primary, onPress }) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={[styles.statTitle, { color }]}>{title}</Text>
    </TouchableOpacity>
  );

  const QuickActionButton = ({ title, onPress, color = colors.primary }) => (
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome to Capetech RSM</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          title="Pending Repairs"
          value={stats.pendingRepairs}
          color={colors.status.pending}
          onPress={() => navigation.navigate('Repairs')}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgressRepairs}
          color={colors.status.in_progress}
          onPress={() => navigation.navigate('Repairs')}
        />
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          title="Completed Today"
          value={stats.completedToday}
          color={colors.status.completed}
        />
        <StatCard
          title="Revenue Today"
          value={formatCurrency(stats.revenueToday)}
          color={colors.success}
        />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActionButton
          title="New Repair Ticket"
          onPress={() => navigation.navigate('Repairs', { screen: 'AddRepair' })}
          color={colors.primary}
        />
        <QuickActionButton
          title="View Kanban Board"
          onPress={() => navigation.navigate('Repairs', { screen: 'Kanban' })}
          color={colors.secondary}
        />
        <QuickActionButton
          title="Process Payment"
          onPress={() => navigation.navigate('POS')}
          color={colors.success}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    marginTop: spacing.xs,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  statTitle: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  actionButton: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  actionText: {
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
});

export default HomeScreen;
