import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../database/data';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
        return { success: true, user: foundUser };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
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
