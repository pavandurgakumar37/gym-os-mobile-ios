import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product, category } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${quantity}x ${product.name} has been added to your cart`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.goBack() },
      ]
    );
  };

  const renderSizes = () => {
    if (!product.sizes) return null;
    return (
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsTitle}>Size</Text>
        <View style={styles.optionsRow}>
          {product.sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.optionButton,
                selectedSize === size && styles.optionButtonActive,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedSize === size && styles.optionButtonTextActive,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderColors = () => {
    if (!product.colors) return null;
    return (
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsTitle}>Color</Text>
        <View style={styles.optionsRow}>
          {product.colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                selectedColor === color && styles.colorButtonActive,
                { borderColor: selectedColor === color ? '#007AFF' : '#E0E0E0' },
              ]}
              onPress={() => setSelectedColor(color)}
            >
              <Text style={styles.colorButtonText}>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderFlavors = () => {
    if (!product.flavors) return null;
    return (
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsTitle}>Flavor</Text>
        <View style={styles.optionsRow}>
          {product.flavors.map((flavor) => (
            <TouchableOpacity
              key={flavor}
              style={[
                styles.optionButton,
                selectedColor === flavor && styles.optionButtonActive,
              ]}
              onPress={() => setSelectedColor(flavor)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedColor === flavor && styles.optionButtonTextActive,
                ]}
              >
                {flavor}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderProductInfo = () => {
    const info = [];
    if (product.weight) info.push({ label: 'Weight', value: product.weight });
    if (product.quantity) info.push({ label: 'Quantity', value: product.quantity });
    if (product.stock !== undefined) info.push({ label: 'In Stock', value: product.stock });
    return info;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.productImage}>
        <Text style={styles.productEmoji}>{product.image}</Text>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.stockBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#34C759" />
            <Text style={styles.stockText}>In Stock</Text>
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        {renderSizes()}
        {renderColors()}
        {renderFlavors()}

        {renderProductInfo().length > 0 && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Product Information</Text>
            {renderProductInfo().map((info, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{info.label}:</Text>
                <Text style={styles.infoValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityTitle}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Ionicons name="remove" size={20} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          <Text style={styles.addToCartButtonPrice}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
  productImage: {
    backgroundColor: 'white',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productEmoji: {
    fontSize: 100,
  },
  productInfo: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  stockText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  optionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  optionButtonTextActive: {
    color: 'white',
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  colorButtonActive: {
    backgroundColor: '#007AFF',
  },
  colorButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 5,
    width: 150,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartButtonText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addToCartButtonPrice: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 20,
  },
  buyNowButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;
