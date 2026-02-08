import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const CreateInvoiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Invoice Screen - To be implemented</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  text: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
  },
});

export default CreateInvoiceScreen;
