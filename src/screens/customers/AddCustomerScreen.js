import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addCustomer, modifyCustomer, fetchCustomer } from '../../store/slices/customersSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { isRequired, isValidEmail, isValidPhone } from '../../utils/validators';

const AddCustomerScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const customerId = route.params?.customerId;
  const { currentCustomer, loading } = useSelector(state => state.customers);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    id_number: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customerId && !currentCustomer) {
      dispatch(fetchCustomer(customerId));
    }
  }, [customerId, dispatch, currentCustomer]);

  useEffect(() => {
    if (currentCustomer && customerId) {
      setFormData({
        first_name: currentCustomer.first_name || '',
        last_name: currentCustomer.last_name || '',
        phone: currentCustomer.phone || '',
        email: currentCustomer.email || '',
        address: currentCustomer.address || '',
        id_number: currentCustomer.id_number || '',
      });
    }
  }, [currentCustomer, customerId]);

  const validateForm = () => {
    const newErrors = {};

    if (!isRequired(formData.first_name)) {
      newErrors.first_name = 'First name is required';
    }

    if (!isRequired(formData.last_name)) {
      newErrors.last_name = 'Last name is required';
    }

    if (!isRequired(formData.phone)) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (customerId) {
        await dispatch(modifyCustomer({ id: customerId, customerData: formData })).unwrap();
        Alert.alert('Success', 'Customer updated successfully');
      } else {
        await dispatch(addCustomer(formData)).unwrap();
        Alert.alert('Success', 'Customer created successfully');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error || 'Failed to save customer');
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Input
          label="First Name *"
          value={formData.first_name}
          onChangeText={value => updateField('first_name', value)}
          error={errors.first_name}
          placeholder="Enter first name"
        />

        <Input
          label="Last Name *"
          value={formData.last_name}
          onChangeText={value => updateField('last_name', value)}
          error={errors.last_name}
          placeholder="Enter last name"
        />

        <Input
          label="Phone *"
          value={formData.phone}
          onChangeText={value => updateField('phone', value)}
          error={errors.phone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={value => updateField('email', value)}
          error={errors.email}
          placeholder="Enter email (optional)"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Address"
          value={formData.address}
          onChangeText={value => updateField('address', value)}
          placeholder="Enter address (optional)"
          multiline
          numberOfLines={3}
        />

        <Input
          label="ID Number"
          value={formData.id_number}
          onChangeText={value => updateField('id_number', value)}
          placeholder="Enter ID number (optional)"
        />

        <Button
          title={customerId ? 'Update Customer' : 'Create Customer'}
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          style={styles.submitButton}
        />

        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="outline"
          fullWidth
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  submitButton: {
    marginBottom: spacing.sm,
  },
});

export default AddCustomerScreen;
