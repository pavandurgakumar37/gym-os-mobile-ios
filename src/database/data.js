// Static Database for Gym OS App

export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@gymos.com',
    role: 'admin',
    name: 'Admin User',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    username: 'john',
    password: 'user123',
    email: 'john@gymos.com',
    role: 'user',
    name: 'John Doe',
    goal: 'fatloss',
    currentLevel: 'beginner',
    streak: 7,
    createdAt: '2024-01-15'
  },
  {
    id: 3,
    username: 'jane',
    password: 'user123',
    email: 'jane@gymos.com',
    role: 'user',
    name: 'Jane Smith',
    goal: 'bulk',
    currentLevel: 'moderate',
    streak: 14,
    createdAt: '2024-01-20'
  },
  {
    id: 4,
    username: 'mike',
    password: 'user123',
    email: 'mike@gymos.com',
    role: 'user',
    name: 'Mike Johnson',
    goal: 'recomposition',
    currentLevel: 'pro-level',
    streak: 21,
    createdAt: '2024-01-10'
  },
  {
    id: 5,
    username: 'ituser',
    password: 'it123',
    email: 'it@gymos.com',
    role: 'ituser',
    name: 'IT Support',
    createdAt: '2024-01-05'
  }
];

export const workoutLevels = [
  {
    id: 1,
    name: 'Beginner',
    description: 'Perfect for those just starting their fitness journey',
    duration: '4-6 weeks',
    difficulty: 1,
    workouts: [
      {
        id: 1,
        name: 'Full Body Basics',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 10, rest: '60s' },
          { name: 'Bodyweight Squats', sets: 3, reps: 15, rest: '60s' },
          { name: 'Plank', sets: 3, reps: '30s', rest: '45s' },
          { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s' },
          { name: 'Jumping Jacks', sets: 3, reps: 20, rest: '45s' }
        ],
        calories: 200,
        duration: '30 min'
      },
      {
        id: 2,
        name: 'Core Foundation',
        exercises: [
          { name: 'Crunches', sets: 3, reps: 15, rest: '45s' },
          { name: 'Leg Raises', sets: 3, reps: 10, rest: '45s' },
          { name: 'Russian Twists', sets: 3, reps: 20, rest: '45s' },
          { name: 'Mountain Climbers', sets: 3, reps: 20, rest: '60s' },
          { name: 'Dead Bug', sets: 3, reps: '10 each side', rest: '45s' }
        ],
        calories: 150,
        duration: '25 min'
      }
    ]
  },
  {
    id: 2,
    name: 'Moderate',
    description: 'For those with some gym experience',
    duration: '6-8 weeks',
    difficulty: 2,
    workouts: [
      {
        id: 3,
        name: 'Upper Body Strength',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 10, rest: '90s' },
          { name: 'Bent Over Rows', sets: 4, reps: 10, rest: '90s' },
          { name: 'Overhead Press', sets: 3, reps: 12, rest: '75s' },
          { name: 'Pull-ups', sets: 3, reps: 8, rest: '90s' },
          { name: 'Tricep Dips', sets: 3, reps: 12, rest: '60s' }
        ],
        calories: 300,
        duration: '45 min'
      },
      {
        id: 4,
        name: 'Lower Body Power',
        exercises: [
          { name: 'Squats', sets: 4, reps: 12, rest: '90s' },
          { name: 'Deadlifts', sets: 4, reps: 8, rest: '120s' },
          { name: 'Leg Press', sets: 3, reps: 15, rest: '75s' },
          { name: 'Calf Raises', sets: 4, reps: 15, rest: '45s' },
          { name: 'Leg Curls', sets: 3, reps: 12, rest: '60s' }
        ],
        calories: 350,
        duration: '50 min'
      }
    ]
  },
  {
    id: 3,
    name: 'Pro-Level',
    description: 'Advanced training for experienced athletes',
    duration: '8-10 weeks',
    difficulty: 3,
    workouts: [
      {
        id: 5,
        name: 'Push Pull Legs A',
        exercises: [
          { name: 'Incline Bench Press', sets: 5, reps: 8, rest: '120s' },
          { name: 'Weighted Pull-ups', sets: 5, reps: 6, rest: '120s' },
          { name: 'Shoulder Press', sets: 4, reps: 10, rest: '90s' },
          { name: 'Face Pulls', sets: 4, reps: 15, rest: '60s' },
          { name: 'Tricep Extensions', sets: 4, reps: 12, rest: '60s' },
          { name: 'Bicep Curls', sets: 4, reps: 12, rest: '60s' }
        ],
        calories: 450,
        duration: '60 min'
      },
      {
        id: 6,
        name: 'Push Pull Legs B',
        exercises: [
          { name: 'Back Squats', sets: 5, reps: 6, rest: '150s' },
          { name: 'Romanian Deadlifts', sets: 4, reps: 10, rest: '120s' },
          { name: 'Leg Press', sets: 4, reps: 12, rest: '90s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '75s' },
          { name: 'Calf Raises', sets: 5, reps: 20, rest: '45s' },
          { name: 'Leg Extensions', sets: 4, reps: 15, rest: '60s' }
        ],
        calories: 500,
        duration: '65 min'
      }
    ]
  },
  {
    id: 4,
    name: 'Elite',
    description: 'Elite level training for competitive athletes',
    duration: '10-12 weeks',
    difficulty: 4,
    workouts: [
      {
        id: 7,
        name: 'Hypertrophy Focus',
        exercises: [
          { name: 'Flat Bench Press', sets: 6, reps: 8, rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 4, reps: 10, rest: '75s' },
          { name: 'Cable Flyes', sets: 4, reps: 15, rest: '60s' },
          { name: 'T-Bar Rows', sets: 5, reps: 10, rest: '90s' },
          { name: 'Lat Pulldowns', sets: 4, reps: 12, rest: '75s' },
          { name: 'Face Pulls', sets: 4, reps: 15, rest: '45s' }
        ],
        calories: 550,
        duration: '70 min'
      },
      {
        id: 8,
        name: 'Strength Focus',
        exercises: [
          { name: 'Deadlift', sets: 5, reps: 5, rest: '180s' },
          { name: 'Bench Press', sets: 5, reps: 5, rest: '150s' },
          { name: 'Squats', sets: 5, reps: 5, rest: '180s' },
          { name: 'Overhead Press', sets: 4, reps: 6, rest: '120s' },
          { name: 'Barbell Rows', sets: 4, reps: 6, rest: '120s' }
        ],
        calories: 600,
        duration: '75 min'
      }
    ]
  },
  {
    id: 5,
    name: 'God-Level',
    description: 'Ultimate challenge for the dedicated',
    duration: '12+ weeks',
    difficulty: 5,
    workouts: [
      {
        id: 9,
        name: 'Ultimate Full Body',
        exercises: [
          { name: 'Squat', sets: 6, reps: 4, rest: '180s' },
          { name: 'Bench Press', sets: 6, reps: 4, rest: '150s' },
          { name: 'Deadlift', sets: 5, reps: 3, rest: '240s' },
          { name: 'Overhead Press', sets: 5, reps: 5, rest: '120s' },
          { name: 'Weighted Pull-ups', sets: 5, reps: 5, rest: '120s' },
          { name: 'Barbell Rows', sets: 5, reps: 5, rest: '120s' },
          { name: 'Dips', sets: 4, reps: 10, rest: '90s' },
          { name: 'Core Circuit', sets: 3, reps: 'varied', rest: '60s' }
        ],
        calories: 800,
        duration: '90 min'
      }
    ]
  }
];

