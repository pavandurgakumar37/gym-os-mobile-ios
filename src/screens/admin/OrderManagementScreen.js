import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { orders, users } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const OrderManagementScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getOrderUser = (userId) => {
    return users.find(user => user.id === userId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#34C759';
      case 'shipped':
        return '#007AFF';
      case 'processing':
        return '#FF9500';
      case 'pending':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const renderOrder = ({ item }) => {
    const orderUser = getOrderUser(item.userId);
    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => handleOrderPress(item)}
      >
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{item.id}</Text>
            <Text style={styles.orderUser}>{orderUser ? orderUser.name : 'Unknown'}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          <Ionicons name="list-outline" size={16} color="#666" />
          <Text style={styles.itemsText}>{item.items.length} item(s)</Text>
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.orderDate}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.dateText}>{item.orderDate}</Text>
          </View>
          <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
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
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <View style={styles.modalBody}>
                <View style={styles.orderSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Order ID:</Text>
                    <Text style={styles.summaryValue}>#{selectedOrder.id}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Status:</Text>
                    <Text style={[styles.summaryValue, { color: getStatusColor(selectedOrder.status) }]}>
                      {selectedOrder.status.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Order Date:</Text>
                    <Text style={styles.summaryValue}>{selectedOrder.orderDate}</Text>
                  </View>
                  {selectedOrder.deliveryDate && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Delivery Date:</Text>
                      <Text style={styles.summaryValue}>{selectedOrder.deliveryDate}</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.sectionTitle}>Customer Information</Text>
                {(() => {
                  const orderUser = getOrderUser(selectedOrder.userId);
                  return orderUser ? (
                    <View style={styles.customerInfo}>
                      <Text style={styles.customerName}>{orderUser.name}</Text>
                      <Text style={styles.customerEmail}>{orderUser.email}</Text>
                    </View>
                  ) : (
                    <Text style={styles.noCustomer}>Customer information not available</Text>
                  );
                })()}

                <Text style={styles.sectionTitle}>Order Items</Text>
                <View style={styles.itemsList}>
                  {selectedOrder.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                      </View>
                      <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total Amount:</Text>
                  <Text style={styles.totalAmount}>${selectedOrder.total.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    // Handle order status update
                    setModalVisible(false);
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Update Status</Text>
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
  listContent: {
    padding: 20,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderUser: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  orderItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  orderDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
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
  orderSummary: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  customerInfo: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  noCustomer: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  itemsList: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default OrderManagementScreen;
