import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { users } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const UserManagementScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return '#FF3B30';
      case 'ituser':
        return '#FF9500';
      default:
        return '#007AFF';
    }
  };

  const getRoleBadgeText = (role) => {
    switch (role) {
      case 'admin':
        return 'ADMIN';
      case 'ituser':
        return 'IT USER';
      default:
        return 'USER';
    }
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => handleUserPress(item)}
    >
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: getRoleBadgeColor(item.role) }]}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>
        <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor(item.role) + '20' }]}>
          <Text style={[styles.roleBadgeText, { color: getRoleBadgeColor(item.role) }]}>
            {getRoleBadgeText(item.role)}
          </Text>
        </View>
      </View>
      <View style={styles.userStats}>
        <View style={styles.stat}>
          <Ionicons name="fitness-outline" size={16} color="#666" />
          <Text style={styles.statText}>{item.currentLevel || 'N/A'}</Text>
        </View>
        {item.streak && (
          <View style={styles.stat}>
            <Ionicons name="flame-outline" size={16} color="#FF9500" />
            <Text style={styles.statText}>{item.streak} day streak</Text>
          </View>
        )}
        <View style={styles.stat}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.statText}>{item.createdAt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>User Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedUser && (
              <View style={styles.modalBody}>
                <View style={[styles.modalAvatar, { backgroundColor: getRoleBadgeColor(selectedUser.role) }]}>
                  <Text style={styles.modalAvatarText}>{selectedUser.name.charAt(0)}</Text>
                </View>
                <Text style={styles.modalUserName}>{selectedUser.name}</Text>
                <Text style={styles.modalUserEmail}>{selectedUser.email}</Text>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Account Information</Text>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Username:</Text>
                    <Text style={styles.modalValue}>{selectedUser.username}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Role:</Text>
                    <Text style={[styles.modalValue, { color: getRoleBadgeColor(selectedUser.role) }]}>
                      {getRoleBadgeText(selectedUser.role)}
                    </Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Joined:</Text>
                    <Text style={styles.modalValue}>{selectedUser.createdAt}</Text>
                  </View>
                </View>

                {selectedUser.role === 'user' && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Fitness Information</Text>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Goal:</Text>
                      <Text style={styles.modalValue}>{selectedUser.goal || 'Not set'}</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Current Level:</Text>
                      <Text style={styles.modalValue}>{selectedUser.currentLevel || 'Not set'}</Text>
                    </View>
                    {selectedUser.streak && (
                      <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Streak:</Text>
                        <Text style={styles.modalValue}>{selectedUser.streak} days</Text>
                      </View>
                    )}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    Alert.alert('Edit User', 'Edit functionality would be implemented here');
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="#007AFF" />
                  <Text style={styles.editButtonText}>Edit User</Text>
                </TouchableOpacity>
              </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  userStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 5,
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: '80%',
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
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalAvatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  modalUserName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalUserEmail: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSection: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 14,
    color: '#666',
  },
  modalValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default UserManagementScreen;
