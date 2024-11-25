import React, { useContext } from "react";
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CartContext from "./CartContext";

const CartScreen = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemove = async (id) => {
    try {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            onPress: async () => {
              const success = await removeFromCart(id);
              if (success) {
                Alert.alert("Success", "Item removed successfully");
              }
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to remove item");
    }
  };

  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.name}>{item.name || "Unnamed Item"}</Text>
            <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