export const mealPlans = {
  fatloss: {
    name: 'Fat Loss',
    dailyCalories: 1800,
    meals: {
      breakfast: [
        {
          id: 1,
          name: 'Protein Oatmeal',
          ingredients: ['1/2 cup oats', '1 scoop protein powder', '1 banana', 'almonds'],
          calories: 350,
          protein: 30,
          carbs: 45,
          fats: 8
        },
        {
          id: 2,
          name: 'Egg White Omelette',
          ingredients: ['4 egg whites', 'spinach', 'tomatoes', 'whole wheat toast'],
          calories: 300,
          protein: 28,
          carbs: 25,
          fats: 5
        }
      ],
      lunch: [
        {
          id: 3,
          name: 'Grilled Chicken Salad',
          ingredients: ['150g chicken breast', 'mixed greens', 'cucumber', 'light dressing'],
          calories: 400,
          protein: 40,
          carbs: 15,
          fats: 12
        },
        {
          id: 4,
          name: 'Turkey Wrap',
          ingredients: ['whole wheat wrap', '150g turkey', 'lettuce', 'tomato', 'mustard'],
          calories: 380,
          protein: 35,
          carbs: 30,
          fats: 10
        }
      ],
      snacks: [
        {
          id: 5,
          name: 'Greek Yogurt',
          ingredients: ['1 cup greek yogurt', 'berries', 'honey'],
          calories: 180,
          protein: 20,
          carbs: 20,
          fats: 3
        },
        {
          id: 6,
          name: 'Apple & Almonds',
          ingredients: ['1 apple', '15 almonds'],
          calories: 200,
          protein: 5,
          carbs: 25,
          fats: 10
        }
      ],
      dinner: [
        {
          id: 7,
          name: 'Baked Salmon',
          ingredients: ['150g salmon', 'steamed broccoli', 'quinoa'],
          calories: 450,
          protein: 35,
          carbs: 30,
          fats: 18
        },
        {
          id: 8,
          name: 'Lean Beef Stir-fry',
          ingredients: ['150g lean beef', 'mixed vegetables', 'brown rice'],
          calories: 420,
          protein: 38,
          carbs: 35,
          fats: 12
        }
      ]
    }
  },
  bulk: {
    name: 'Muscle Building',
    dailyCalories: 3000,
    meals: {
      breakfast: [
        {
          id: 9,
          name: 'Power Breakfast',
          ingredients: ['4 eggs', '2 slices whole wheat toast', 'avocado', '1 cup milk'],
          calories: 600,
          protein: 35,
          carbs: 50,
          fats: 28
        },
        {
          id: 10,
          name: 'Protein Pancakes',
          ingredients: ['protein pancakes', 'banana', 'peanut butter', 'maple syrup'],
          calories: 650,
          protein: 40,
          carbs: 70,
          fats: 22
        }
      ],
      lunch: [
        {
          id: 11,
          name: 'Bodybuilder Bowl',
          ingredients: ['200g chicken breast', '1 cup rice', 'black beans', 'cheese'],
          calories: 750,
          protein: 55,
          carbs: 70,
          fats: 20
        },
        {
          id: 12,
          name: 'Beef Burrito',
          ingredients: ['large tortilla', '200g ground beef', 'rice', 'beans', 'cheese'],
          calories: 800,
          protein: 50,
          carbs: 80,
          fats: 28
        }
      ],
      snacks: [
        {
          id: 13,
          name: 'Mass Gainer Shake',
          ingredients: ['protein powder', 'oats', 'peanut butter', 'banana', 'milk'],
          calories: 500,
          protein: 40,
          carbs: 55,
          fats: 15
        },
        {
          id: 14,
          name: 'Trail Mix',
          ingredients: ['nuts', 'seeds', 'dried fruit', 'dark chocolate'],
          calories: 350,
          protein: 10,
          carbs: 40,
          fats: 20
        }
      ],
      dinner: [
        {
          id: 15,
          name: 'Steak & Potatoes',
          ingredients: ['200g steak', '2 potatoes', 'asparagus', 'butter'],
          calories: 800,
          protein: 55,
          carbs: 60,
          fats: 32
        },
        {
          id: 16,
          name: 'Pasta Carbonara',
          ingredients: ['whole wheat pasta', 'chicken breast', 'eggs', 'parmesan'],
          calories: 750,
          protein: 45,
          carbs: 75,
          fats: 28
        }
      ]
    }
  },
  recomposition: {
    name: 'Body Recomposition',
    dailyCalories: 2400,
    meals: {
      breakfast: [
        {
          id: 17,
          name: 'Balanced Bowl',
          ingredients: ['3 eggs', 'oatmeal', 'berries', 'almond butter'],
          calories: 500,
          protein: 30,
          carbs: 50,
          fats: 18
        },
        {
          id: 18,
          name: 'Avocado Toast',
          ingredients: ['2 slices sourdough', '1 avocado', '2 poached eggs', 'tomato'],
          calories: 480,
          protein: 22,
          carbs: 40,
          fats: 24
        }
      ],
      lunch: [
        {
          id: 19,
          name: 'Chicken Quinoa Bowl',
          ingredients: ['175g chicken', '1 cup quinoa', 'roasted vegetables', 'olive oil'],
          calories: 600,
          protein: 45,
          carbs: 55,
          fats: 18
        },
        {
          id: 20,
          name: 'Tuna Salad',
          ingredients: ['tuna', 'mixed greens', 'quinoa', 'hard-boiled egg', 'olive oil'],
          calories: 550,
          protein: 40,
          carbs: 45,
          fats: 20
        }
      ],
      snacks: [
        {
          id: 21,
          name: 'Protein Smoothie',
          ingredients: ['protein powder', 'spinach', 'banana', 'almond milk'],
          calories: 280,
          protein: 30,
          carbs: 30,
          fats: 6
        },
        {
          id: 22,
          name: 'Hummus & Veggies',
          ingredients: ['hummus', 'carrots', 'cucumber', 'whole wheat pita'],
          calories: 320,
          protein: 12,
          carbs: 40,
          fats: 14
        }
      ],
      dinner: [
        {
          id: 23,
          name: 'Grilled Fish',
          ingredients: ['175g white fish', 'sweet potato', 'green beans', 'olive oil'],
          calories: 580,
          protein: 40,
          carbs: 50,
          fats: 20
        },
        {
          id: 24,
          name: 'Lean Beef Bowl',
          ingredients: ['175g lean beef', 'brown rice', 'vegetables', 'teriyaki sauce'],
          calories: 600,
          protein: 42,
          carbs: 55,
          fats: 18
        }
      ]
    }
  }
};

