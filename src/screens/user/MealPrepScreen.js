import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { mealPlans } from '../../database/data';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const MealPrepScreen = () => {
  const { user } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(user?.goal || 'fatloss');

  const currentPlan = mealPlans[selectedGoal];

  const mealTypes = [
    { key: 'breakfast', label: 'Breakfast', icon: 'sunny-outline', color: '#FF9500' },
    { key: 'lunch', label: 'Lunch', icon: 'restaurant-outline', color: '#007AFF' },
    { key: 'snacks', label: 'Snacks', icon: 'nutrition-outline', color: '#5856D6' },
    { key: 'dinner', label: 'Dinner', icon: 'moon-outline', color: '#34C759' },
  ];

  const goals = [
    { key: 'fatloss', label: 'Fat Loss', color: '#FF3B30' },
    { key: 'bulk', label: 'Muscle Building', color: '#34C759' },
    { key: 'recomposition', label: 'Body Recomposition', color: '#007AFF' },
  ];

  const handleMealPress = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const MealCard = ({ meal, type }) => (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={() => handleMealPress(meal)}
    >
      <View style={styles.mealHeader}>
        <View style={styles.mealIconContainer}>
          <Ionicons name={type.icon} size={24} color={type.color} />
        </View>
        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealCalories}>{meal.calories} calories</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
      <View style={styles.macros}>
        <View style={styles.macroItem}>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroValue}>{meal.protein}g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroValue}>{meal.carbs}g</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroLabel}>Fats</Text>
          <Text style={styles.macroValue}>{meal.fats}g</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Prep</Text>
        <Text style={styles.headerSubtitle}>
          Personalized nutrition for your goals
        </Text>
      </View>

      <View style={styles.goalSelector}>
        <Text style={styles.goalSelectorTitle}>Select Your Goal</Text>
        <View style={styles.goalButtons}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.key}
              style={[
                styles.goalButton,
                selectedGoal === goal.key && {
                  backgroundColor: goal.color,
                },
              ]}
              onPress={() => setSelectedGoal(goal.key)}
            >
              <Text
                style={[
                  styles.goalButtonText,
                  selectedGoal === goal.key && styles.goalButtonTextActive,
                ]}
              >
                {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.calorieBanner}>
        <Ionicons name="flame" size={32} color="#FF9500" />
        <View style={styles.calorieInfo}>
          <Text style={styles.calorieTitle}>Daily Target</Text>
          <Text style={styles.calorieValue}>{currentPlan.dailyCalories} kcal</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mealTypes.map((type) => (
          <View key={type.key} style={styles.mealSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name={type.icon} size={20} color={type.color} />
              <Text style={styles.sectionTitle}>{type.label}</Text>
            </View>
            {currentPlan.meals[type.key].map((meal, index) => (
              <MealCard key={index} meal={meal} type={type} />
            ))}
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Meal Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedMeal && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.mealDetailHeader}>
                  <Text style={styles.mealDetailName}>{selectedMeal.name}</Text>
                  <View style={styles.mealDetailCalories}>
                    <Ionicons name="flame" size={20} color="#FF9500" />
                    <Text style={styles.mealDetailCaloriesText}>
                      {selectedMeal.calories} kcal
                    </Text>
                  </View>
                </View>

                <View style={styles.macrosDetail}>
                  <View style={styles.macroDetailItem}>
                    <Text style={styles.macroDetailValue}>{selectedMeal.protein}g</Text>
                    <Text style={styles.macroDetailLabel}>Protein</Text>
                  </View>
                  <View style={styles.macroDetailItem}>
                    <Text style={styles.macroDetailValue}>{selectedMeal.carbs}g</Text>
                    <Text style={styles.macroDetailLabel}>Carbs</Text>
                  </View>
                  <View style={styles.macroDetailItem}>
                    <Text style={styles.macroDetailValue}>{selectedMeal.fats}g</Text>
                    <Text style={styles.macroDetailLabel}>Fats</Text>
                  </View>
                </View>

                <View style={styles.ingredientsSection}>
                  <Text style={styles.ingredientsTitle}>Ingredients</Text>
                  {selectedMeal.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={18} color="#34C759" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  goalSelector: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  goalSelectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  goalButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  goalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  goalButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  goalButtonTextActive: {
    color: 'white',
  },
  calorieBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  calorieInfo: {
    marginLeft: 15,
    flex: 1,
  },
  calorieTitle: {
    fontSize: 14,
    color: '#666',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  mealSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  mealCalories: {
    fontSize: 13,
    color: '#666',
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  mealDetailHeader: {
    marginBottom: 20,
  },
  mealDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mealDetailCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  mealDetailCaloriesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9500',
    marginLeft: 6,
  },
  macrosDetail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  macroDetailItem: {
    alignItems: 'center',
  },
  macroDetailValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  macroDetailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  ingredientsSection: {
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ingredientText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
});

export default MealPrepScreen;
