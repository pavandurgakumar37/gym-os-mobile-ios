import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../database/data';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthContext] useEffect triggered, calling loadUser...');
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      console.log('[AuthContext] loadUser: Attempting to load user from AsyncStorage...');
      const storedUser = await AsyncStorage.getItem('currentUser');
      console.log('[AuthContext] loadUser: storedUser from AsyncStorage:', storedUser);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('[AuthContext] loadUser: Parsed user:', parsedUser);
        setUser(parsedUser);
        console.log('[AuthContext] loadUser: User state set successfully');
      } else {
        console.log('[AuthContext] loadUser: No stored user found in AsyncStorage');
      }
    } catch (error) {
      console.error('[AuthContext] Error loading user:', error);
    } finally {
      console.log('[AuthContext] loadUser: Setting loading to false');
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('[AuthContext] login: Attempting login for username:', username);
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );
      console.log('[AuthContext] login: Found user:', foundUser);

      if (foundUser) {
        console.log('[AuthContext] login: Setting user state and storing in AsyncStorage...');
        setUser(foundUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
        console.log('[AuthContext] login: User successfully logged in and stored');
        return { success: true, user: foundUser };
      } else {
        console.log('[AuthContext] login: Invalid credentials');
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      console.log('[AuthContext] logout: Logging out user...');
      setUser(null);
      await AsyncStorage.removeItem('currentUser');
      console.log('[AuthContext] logout: User logged out successfully');
    } catch (error) {
      console.error('[AuthContext] Logout error:', error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      setUser(updatedUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
