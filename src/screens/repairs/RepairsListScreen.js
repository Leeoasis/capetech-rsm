import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchRepairTickets } from '../../store/slices/repairTicketsSlice';
import RepairTicketCard from '../../components/repairs/RepairTicketCard';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import useRefresh from '../../hooks/useRefresh';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const RepairsListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { tickets, loading, error, filters } = useSelector(state => state.repairTickets);

  useEffect(() => {
    dispatch(fetchRepairTickets(filters));
  }, [dispatch, filters]);

  const { refreshing, onRefresh } = useRefresh(async () => {
    dispatch(fetchRepairTickets(filters));
  });

  const handleTicketPress = ticket => {
    navigation.navigate('RepairDetail', { ticketId: ticket.id });
  };

  const handleAddRepair = () => {
    navigation.navigate('AddRepair');
  };

  const handleKanban = () => {
    navigation.navigate('Kanban');
  };

  if (loading && !refreshing && tickets.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="New Repair" onPress={handleAddRepair} size="small" style={styles.button} />
        <Button
          title="Kanban"
          onPress={handleKanban}
          size="small"
          variant="secondary"
          style={styles.button}
        />
      </View>

      {error && <ErrorMessage message={error} style={styles.error} />}

      <FlatList
        data={tickets}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RepairTicketCard ticket={item} onPress={() => handleTicketPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: spacing.sm,
  },
  button: {
    flex: 1,
  },
  error: {
    margin: spacing.md,
  },
  listContent: {
    padding: spacing.md,
  },
});

export default RepairsListScreen;
