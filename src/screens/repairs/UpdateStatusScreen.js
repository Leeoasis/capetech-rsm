import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateTicketStatus } from '../../store/slices/repairTicketsSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Picker } from '@react-native-picker/picker';
import { REPAIR_STATUSES, REPAIR_STATUS_LABELS } from '../../utils/constants';

const UpdateStatusScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { ticketId } = route.params;

  const [status, setStatus] = useState(REPAIR_STATUSES.IN_PROGRESS);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(updateTicketStatus({ id: ticketId, statusData: { status, notes } })).unwrap();
      Alert.alert('Success', 'Status updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Select Status</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={itemValue => setStatus(itemValue)}
            style={styles.picker}>
            {Object.values(REPAIR_STATUSES).map(statusValue => (
              <Picker.Item
                key={statusValue}
                label={REPAIR_STATUS_LABELS[statusValue]}
                value={statusValue}
              />
            ))}
          </Picker>
        </View>

        <Input
          label="Notes (Optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Add notes about this status update..."
          multiline
          numberOfLines={4}
        />

        <Button title="Update Status" onPress={handleSubmit} loading={loading} fullWidth />

        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="outline"
          fullWidth
          style={styles.cancelButton}
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
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  picker: {
    height: 50,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
});

export default UpdateStatusScreen;
