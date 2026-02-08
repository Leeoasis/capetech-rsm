import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadStoredAuth } from '../../store/slices/authSlice';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Try to load stored authentication
    dispatch(loadStoredAuth());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Capetech RSM</Text>
      <Text style={styles.subtitle}>Repair Shop Management</Text>
      <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    marginTop: 8,
    opacity: 0.9,
  },
  loader: {
    marginTop: 32,
  },
});

export default SplashScreen;
