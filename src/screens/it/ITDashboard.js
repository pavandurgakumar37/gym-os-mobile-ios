import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { bugs, users } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const ITDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Open Bugs',
      value: bugs.filter(b => b.status === 'open').length,
      icon: 'bug-outline',
      color: '#FF3B30',
    },
    {
      title: 'In Progress',
      value: bugs.filter(b => b.status === 'in-progress').length,
      icon: 'construct-outline',
      color: '#FF9500',
    },
    {
      title: 'Resolved',
      value: bugs.filter(b => b.status === 'resolved').length,
      icon: 'checkmark-circle-outline',
      color: '#34C759',
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: 'people-outline',
      color: '#007AFF',
    },
  ];

  const recentBugs = bugs.slice(0, 3);

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

  const BugItem = ({ bug }) => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'high':
          return '#FF3B30';
        case 'medium':
          return '#FF9500';
        case 'low':
          return '#34C759';
        default:
          return '#666';
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'open':
          return '#FF3B30';
        case 'in-progress':
          return '#FF9500';
        case 'resolved':
          return '#34C759';
        default:
          return '#666';
      }
    };

    const getBugUser = (userId) => {
      return users.find(u => u.id === userId);
    };

    return (
      <TouchableOpacity
        style={styles.bugCard}
        onPress={() => navigation.navigate('BugDetail', { bug })}
      >
        <View style={styles.bugHeader}>
          <View style={styles.bugInfo}>
            <Text style={styles.bugTitle}>{bug.title}</Text>
            <Text style={styles.bugReporter}>
              {getBugUser(bug.reportedBy)?.name || 'Unknown'}
            </Text>
          </View>
          <View style={styles.bugBadges}>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(bug.severity) + '20' }]}>
              <Text style={[styles.severityText, { color: getSeverityColor(bug.severity) }]}>
                {bug.severity.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bugFooter}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bug.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(bug.status) }]}>
              {bug.status.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.bugDate}>{bug.reportedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'IT User'}</Text>
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
          onPress={() => navigation.navigate('Bugs')}
        >
          <Ionicons name="bug-outline" size={24} color="#FF3B30" />
          <Text style={styles.actionButtonText}>View All Bugs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Users')}
        >
          <Ionicons name="people-outline" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Bugs')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#34C759" />
          <Text style={styles.actionButtonText}>Report Bug</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Bugs</Text>
      <View style={styles.bugsContainer}>
        {recentBugs.map((bug) => (
          <BugItem key={bug.id} bug={bug} />
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
  bugsContainer: {
    paddingHorizontal: 20,
  },
  bugCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bugInfo: {
    flex: 1,
  },
  bugTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bugReporter: {
    fontSize: 13,
    color: '#666',
  },
  bugBadges: {
    marginLeft: 10,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  bugFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  bugDate: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    height: 20,
  },
});

export default ITDashboard;
