import { insertProduct } from "@/lib/db";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    from: "",
    shelfCount: "",
    shelfCapacity: "",
    stockCount: "",
    reducedCount: "",
    totalCount: "",
    toOrderCount: "",
  });

  const handleChange = (key: keyof typeof productDetails, value: string) => {
    setProductDetails({ ...productDetails, [key]: value });
  };

  const handleSubmit = async () => {
    // Validate fields
    for (const [key, value] of Object.entries(productDetails)) {
      if (value.trim() === "") {
        Alert.alert("Validation Error", `Please enter ${key}`);
        return;
      }
    }

    try {
      await insertProduct(productDetails);
      Alert.alert("Success", "Product added successfully");

      // Optionally reset the form
      setProductDetails({
        name: "",
        from: "",
        shelfCount: "",
        shelfCapacity: "",
        stockCount: "",
        reducedCount: "",
        totalCount: "",
        toOrderCount: "",
      });
    } catch (error) {
      console.error("Insert failed:", error);
      Alert.alert("Database Error", "Failed to save the product.");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-900"
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        Add New Product
      </Text>

      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Product Name</Text>
        <TextInput
          placeholder="e.g., Chicken Breast"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.name}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Dealer</Text>
        <TextInput
          placeholder="e.g., Mt Barker"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.from}
          onChangeText={(text) => handleChange("from", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Shelf Count</Text>
        <TextInput
          placeholder="e.g., 10"
          keyboardType="numeric"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.shelfCount}
          onChangeText={(text) => handleChange("shelfCount", text)}
        />
      </View>
      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Shelf Capicity</Text>
        <TextInput
          placeholder="e.g., 10"
          keyboardType="numeric"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.shelfCapacity}
          onChangeText={(text) => handleChange("shelfCapacity", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Stock Count</Text>
        <TextInput
          placeholder="e.g., 20"
          keyboardType="numeric"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.stockCount}
          onChangeText={(text) => handleChange("stockCount", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Reduced Count</Text>
        <TextInput
          placeholder="e.g., 2"
          keyboardType="numeric"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.reducedCount}
          onChangeText={(text) => handleChange("reducedCount", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Total Count</Text>
        <TextInput
          placeholder="e.g., 30"
          keyboardType="numeric"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.totalCount}
          onChangeText={(text) => handleChange("totalCount", text)}
        />
      </View>

      <View className="mb-6">
        <Text className="text-white mb-1 font-semibold">To Order Count</Text>
        <TextInput
          placeholder="e.g., 5"
          keyboardType="numeric"
          placeholderTextColor="#999"
          className="bg-white text-black p-3 rounded-lg"
          value={productDetails.toOrderCount}
          onChangeText={(text) => handleChange("toOrderCount", text)}
        />
      </View>

      <TouchableOpacity
        className="bg-yellow-400 py-4 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-center text-black font-bold text-lg">
          Add Product
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProducts;
