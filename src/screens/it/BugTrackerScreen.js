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
import { bugs, users } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const BugTrackerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  const statusFilters = [
    { key: 'all', label: 'All' },
    { key: 'open', label: 'Open' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
  ];

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || bug.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  const handleBugPress = (bug) => {
    navigation.navigate('BugDetail', { bug });
  };

  const renderBug = ({ item }) => (
    <TouchableOpacity
      style={styles.bugCard}
      onPress={() => handleBugPress(item)}
    >
      <View style={styles.bugHeader}>
        <View style={styles.bugInfo}>
          <Text style={styles.bugTitle}>{item.title}</Text>
          <Text style={styles.bugReporter}>
            {getBugUser(item.reportedBy)?.name || 'Unknown'}
          </Text>
        </View>
        <View style={styles.bugBadges}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) + '20' }]}>
            <Text style={[styles.severityText, { color: getSeverityColor(item.severity) }]}>
              {item.severity.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.bugDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.bugFooter}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.replace('-', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={styles.bugDate}>
          <Ionicons name="calendar-outline" size={14} color="#999" />
          <Text style={styles.bugDateText}>{item.reportedDate}</Text>
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
          placeholder="Search bugs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                filterStatus === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setFilterStatus(filter.key)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterStatus === filter.key && styles.filterButtonTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBugs}
        renderItem={renderBug}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bug-outline" size={60} color="#999" />
            <Text style={styles.emptyTitle}>No Bugs Found</Text>
            <Text style={styles.emptyText}>
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No bugs have been reported yet'}
            </Text>
          </View>
        }
      />
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
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  listContent: {
    padding: 20,
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
  bugDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  bugFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  bugDateText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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

export default BugTrackerScreen;
