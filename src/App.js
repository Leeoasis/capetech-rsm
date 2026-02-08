import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { colors } from './theme/colors';

const App = () => {
  const theme = {
    colors: {
      primary: colors.primary,
      accent: colors.secondary,
      background: colors.background,
      surface: colors.surface,
      text: colors.text.primary,
      error: colors.error,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
