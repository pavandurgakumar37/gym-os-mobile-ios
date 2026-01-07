import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { workoutLevels } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const WorkoutLevelsScreen = ({ navigation }) => {
  const { user } = useAuth();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1:
        return '#34C759';
      case 2:
        return '#007AFF';
      case 3:
        return '#5856D6';
      case 4:
        return '#FF9500';
      case 5:
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      case 4:
        return 'Elite';
      case 5:
        return 'God-Level';
      default:
        return 'Unknown';
    }
  };

  const isCurrentLevel = (levelName) => {
    return levelName.toLowerCase() === user?.currentLevel?.toLowerCase();
  };

  const renderDifficultyStars = (difficulty) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < difficulty ? 'star' : 'star-outline'}
        size={16}
        color={getDifficultyColor(difficulty)}
      />
    ));
  };

  const WorkoutCard = ({ level }) => (
    <TouchableOpacity
      style={[
        styles.workoutCard,
        isCurrentLevel(level.name) && styles.currentWorkoutCard
      ]}
      onPress={() => navigation.navigate('WorkoutDetail', { level })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelName}>{level.name}</Text>
          {isCurrentLevel(level.name) && (
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>CURRENT</Text>
            </View>
          )}
        </View>
        <View style={styles.difficultyContainer}>
          <View style={styles.stars}>
            {renderDifficultyStars(level.difficulty)}
          </View>
          <Text style={[styles.difficultyText, { color: getDifficultyColor(level.difficulty) }]}>
            {getDifficultyLabel(level.difficulty)}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{level.description}</Text>

      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={18} color="#666" />
          <Text style={styles.metaText}>{level.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="fitness-outline" size={18} color="#666" />
          <Text style={styles.metaText}>{level.workouts.length} workouts</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.viewWorkoutsText}>View Workouts</Text>
        <Ionicons name="arrow-forward" size={20} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout Programs</Text>
        <Text style={styles.headerSubtitle}>
          Choose your fitness level and start training
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {workoutLevels.map((level) => (
          <WorkoutCard key={level.id} level={level} />
        ))}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentWorkoutCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  currentBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  difficultyContainer: {
    alignItems: 'flex-end',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  cardMeta: {
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
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    padding: 12,
  },
  viewWorkoutsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 8,
  },
});

export default WorkoutLevelsScreen;
