import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import CustomersListScreen from '../screens/customers/CustomersListScreen';
import RepairsListScreen from '../screens/repairs/RepairsListScreen';
import POSScreen from '../screens/pos/POSScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Additional screens for stacks
import CustomerDetailScreen from '../screens/customers/CustomerDetailScreen';
import AddCustomerScreen from '../screens/customers/AddCustomerScreen';
import RepairDetailScreen from '../screens/repairs/RepairDetailScreen';
import AddRepairScreen from '../screens/repairs/AddRepairScreen';
import KanbanScreen from '../screens/repairs/KanbanScreen';
import UpdateStatusScreen from '../screens/repairs/UpdateStatusScreen';
import CreateInvoiceScreen from '../screens/pos/CreateInvoiceScreen';
import ProcessPaymentScreen from '../screens/pos/ProcessPaymentScreen';

import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const CustomersStack = createStackNavigator();
const RepairsStack = createStackNavigator();
const POSStack = createStackNavigator();

const CustomersNavigator = () => (
  <CustomersStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    }}>
    <CustomersStack.Screen
      name="CustomersList"
      component={CustomersListScreen}
      options={{ title: 'Customers' }}
    />
    <CustomersStack.Screen
      name="CustomerDetail"
      component={CustomerDetailScreen}
      options={{ title: 'Customer Details' }}
    />
    <CustomersStack.Screen
      name="AddCustomer"
      component={AddCustomerScreen}
      options={{ title: 'Add Customer' }}
    />
  </CustomersStack.Navigator>
);

const RepairsNavigator = () => (
  <RepairsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    }}>
    <RepairsStack.Screen
      name="RepairsList"
      component={RepairsListScreen}
      options={{ title: 'Repairs' }}
    />
    <RepairsStack.Screen
      name="RepairDetail"
      component={RepairDetailScreen}
      options={{ title: 'Repair Details' }}
    />
    <RepairsStack.Screen
      name="AddRepair"
      component={AddRepairScreen}
      options={{ title: 'New Repair' }}
    />
    <RepairsStack.Screen
      name="Kanban"
      component={KanbanScreen}
      options={{ title: 'Kanban Board' }}
    />
    <RepairsStack.Screen
      name="UpdateStatus"
      component={UpdateStatusScreen}
      options={{ title: 'Update Status' }}
    />
  </RepairsStack.Navigator>
);

const POSNavigator = () => (
  <POSStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    }}>
    <POSStack.Screen name="POSHome" component={POSScreen} options={{ title: 'POS' }} />
    <POSStack.Screen
      name="CreateInvoice"
      component={CreateInvoiceScreen}
      options={{ title: 'Create Invoice' }}
    />
    <POSStack.Screen
      name="ProcessPayment"
      component={ProcessPaymentScreen}
      options={{ title: 'Process Payment' }}
    />
  </POSStack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Customers') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Repairs') {
            iconName = focused ? 'tools' : 'tools';
          } else if (route.name === 'POS') {
            iconName = focused ? 'cash-register' : 'cash-register';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey[500],
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Customers" component={CustomersNavigator} />
      <Tab.Screen name="Repairs" component={RepairsNavigator} />
      <Tab.Screen name="POS" component={POSNavigator} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
