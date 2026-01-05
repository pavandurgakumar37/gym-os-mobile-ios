import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { products } from '../../database/data';
import { Ionicons } from '@expo/vector-icons';

const ShopScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('apparels');

  const categories = [
    { key: 'apparels', label: 'Apparels', icon: 'shirt-outline', color: '#007AFF' },
    { key: 'food', label: 'Food & Supplements', icon: 'nutrition-outline', color: '#34C759' },
    { key: 'equipment', label: 'Equipment', icon: 'barbell-outline', color: '#FF9500' },
    { key: 'tools', label: 'Tools', icon: 'construct-outline', color: '#5856D6' },
  ];

  const currentProducts = products[selectedCategory] || [];

  const ProductCard = ({ product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product, category: selectedCategory })}
    >
      <View style={styles.productImage}>
        <Text style={styles.productEmoji}>{product.image}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <Text style={styles.headerSubtitle}>
          Premium gear for your fitness journey
        </Text>
      </View>

      <View style={styles.categorySelector}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryButton,
                selectedCategory === category.key && {
                  backgroundColor: category.color,
                },
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={selectedCategory === category.key ? 'white' : category.color}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.key && styles.categoryButtonTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.productsGrid}>
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
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
  categorySelector: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    marginLeft: 6,
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    backgroundColor: '#F9F9F9',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 60,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    minHeight: 36,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    minHeight: 30,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShopScreen;