export const products = {
  apparels: [
    {
      id: 1,
      name: 'Performance T-Shirt',
      price: 29.99,
      description: 'Moisture-wicking fabric, perfect for intense workouts',
      image: '👕',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Navy', 'Red'],
      stock: 50
    },
    {
      id: 2,
      name: 'Compression Shorts',
      price: 34.99,
      description: 'Supportive fit with 4-way stretch technology',
      image: '🩳',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Grey'],
      stock: 35
    },
    {
      id: 3,
      name: 'Training Hoodie',
      price: 59.99,
      description: 'Warm and breathable for pre and post workout',
      image: '🧥',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey', 'Navy'],
      stock: 25
    },
    {
      id: 4,
      name: 'Sports Bra',
      price: 39.99,
      description: 'High impact support with removable pads',
      image: '👚',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Pink', 'Purple'],
      stock: 40
    },
    {
      id: 5,
      name: 'Training Pants',
      price: 49.99,
      description: 'Comfortable joggers with zippered pockets',
      image: '👖',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey', 'Navy'],
      stock: 30
    }
  ],
  food: [
    {
      id: 6,
      name: 'Whey Protein Isolate',
      price: 54.99,
      description: '25g protein per serving, zero lactose',
      image: '🥛',
      flavors: ['Chocolate', 'Vanilla', 'Strawberry', 'Cookies & Cream'],
      weight: '2 lbs',
      stock: 60
    },
    {
      id: 7,
      name: 'BCAA Powder',
      price: 29.99,
      description: '2:1:1 ratio for muscle recovery',
      image: '🧪',
      flavors: ['Fruit Punch', 'Blue Raspberry', 'Watermelon'],
      weight: '1 lb',
      stock: 45
    },
    {
      id: 8,
      name: 'Pre-Workout',
      price: 39.99,
      description: 'Energy boost with beta-alanine and caffeine',
      image: '⚡',
      flavors: ['Blue Raspberry', 'Fruit Punch', 'Green Apple'],
      weight: '30 servings',
      stock: 50
    },
    {
      id: 9,
      name: 'Creatine Monohydrate',
      price: 24.99,
      description: 'Pure creatine for strength and power',
      image: '💊',
      weight: '300g',
      stock: 70
    },
    {
      id: 10,
      name: 'Protein Bars',
      price: 29.99,
      description: '20g protein, low sugar, great taste',
      image: '🍫',
      flavors: ['Chocolate Peanut Butter', 'Cookies & Cream', 'Salted Caramel'],
      quantity: '12 bars',
      stock: 55
    }
  ],
  equipment: [
    {
      id: 11,
      name: 'Adjustable Dumbbells',
      price: 299.99,
      description: '5-52.5 lbs per dumbbell, space-saving design',
      image: '🏋️',
      stock: 15
    },
    {
      id: 12,
      name: 'Resistance Bands Set',
      price: 24.99,
      description: '5 bands with different resistance levels',
      image: '🎗️',
      stock: 40
    },
    {
      id: 13,
      name: 'Yoga Mat Premium',
      price: 39.99,
      description: 'Non-slip, extra thick for comfort',
      image: '🧘',
      colors: ['Purple', 'Blue', 'Black', 'Pink'],
      stock: 35
    },
    {
      id: 14,
      name: 'Pull-up Bar',
      price: 49.99,
      description: 'Door-mounted, supports up to 300 lbs',
      image: '🔩',
      stock: 20
    },
    {
      id: 15,
      name: 'Kettlebell Set',
      price: 149.99,
      description: '3 kettlebells: 15, 25, 35 lbs',
      image: '🔔',
      stock: 18
    }
  ],
  tools: [
    {
      id: 16,
      name: 'Smart Scale',
      price: 79.99,
      description: 'Tracks weight, body fat, muscle mass, and more',
      image: '⚖️',
      stock: 25
    },
    {
      id: 17,
      name: 'Foam Roller',
      price: 29.99,
      description: 'Relieve muscle tension and improve recovery',
      image: '🎯',
      sizes: ['18 inch', '36 inch'],
      stock: 30
    },
    {
      id: 18,
      name: 'Jump Rope',
      price: 14.99,
      description: 'Adjustable length, ball bearing handles',
      image: '🪢',
      stock: 50
    },
    {
      id: 19,
      name: 'Gym Bag',
      price: 44.99,
      description: 'Spacious with separate shoe compartment',
      image: '🎒',
      colors: ['Black', 'Navy', 'Grey', 'Red'],
      stock: 28
    },
    {
      id: 20,
      name: 'Water Bottle',
      price: 19.99,
      description: 'Insulated, keeps drinks cold for 24 hours',
      image: '🍶',
      sizes: ['32 oz', '40 oz', '64 oz'],
      colors: ['Black', 'White', 'Blue', 'Pink'],
      stock: 45
    }
  ]
};

