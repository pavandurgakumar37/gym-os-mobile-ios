import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { level } = route.params;

  const renderExercise = (exercise, index) => (
    <View key={index} style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseNumber}>{index + 1}</Text>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
      </View>
      <View style={styles.exerciseDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="repeat-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{exercise.sets} sets</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="list-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{exercise.reps} reps</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{exercise.rest} rest</Text>
        </View>
      </View>
    </View>
  );

  const WorkoutCard = ({ workout }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <View style={styles.workoutMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{workout.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={16} color="#FF9500" />
              <Text style={styles.metaText}>{workout.calories} cal</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.startButton}>
          <Ionicons name="play" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.exercisesContainer}>
        {workout.exercises.map((exercise, index) => renderExercise(exercise, index))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{level.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.levelInfo}>
        <Text style={styles.levelDescription}>{level.description}</Text>
        <View style={styles.levelStats}>
          <View style={styles.statBadge}>
            <Ionicons name="calendar-outline" size={18} color="#007AFF" />
            <Text style={styles.statText}>{level.duration}</Text>
          </View>
          <View style={styles.statBadge}>
            <Ionicons name="fitness-outline" size={18} color="#007AFF" />
            <Text style={styles.statText}>{level.workouts.length} workouts</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Workouts</Text>
      {level.workouts.map((workout, index) => (
        <WorkoutCard key={index} workout={workout} />
      ))}

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
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  levelInfo: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  levelStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  statText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 6,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  startButton: {
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  exercisesContainer: {
    gap: 12,
  },
  exerciseCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  footer: {
    height: 20,
  },
});

export default WorkoutDetailScreen;
