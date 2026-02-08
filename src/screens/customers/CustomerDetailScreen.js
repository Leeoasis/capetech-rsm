import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchCustomer, removeCustomer } from '../../store/slices/customersSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatPhone } from '../../utils/formatters';

const CustomerDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { customerId } = route.params;
  const { currentCustomer, loading } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(fetchCustomer(customerId));
  }, [dispatch, customerId]);

  const handleEdit = () => {
    navigation.navigate('AddCustomer', { customerId });
  };

  const handleDelete = () => {
    Alert.alert('Delete Customer', 'Are you sure you want to delete this customer?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await dispatch(removeCustomer(customerId));
          navigation.goBack();
        },
      },
    ]);
  };

  if (loading || !currentCustomer) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {currentCustomer.first_name} {currentCustomer.last_name}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{formatPhone(currentCustomer.phone)}</Text>
        </View>
        {currentCustomer.email && (
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{currentCustomer.email}</Text>
          </View>
        )}
        {currentCustomer.address && (
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{currentCustomer.address}</Text>
          </View>
        )}
        {currentCustomer.id_number && (
          <View style={styles.row}>
            <Text style={styles.label}>ID Number:</Text>
            <Text style={styles.value}>{currentCustomer.id_number}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>
            {currentCustomer.is_active !== false ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button title="Edit Customer" onPress={handleEdit} style={styles.button} />
        <Button title="Delete Customer" onPress={handleDelete} variant="danger" style={styles.button} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    width: 100,
  },
  value: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  actions: {
    marginTop: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  },
});

export default CustomerDetailScreen;
