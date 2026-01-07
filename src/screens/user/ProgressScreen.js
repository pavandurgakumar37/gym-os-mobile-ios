import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { progressData } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const ProgressScreen = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const userProgress = progressData[user?.id];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'grid-outline' },
    { key: 'weight', label: 'Weight', icon: 'scale-outline' },
    { key: 'measurements', label: 'Measurements', icon: 'body-outline' },
    { key: 'workouts', label: 'Workouts', icon: 'fitness-outline' },
  ];

  const calculateWeightChange = () => {
    if (!userProgress || userProgress.weightHistory.length < 2) return 0;
    const first = userProgress.weightHistory[0].weight;
    const last = userProgress.weightHistory[userProgress.weightHistory.length - 1].weight;
    return (last - first).toFixed(1);
  };

  const calculateMeasurementChange = (measurement) => {
    if (!userProgress || userProgress.bodyMeasurements.length < 2) return 0;
    const first = userProgress.bodyMeasurements[0][measurement];
    const last = userProgress.bodyMeasurements[userProgress.bodyMeasurements.length - 1][measurement];
    return (last - first).toFixed(1);
  };

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.streakCard}>
        <Ionicons name="flame" size={48} color="#FF9500" />
        <View style={styles.streakInfo}>
          <Text style={styles.streakValue}>{user?.streak || 0}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        <View style={styles.streakTrend}>
          <Ionicons name="trending-up" size={20} color="#34C759" />
          <Text style={styles.streakTrendText}>+2 this week</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Weight Progress</Text>
      {userProgress && userProgress.weightHistory.length > 0 ? (
        <View style={styles.weightCard}>
          <View style={styles.weightHeader}>
            <Text style={styles.currentWeight}>
              {userProgress.weightHistory[userProgress.weightHistory.length - 1].weight} kg
            </Text>
            <View style={[
              styles.weightChange,
              calculateWeightChange() >= 0 ? styles.weightChangePositive : styles.weightChangeNegative
            ]}>
              <Ionicons
                name={calculateWeightChange() >= 0 ? 'arrow-up' : 'arrow-down'}
                size={16}
                color="white"
              />
              <Text style={styles.weightChangeText}>
                {Math.abs(calculateWeightChange())} kg
              </Text>
            </View>
          </View>
          <View style={styles.weightHistory}>
            {userProgress.weightHistory.slice(-5).map((entry, index) => (
              <View key={index} style={styles.weightHistoryItem}>
                <Text style={styles.weightHistoryDate}>
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.weightHistoryValue}>{entry.weight} kg</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="scale-outline" size={40} color="#999" />
          <Text style={styles.emptyText}>No weight data yet</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Body Measurements</Text>
      {userProgress && userProgress.bodyMeasurements.length > 0 ? (
        <View style={styles.measurementsGrid}>
          <View style={styles.measurementCard}>
            <Ionicons name="body-outline" size={24} color="#007AFF" />
            <Text style={styles.measurementLabel}>Chest</Text>
            <Text style={styles.measurementValue}>
              {userProgress.bodyMeasurements[userProgress.bodyMeasurements.length - 1].chest} cm
            </Text>
            <Text style={[
              styles.measurementChange,
              calculateMeasurementChange('chest') >= 0 ? styles.measurementChangePositive : styles.measurementChangeNegative
            ]}>
              {calculateMeasurementChange('chest') >= 0 ? '+' : ''}{calculateMeasurementChange('chest')} cm
            </Text>
          </View>

          <View style={styles.measurementCard}>
            <Ionicons name="body-outline" size={24} color="#34C759" />
            <Text style={styles.measurementLabel}>Waist</Text>
            <Text style={styles.measurementValue}>
              {userProgress.bodyMeasurements[userProgress.bodyMeasurements.length - 1].waist} cm
            </Text>
            <Text style={[
              styles.measurementChange,
              calculateMeasurementChange('waist') >= 0 ? styles.measurementChangePositive : styles.measurementChangeNegative
            ]}>
              {calculateMeasurementChange('waist') >= 0 ? '+' : ''}{calculateMeasurementChange('waist')} cm
            </Text>
          </View>

          <View style={styles.measurementCard}>
            <Ionicons name="fitness-outline" size={24} color="#FF9500" />
            <Text style={styles.measurementLabel}>Arms</Text>
            <Text style={styles.measurementValue}>
              {userProgress.bodyMeasurements[userProgress.bodyMeasurements.length - 1].arms} cm
            </Text>
            <Text style={[
              styles.measurementChange,
              calculateMeasurementChange('arms') >= 0 ? styles.measurementChangePositive : styles.measurementChangeNegative
            ]}>
              {calculateMeasurementChange('arms') >= 0 ? '+' : ''}{calculateMeasurementChange('arms')} cm
            </Text>
          </View>

          <View style={styles.measurementCard}>
            <Ionicons name="walk-outline" size={24} color="#5856D6" />
            <Text style={styles.measurementLabel}>Thighs</Text>
            <Text style={styles.measurementValue}>
              {userProgress.bodyMeasurements[userProgress.bodyMeasurements.length - 1].thighs} cm
            </Text>
            <Text style={[
              styles.measurementChange,
              calculateMeasurementChange('thighs') >= 0 ? styles.measurementChangePositive : styles.measurementChangeNegative
            ]}>
              {calculateMeasurementChange('thighs') >= 0 ? '+' : ''}{calculateMeasurementChange('thighs')} cm
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="body-outline" size={40} color="#999" />
          <Text style={styles.emptyText}>No measurement data yet</Text>
        </View>
      )}
    </View>
  );

  const renderWeight = () => (
    <View style={styles.tabContent}>
      {userProgress && userProgress.weightHistory.length > 0 ? (
        <View style={styles.weightDetailCard}>
          <Text style={styles.detailTitle}>Weight History</Text>
          <View style={styles.weightList}>
            {userProgress.weightHistory.map((entry, index) => (
              <View key={index} style={styles.weightListItem}>
                <View style={styles.weightListLeft}>
                  <Text style={styles.weightListDate}>{entry.date}</Text>
                  <Text style={styles.weightListDay}>
                    {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </Text>
                </View>
                <View style={styles.weightListRight}>
                  <Text style={styles.weightListValue}>{entry.weight} kg</Text>
                  {index > 0 && (
                    <Text style={[
                      styles.weightListChange,
                      (entry.weight - userProgress.weightHistory[index - 1].weight) >= 0
                        ? styles.weightListChangePositive
                        : styles.weightListChangeNegative
                    ]}>
                      {(entry.weight - userProgress.weightHistory[index - 1].weight) >= 0 ? '+' : ''}
                      {(entry.weight - userProgress.weightHistory[index - 1].weight).toFixed(1)} kg
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="scale-outline" size={60} color="#999" />
          <Text style={styles.emptyTitle}>No Weight Data</Text>
          <Text style={styles.emptyText}>Start tracking your weight to see progress</Text>
        </View>
      )}
    </View>
  );

  const renderMeasurements = () => (
    <View style={styles.tabContent}>
      {userProgress && userProgress.bodyMeasurements.length > 0 ? (
        <View style={styles.measurementsDetailCard}>
          <Text style={styles.detailTitle}>Measurement History</Text>
          {userProgress.bodyMeasurements.map((entry, index) => (
            <View key={index} style={styles.measurementDetailItem}>
              <View style={styles.measurementDetailHeader}>
                <Text style={styles.measurementDetailDate}>{entry.date}</Text>
              </View>
              <View style={styles.measurementDetailGrid}>
                <View style={styles.measurementDetailCell}>
                  <Text style={styles.measurementDetailCellLabel}>Chest</Text>
                  <Text style={styles.measurementDetailCellValue}>{entry.chest} cm</Text>
                </View>
                <View style={styles.measurementDetailCell}>
                  <Text style={styles.measurementDetailCellLabel}>Waist</Text>
                  <Text style={styles.measurementDetailCellValue}>{entry.waist} cm</Text>
                </View>
                <View style={styles.measurementDetailCell}>
                  <Text style={styles.measurementDetailCellLabel}>Arms</Text>
                  <Text style={styles.measurementDetailCellValue}>{entry.arms} cm</Text>
                </View>
                <View style={styles.measurementDetailCell}>
                  <Text style={styles.measurementDetailCellLabel}>Thighs</Text>
                  <Text style={styles.measurementDetailCellValue}>{entry.thighs} cm</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="body-outline" size={60} color="#999" />
          <Text style={styles.emptyTitle}>No Measurement Data</Text>
          <Text style={styles.emptyText}>Start tracking your measurements to see progress</Text>
        </View>
      )}
    </View>
  );

  const renderWorkouts = () => (
    <View style={styles.tabContent}>
      {userProgress && userProgress.workoutHistory.length > 0 ? (
        <View style={styles.workoutsCard}>
          <Text style={styles.detailTitle}>Recent Workouts</Text>
          {userProgress.workoutHistory.map((entry, index) => (
            <View key={index} style={styles.workoutItem}>
              <View style={[
                styles.workoutStatus,
                entry.completed ? styles.workoutCompleted : styles.workoutSkipped
              ]}>
                <Ionicons
                  name={entry.completed ? 'checkmark' : 'close'}
                  size={16}
                  color="white"
                />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{entry.workout}</Text>
                <Text style={styles.workoutDate}>{entry.date}</Text>
              </View>
              <View style={[
                styles.workoutBadge,
                entry.completed ? styles.workoutBadgeCompleted : styles.workoutBadgeSkipped
              ]}>
                <Text style={styles.workoutBadgeText}>
                  {entry.completed ? 'Completed' : 'Skipped'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="fitness-outline" size={60} color="#999" />
          <Text style={styles.emptyTitle}>No Workout Data</Text>
          <Text style={styles.emptyText}>Start working out to track your progress</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress Tracker</Text>
        <Text style={styles.headerSubtitle}>
          Track your fitness journey
        </Text>
      </View>

      <View style={styles.tabSelector}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              selectedTab === tab.key && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={selectedTab === tab.key ? '#007AFF' : '#999'}
            />
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === tab.key && styles.tabButtonTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'weight' && renderWeight()}
        {selectedTab === 'measurements' && renderMeasurements()}
        {selectedTab === 'workouts' && renderWorkouts()}
      </ScrollView>
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 5,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabButtonText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  overviewContainer: {
    gap: 20,
  },
  streakCard: {
    backgroundColor: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FF9500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  streakInfo: {
    flex: 1,
    marginLeft: 15,
  },
  streakValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  streakLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  streakTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  streakTrendText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 4,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weightCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  currentWeight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  weightChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  weightChangePositive: {
    backgroundColor: '#E8F5E9',
  },
  weightChangeNegative: {
    backgroundColor: '#FFEBEE',
  },
  weightChangeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  weightHistory: {
    gap: 10,
  },
  weightHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  weightHistoryDate: {
    fontSize: 14,
    color: '#666',
  },
  weightHistoryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  measurementCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  measurementChange: {
    fontSize: 12,
    marginTop: 4,
  },
  measurementChangePositive: {
    color: '#34C759',
  },
  measurementChangeNegative: {
    color: '#FF3B30',
  },
  tabContent: {
    flex: 1,
  },
  weightDetailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  weightList: {
    gap: 15,
  },
  weightListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  weightListLeft: {
    flex: 1,
  },
  weightListDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  weightListDay: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  weightListRight: {
    alignItems: 'flex-end',
  },
  weightListValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  weightListChange: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  weightListChangePositive: {
    color: '#34C759',
  },
  weightListChangeNegative: {
    color: '#FF3B30',
  },
  measurementsDetailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  measurementDetailItem: {
    marginBottom: 20,
  },
  measurementDetailHeader: {
    marginBottom: 10,
  },
  measurementDetailDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  measurementDetailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  measurementDetailCell: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
  },
  measurementDetailCellLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  measurementDetailCellValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  workoutStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutCompleted: {
    backgroundColor: '#34C759',
  },
  workoutSkipped: {
    backgroundColor: '#FF3B30',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  workoutDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  workoutBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  workoutBadgeCompleted: {
    backgroundColor: '#E8F5E9',
  },
  workoutBadgeSkipped: {
    backgroundColor: '#FFEBEE',
  },
  workoutBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ProgressScreen;
