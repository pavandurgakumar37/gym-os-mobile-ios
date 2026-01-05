# Gym OS - Mobile iOS App

A comprehensive React Native gym management application built with Expo for iOS. This app provides workout programs, meal planning, progress tracking, and e-commerce functionality for fitness enthusiasts.

## Features

### User Features
- **Workout Programs**: 5 difficulty levels (Beginner, Moderate, Pro-Level, Elite, God-Level)
- **Meal Planning**: Personalized meal plans based on fitness goals (Fat Loss, Muscle Building, Body Recomposition)
- **Progress Tracking**: Track weight, body measurements, workout history, and streaks
- **E-Commerce Shop**: Purchase apparels, food/supplements, gym equipment, and tools

### Admin Features
- **Dashboard**: Overview of all users, orders, and system statistics
- **User Management**: View and manage all registered users
- **Order Management**: Track and manage all orders

### IT User Features
- **Bug Tracking**: Report, track, and resolve bugs
- **User Support**: Access user information for troubleshooting
- **Dashboard**: Overview of system issues and statistics

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistent data
- **Icons**: Expo Vector Icons (Ionicons)

## Project Structure

```
gym-os-mobile-ios/
├── App.js                          # Main application entry point
├── app.json                        # Expo configuration
├── package.json                     # Dependencies
├── babel.config.js                  # Babel configuration
├── src/
│   ├── context/
│   │   └── AuthContext.js          # Authentication context
│   ├── database/
│   │   └── data.js                # Static database with default data
│   ├── navigation/
│   │   └── AppNavigator.js         # Navigation setup
│   └── screens/
│       ├── LoginScreen.js           # Login screen
│       ├── admin/
│       │   ├── AdminDashboard.js    # Admin dashboard
│       │   ├── UserManagementScreen.js  # User management
│       │   └── OrderManagementScreen.js # Order management
│       ├── user/
│       │   ├── UserDashboard.js    # User dashboard
│       │   ├── WorkoutLevelsScreen.js   # Workout levels
│       │   ├── WorkoutDetailScreen.js   # Workout details
│       │   ├── MealPrepScreen.js      # Meal planning
│       │   ├── ShopScreen.js          # E-commerce shop
│       │   ├── ProductDetailScreen.js  # Product details
│       │   └── ProgressScreen.js      # Progress tracking
│       └── it/
│           ├── ITDashboard.js       # IT dashboard
│           ├── BugTrackerScreen.js     # Bug tracking
│           └── BugDetailScreen.js     # Bug details
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd gym-os-mobile-ios
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on iOS Simulator**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   Alternatively, you can use the Expo Go app on your physical iOS device by scanning the QR code displayed in the terminal.

## Demo Accounts

The app comes with pre-configured demo accounts for testing:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full system access including user management and order management

### User Accounts
1. **John Doe** (Fat Loss Goal)
   - **Username**: `john`
   - **Password**: `user123`
   - **Goal**: Fat Loss
   - **Level**: Beginner
   - **Streak**: 7 days

2. **Jane Smith** (Muscle Building Goal)
   - **Username**: `jane`
   - **Password**: `user123`
   - **Goal**: Bulk
   - **Level**: Moderate
   - **Streak**: 14 days

3. **Mike Johnson** (Body Recomposition Goal)
   - **Username**: `mike`
   - **Password**: `user123`
   - **Goal**: Recomposition
   - **Level**: Pro-Level
   - **Streak**: 21 days

### IT User Account
- **Username**: `ituser`
- **Password**: `it123`
- **Access**: Bug tracking and user support

## Features Overview

### Workout Programs
- **5 Difficulty Levels**: Beginner, Moderate, Pro-Level, Elite, God-Level
- **Multiple Workouts per Level**: Each level includes multiple workout routines
- **Exercise Details**: Sets, reps, and rest times for each exercise
- **Calorie Tracking**: Estimated calories burned per workout

### Meal Planning
- **Goal-Based Plans**: Fat Loss (1800 kcal), Muscle Building (3000 kcal), Body Recomposition (2400 kcal)
- **4 Meal Types**: Breakfast, Lunch, Snacks, Dinner
- **Nutritional Information**: Protein, carbs, and fats for each meal
- **Ingredient Lists**: Complete ingredient lists for each meal

### Progress Tracking
- **Weight History**: Track weight changes over time
- **Body Measurements**: Chest, waist, arms, and thighs
- **Workout History**: Track completed and skipped workouts
- **Streak Tracking**: Monitor consistency with streak counter
- **Visual Progress**: Charts and graphs for data visualization

### E-Commerce Shop
- **4 Product Categories**:
  - Apparels: T-shirts, shorts, hoodies, sports bras, pants
  - Food & Supplements: Protein, BCAA, pre-workout, creatine, protein bars
  - Equipment: Dumbbells, resistance bands, yoga mats, pull-up bars, kettlebells
  - Tools: Smart scales, foam rollers, jump ropes, gym bags, water bottles
- **Product Details**: Size, color, flavor options
- **Add to Cart**: Shopping cart functionality

### Bug Tracking (IT Users)
- **Bug Reports**: Report and track system issues
- **Severity Levels**: High, Medium, Low
- **Status Tracking**: Open, In Progress, Resolved
- **Comments**: Add comments to bug reports
- **Assignment**: Assign bugs to IT users

## Data Structure

The app uses a static database with the following main data structures:

- **Users**: User accounts with roles (admin, user, ituser)
- **Workout Levels**: 5 difficulty levels with multiple workouts
- **Meal Plans**: 3 goal-based meal plans with 4 meal types each
- **Products**: 4 categories with 5 products each
- **Progress Data**: Weight history, body measurements, workout history
- **Bugs**: Bug reports with status and severity
- **Orders**: Order history with items and status

## Role-Based Access

### Admin
- Full access to all features
- User management (view, edit users)
- Order management (view, update orders)
- Dashboard with system statistics

### User
- Access to personal dashboard
- Workout programs and details
- Meal planning based on goals
- Progress tracking
- Shop and purchase products

### IT User
- Bug tracking and management
- User support access
- Dashboard with bug statistics
- Comment on and resolve bugs

## Styling

The app uses a modern, clean design with:
- Consistent color scheme (blue, green, orange, purple)
- Card-based layouts
- Shadow effects for depth
- Responsive design
- Icon-based navigation
- Smooth transitions

## Future Enhancements

Potential features for future development:
- Backend API integration
- Real-time data synchronization
- Push notifications
- Payment gateway integration
- Social features (share progress, compete with friends)
- Video tutorials for exercises
- AI-powered workout recommendations
- Integration with fitness trackers
- Multi-language support

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   # Clear cache and restart
   npm start -- --clear
   ```

2. **iOS Simulator not starting**
   ```bash
   # Reset iOS Simulator
   xcrun simctl erase all
   ```

3. **Dependency issues**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

4. **Expo Go app issues**
   - Ensure you're using the latest version of Expo Go
   - Check your network connection
   - Try clearing Expo Go cache

## Contributing

This is a demo/prototype project. For production use, consider:
- Implementing a proper backend
- Adding authentication with JWT or OAuth
- Implementing real-time database (Firebase, MongoDB, etc.)
- Adding comprehensive error handling
- Writing unit and integration tests
- Implementing analytics tracking

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions about this project, please refer to the code documentation or contact the development team.

---

**Note**: This is a React Native Expo project designed for iOS. For Android support, additional configuration may be required.
