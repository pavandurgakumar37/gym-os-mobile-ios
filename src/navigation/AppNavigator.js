import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import AdminDashboard from '../screens/admin/AdminDashboard';
import UserDashboard from '../screens/user/UserDashboard';
import ITDashboard from '../screens/it/ITDashboard';
import WorkoutLevelsScreen from '../screens/user/WorkoutLevelsScreen';
import WorkoutDetailScreen from '../screens/user/WorkoutDetailScreen';
import MealPrepScreen from '../screens/user/MealPrepScreen';
import ShopScreen from '../screens/user/ShopScreen';
import ProductDetailScreen from '../screens/user/ProductDetailScreen';
import ProgressScreen from '../screens/user/ProgressScreen';
import BugTrackerScreen from '../screens/it/BugTrackerScreen';
import BugDetailScreen from '../screens/it/BugDetailScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import OrderManagementScreen from '../screens/admin/OrderManagementScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Admin Tab Navigator
const AdminTabs = () => {
  console.log('[AdminTabs] Component rendered');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
      <Tab.Screen name="Orders" component={OrderManagementScreen} />
    </Tab.Navigator>
  );
};

// User Tab Navigator
const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Meals') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Shop') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={UserDashboard} />
      <Tab.Screen name="Workouts" component={WorkoutLevelsScreen} />
      <Tab.Screen name="Meals" component={MealPrepScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
};

// IT User Tab Navigator
const ITTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bugs') {
            iconName = focused ? 'bug' : 'bug-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={ITDashboard} />
      <Tab.Screen name="Bugs" component={BugTrackerScreen} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useAuth();
  
  console.log('[AppNavigator] Component rendered');
  console.log('[AppNavigator] Loading state:', loading);
  console.log('[AppNavigator] User state:', user);
  console.log('[AppNavigator] User role:', user?.role);

  if (loading) {
    console.log('[AppNavigator] Still loading, returning null');
    return null; // Or a loading screen
  }
  
  console.log('[AppNavigator] Loading complete, checking user role...');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            {user.role === 'admin' && (
              <>
                <Stack.Screen name="AdminTabs" component={AdminTabs} />
                <Stack.Screen 
                  name="UserManagement" 
                  component={UserManagementScreen}
                  options={{ headerShown: true, title: 'User Management' }}
                />
              </>
            )}
            {user.role === 'user' && (
              <>
                <Stack.Screen name="UserTabs" component={UserTabs} />
                <Stack.Screen 
                  name="WorkoutDetail" 
                  component={WorkoutDetailScreen}
                  options={{ headerShown: true, title: 'Workout Details' }}
                />
                <Stack.Screen 
                  name="ProductDetail" 
                  component={ProductDetailScreen}
                  options={{ headerShown: true, title: 'Product Details' }}
                />
              </>
            )}
            {user.role === 'ituser' && (
              <>
                <Stack.Screen name="ITTabs" component={ITTabs} />
                <Stack.Screen 
                  name="BugDetail" 
                  component={BugDetailScreen}
                  options={{ headerShown: true, title: 'Bug Details' }}
                />
                <Stack.Screen 
                  name="UserManagement" 
                  component={UserManagementScreen}
                  options={{ headerShown: true, title: 'User Management' }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
