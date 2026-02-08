import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCustomers, setSearchQuery } from '../../store/slices/customersSlice';
import CustomerCard from '../../components/customers/CustomerCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import useRefresh from '../../hooks/useRefresh';
import useDebounce from '../../hooks/useDebounce';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const CustomersListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { customers, loading, error, searchQuery } = useSelector(state => state.customers);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(fetchCustomers({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  const { refreshing, onRefresh } = useRefresh(async () => {
    dispatch(fetchCustomers({ search: debouncedSearch }));
  });

  const handleCustomerPress = customer => {
    navigation.navigate('CustomerDetail', { customerId: customer.id });
  };

  const handleAddCustomer = () => {
    navigation.navigate('AddCustomer');
  };

  if (loading && !refreshing && customers.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input
          placeholder="Search customers..."
          value={localSearch}
          onChangeText={setLocalSearch}
          style={styles.searchInput}
        />
        <Button title="Add Customer" onPress={handleAddCustomer} size="small" />
      </View>

      {error && <ErrorMessage message={error} style={styles.error} />}

      <FlatList
        data={customers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CustomerCard customer={item} onPress={() => handleCustomerPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No customers found</Text>
          </View>
        }
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
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  searchInput: {
    marginBottom: spacing.sm,
  },
  error: {
    margin: spacing.md,
  },
  listContent: {
    padding: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
});

export default CustomersListScreen;
