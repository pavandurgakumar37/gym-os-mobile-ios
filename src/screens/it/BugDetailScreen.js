import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { users } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const BugDetailScreen = ({ route, navigation }) => {
  const { bug } = route.params;
  const [status, setStatus] = useState(bug.status);
  const [comment, setComment] = useState('');

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

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    Alert.alert(
      'Status Updated',
      `Bug status changed to ${newStatus.replace('-', ' ')}`,
      [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    Alert.alert(
      'Comment Added',
      'Your comment has been added to the bug',
      [
        { text: 'OK', onPress: () => setComment('') },
      ]
    );
  };

  const reportedByUser = getBugUser(bug.reportedBy);
  const assignedToUser = getBugUser(bug.assignedTo);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bug Details</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.bugHeader}>
        <View style={styles.bugTitleSection}>
          <Text style={styles.bugTitle}>{bug.title}</Text>
          <View style={styles.bugBadges}>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(bug.severity) + '20' }]}>
              <Text style={[styles.severityText, { color: getSeverityColor(bug.severity) }]}>
                {bug.severity.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
                {status.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bugInfo}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{bug.description}</Text>
      </View>

      <View style={styles.bugDetails}>
        <Text style={styles.sectionTitle}>Bug Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bug ID:</Text>
          <Text style={styles.detailValue}>#{bug.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Reported Date:</Text>
          <Text style={styles.detailValue}>{bug.reportedDate}</Text>
        </View>
        {bug.resolvedDate && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Resolved Date:</Text>
            <Text style={styles.detailValue}>{bug.resolvedDate}</Text>
          </View>
        )}
      </View>

      <View style={styles.peopleSection}>
        <Text style={styles.sectionTitle}>People</Text>
        <View style={styles.personCard}>
          <View style={styles.personAvatar}>
            <Text style={styles.personAvatarText}>
              {reportedByUser?.name.charAt(0) || '?'}
            </Text>
          </View>
          <View style={styles.personInfo}>
            <Text style={styles.personName}>{reportedByUser?.name || 'Unknown'}</Text>
            <Text style={styles.personRole}>Reported By</Text>
          </View>
        </View>
        {assignedToUser && (
          <View style={styles.personCard}>
            <View style={[styles.personAvatar, { backgroundColor: '#007AFF' }]}>
              <Text style={styles.personAvatarText}>{assignedToUser.name.charAt(0)}</Text>
            </View>
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{assignedToUser.name}</Text>
              <Text style={styles.personRole}>Assigned To</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.statusButtons}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'open' && styles.statusButtonActive,
              { borderColor: getStatusColor('open') }
            ]}
            onPress={() => handleStatusChange('open')}
          >
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color={status === 'open' ? 'white' : getStatusColor('open')}
            />
            <Text
              style={[
                styles.statusButtonText,
                status === 'open' && styles.statusButtonTextActive,
              ]}
            >
              Open
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'in-progress' && styles.statusButtonActive,
              { borderColor: getStatusColor('in-progress') }
            ]}
            onPress={() => handleStatusChange('in-progress')}
          >
            <Ionicons
              name="construct-outline"
              size={20}
              color={status === 'in-progress' ? 'white' : getStatusColor('in-progress')}
            />
            <Text
              style={[
                styles.statusButtonText,
                status === 'in-progress' && styles.statusButtonTextActive,
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'resolved' && styles.statusButtonActive,
              { borderColor: getStatusColor('resolved') }
            ]}
            onPress={() => handleStatusChange('resolved')}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={status === 'resolved' ? 'white' : getStatusColor('resolved')}
            />
            <Text
              style={[
                styles.statusButtonText,
                status === 'resolved' && styles.statusButtonTextActive,
              ]}
            >
              Resolved
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Add Comment</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Enter your comment..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAddComment}>
          <Ionicons name="send" size={20} color="white" />
          <Text style={styles.submitButtonText}>Submit Comment</Text>
        </TouchableOpacity>
      </View>

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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bugHeader: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bugTitleSection: {
    marginBottom: 15,
  },
  bugTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bugBadges: {
    flexDirection: 'row',
    gap: 10,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  bugInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  bugDetails: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  peopleSection: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  personAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  personAvatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  personRole: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  statusSection: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'white',
    gap: 6,
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: 'white',
  },
  commentSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  commentInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    color: '#333',
    minHeight: 100,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    height: 20,
  },
});

export default BugDetailScreen;