export const progressData = {
  2: {
    userId: 2,
    weightHistory: [
      { date: '2024-01-15', weight: 85 },
      { date: '2024-01-22', weight: 84.5 },
      { date: '2024-01-29', weight: 84 },
      { date: '2024-02-05', weight: 83.5 },
      { date: '2024-02-12', weight: 83 },
      { date: '2024-02-19', weight: 82.5 },
      { date: '2024-02-26', weight: 82 }
    ],
    bodyMeasurements: [
      { date: '2024-01-15', chest: 102, waist: 92, arms: 35, thighs: 55 },
      { date: '2024-02-01', chest: 101, waist: 90, arms: 35.5, thighs: 55.5 },
      { date: '2024-02-15', chest: 100, waist: 88, arms: 36, thighs: 56 },
      { date: '2024-02-26', chest: 99, waist: 87, arms: 36.5, thighs: 56.5 }
    ],
    workoutHistory: [
      { date: '2024-01-15', workout: 'Full Body Basics', completed: true },
      { date: '2024-01-16', workout: 'Rest Day', completed: true },
      { date: '2024-01-17', workout: 'Core Foundation', completed: true },
      { date: '2024-01-18', workout: 'Full Body Basics', completed: true },
      { date: '2024-01-19', workout: 'Rest Day', completed: true },
      { date: '2024-01-20', workout: 'Core Foundation', completed: true },
      { date: '2024-01-21', workout: 'Full Body Basics', completed: true }
    ]
  },
  3: {
    userId: 3,
    weightHistory: [
      { date: '2024-01-20', weight: 60 },
      { date: '2024-01-27', weight: 60.5 },
      { date: '2024-02-03', weight: 61 },
      { date: '2024-02-10', weight: 61.5 },
      { date: '2024-02-17', weight: 62 },
      { date: '2024-02-24', weight: 62.5 }
    ],
    bodyMeasurements: [
      { date: '2024-01-20', chest: 88, waist: 68, arms: 28, thighs: 48 },
      { date: '2024-02-01', chest: 89, waist: 68, arms: 28.5, thighs: 48.5 },
      { date: '2024-02-15', chest: 90, waist: 69, arms: 29, thighs: 49 },
      { date: '2024-02-24', chest: 91, waist: 69, arms: 29.5, thighs: 49.5 }
    ],
    workoutHistory: [
      { date: '2024-01-20', workout: 'Upper Body Strength', completed: true },
      { date: '2024-01-21', workout: 'Lower Body Power', completed: true },
      { date: '2024-01-22', workout: 'Rest Day', completed: true },
      { date: '2024-01-23', workout: 'Upper Body Strength', completed: true },
      { date: '2024-01-24', workout: 'Lower Body Power', completed: true },
      { date: '2024-01-25', workout: 'Rest Day', completed: true },
      { date: '2024-01-26', workout: 'Upper Body Strength', completed: true }
    ]
  },
  4: {
    userId: 4,
    weightHistory: [
      { date: '2024-01-10', weight: 75 },
      { date: '2024-01-17', weight: 75.2 },
      { date: '2024-01-24', weight: 75.5 },
      { date: '2024-01-31', weight: 75.8 },
      { date: '2024-02-07', weight: 76 },
      { date: '2024-02-14', weight: 76.3 },
      { date: '2024-02-21', weight: 76.5 }
    ],
    bodyMeasurements: [
      { date: '2024-01-10', chest: 100, waist: 80, arms: 33, thighs: 52 },
      { date: '2024-01-24', chest: 101, waist: 79, arms: 33.5, thighs: 52.5 },
      { date: '2024-02-07', chest: 102, waist: 79, arms: 34, thighs: 53 },
      { date: '2024-02-21', chest: 103, waist: 78, arms: 34.5, thighs: 53.5 }
    ],
    workoutHistory: [
      { date: '2024-01-10', workout: 'Push Pull Legs A', completed: true },
      { date: '2024-01-11', workout: 'Push Pull Legs B', completed: true },
      { date: '2024-01-12', workout: 'Rest Day', completed: true },
      { date: '2024-01-13', workout: 'Push Pull Legs A', completed: true },
      { date: '2024-01-14', workout: 'Push Pull Legs B', completed: true },
      { date: '2024-01-15', workout: 'Rest Day', completed: true },
      { date: '2024-01-16', workout: 'Push Pull Legs A', completed: true }
    ]
  }
};

