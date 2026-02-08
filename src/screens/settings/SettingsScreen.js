import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.sectionTitle}>User Profile</Text>
        {user && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{user.name || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{user.role || 'N/A'}</Text>
            </View>
          </>
        )}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Version:</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>
      </Card>

      <Button title="Logout" onPress={handleLogout} variant="danger" fullWidth />
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
    width: 80,
  },
  value: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
});

export default SettingsScreen;
