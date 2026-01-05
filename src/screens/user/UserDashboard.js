import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { workoutLevels, mealPlans } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const UserDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const currentWorkoutLevel = workoutLevels.find(level => 
    level.name.toLowerCase() === user.currentLevel?.toLowerCase()
  ) || workoutLevels[0];

  const currentMealPlan = mealPlans[user.goal] || mealPlans.fatloss;

  const stats = [
    {
      title: 'Current Streak',
      value: `${user.streak || 0} days`,
      icon: 'flame-outline',
      color: '#FF9500',
    },
    {
      title: 'Workout Level',
      value: user.currentLevel || 'Beginner',
      icon: 'fitness-outline',
      color: '#007AFF',
    },
    {
      title: 'Daily Calories',
      value: `${currentMealPlan.dailyCalories} kcal`,
      icon: 'restaurant-outline',
      color: '#34C759',
    },
    {
      title: 'Goal',
      value: user.goal || 'Not set',
      icon: 'flag-outline',
      color: '#5856D6',
    },
  ];

  const quickActions = [
    {
      title: 'Start Workout',
      icon: 'play-circle-outline',
      color: '#007AFF',
      onPress: () => navigation.navigate('Workouts'),
    },
    {
      title: 'View Meals',
      icon: 'restaurant-outline',
      color: '#34C759',
      onPress: () => navigation.navigate('Meals'),
    },
    {
      title: 'Track Progress',
      icon: 'stats-chart-outline',
      color: '#FF9500',
      onPress: () => navigation.navigate('Progress'),
    },
    {
      title: 'Shop Now',
      icon: 'cart-outline',
      color: '#5856D6',
      onPress: () => navigation.navigate('Shop'),
    },
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statIconContainer}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const ActionButton = ({ title, icon, color, onPress }) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: color + '15' }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color={color} />
      <Text style={[styles.actionButtonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.streakBanner}>
        <Ionicons name="flame" size={40} color="#FF9500" />
        <View style={styles.streakContent}>
          <Text style={styles.streakTitle}>You're on fire!</Text>
          <Text style={styles.streakText}>
            {user.streak || 0} day streak - Keep it up!
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Stats</Text>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        {quickActions.map((action, index) => (
          <ActionButton key={index} {...action} />
        ))}
      </View>

      <View style={styles.currentWorkoutCard}>
        <Text style={styles.cardTitle}>Current Workout Program</Text>
        <Text style={styles.workoutName}>{currentWorkoutLevel.name}</Text>
        <Text style={styles.workoutDescription}>{currentWorkoutLevel.description}</Text>
        <View style={styles.workoutMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{currentWorkoutLevel.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="barbell-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{currentWorkoutLevel.workouts.length} workouts</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Workouts')}
        >
          <Text style={styles.continueButtonText}>Continue Training</Text>
          <Ionicons name="arrow-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.currentMealCard}>
        <Text style={styles.cardTitle}>Today's Nutrition</Text>
        <Text style={styles.mealPlanName}>{currentMealPlan.name} Plan</Text>
        <Text style={styles.caloriesText}>{currentMealPlan.dailyCalories} calories/day</Text>
        <TouchableOpacity
          style={styles.viewMealsButton}
          onPress={() => navigation.navigate('Meals')}
        >
          <Text style={styles.viewMealsButtonText}>View Meal Plan</Text>
          <Ionicons name="arrow-forward" size={20} color="#34C759" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  streakContent: {
    marginLeft: 15,
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  streakText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  actionButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    marginRight: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
  currentWorkoutCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  workoutMeta: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  currentMealCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealPlanName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 5,
  },
  caloriesText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  viewMealsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    borderRadius: 10,
    padding: 15,
  },
  viewMealsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footer: {
    height: 20,
  },
});

export default UserDashboard;