export const bugs = [
  {
    id: 1,
    title: 'App crashes on workout completion',
    description: 'When user completes a workout, the app crashes instead of saving progress',
    severity: 'high',
    status: 'open',
    reportedBy: 2,
    reportedDate: '2024-02-20',
    assignedTo: 5
  },
  {
    id: 2,
    title: 'Meal plan not updating',
    description: 'Users report that changing their goal does not update the meal plan',
    severity: 'medium',
    status: 'in-progress',
    reportedBy: 3,
    reportedDate: '2024-02-18',
    assignedTo: 5
  },
  {
    id: 3,
    title: 'Progress chart not displaying',
    description: 'Weight progress chart shows blank screen on iOS',
    severity: 'medium',
    status: 'open',
    reportedBy: 4,
    reportedDate: '2024-02-15',
    assignedTo: 5
  },
  {
    id: 4,
    title: 'Shop checkout fails',
    description: 'Users unable to complete purchase due to payment gateway error',
    severity: 'high',
    status: 'resolved',
    reportedBy: 2,
    reportedDate: '2024-02-10',
    assignedTo: 5,
    resolvedDate: '2024-02-12'
  }
];

export const orders = [
  {
    id: 1,
    userId: 2,
    items: [
      { productId: 1, name: 'Performance T-Shirt', quantity: 2, price: 29.99 },
      { productId: 6, name: 'Whey Protein Isolate', quantity: 1, price: 54.99 }
    ],
    total: 114.97,
    status: 'delivered',
    orderDate: '2024-02-01',
    deliveryDate: '2024-02-05'
  },
  {
    id: 2,
    userId: 3,
    items: [
      { productId: 11, name: 'Adjustable Dumbbells', quantity: 1, price: 299.99 },
      { productId: 13, name: 'Yoga Mat Premium', quantity: 1, price: 39.99 }
    ],
    total: 339.98,
    status: 'shipped',
    orderDate: '2024-02-20',
    deliveryDate: '2024-02-25'
  }
];
