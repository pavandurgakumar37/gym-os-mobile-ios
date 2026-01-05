import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { users, orders, bugs } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: 'people-outline',
      color: '#007AFF',
    },
    {
      title: 'Active Orders',
      value: orders.length,
      icon: 'cart-outline',
      color: '#34C759',
    },
    {
      title: 'Open Bugs',
      value: bugs.filter(b => b.status === 'open').length,
      icon: 'bug-outline',
      color: '#FF9500',
    },
    {
      title: 'In Progress Bugs',
      value: bugs.filter(b => b.status === 'in-progress').length,
      icon: 'construct-outline',
      color: '#5856D6',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      message: 'New order placed by John Doe',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'bug',
      message: 'Bug reported: App crashes on workout completion',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'user',
      message: 'New user registered: Jane Smith',
      time: '1 day ago',
    },
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statIconContainer}>
        <Ionicons name={icon} size={30} color={color} />
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const ActivityItem = ({ type, message, time }) => {
    const iconColor = type === 'order' ? '#34C759' : type === 'bug' ? '#FF9500' : '#007AFF';
    const iconName = type === 'order' ? 'cart-outline' : type === 'bug' ? 'bug-outline' : 'person-outline';

    return (
      <View style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={iconName} size={20} color={iconColor} />
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityMessage}>{message}</Text>
          <Text style={styles.activityTime}>{time}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Users')}
        >
          <Ionicons name="people-outline" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <Ionicons name="cart-outline" size={24} color="#34C759" />
          <Text style={styles.actionButtonText}>View Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Bugs')}
        >
          <Ionicons name="bug-outline" size={24} color="#FF9500" />
          <Text style={styles.actionButtonText}>Bug Tracker</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityContainer}>
        {recentActivity.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  actionButton: {
    width: '31%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    marginRight: '3%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  activityContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  footer: {
    height: 20,
  },
});

export default AdminDashboard;
