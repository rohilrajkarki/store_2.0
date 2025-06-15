import { insertProduct } from "@/lib/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    fromDealer: "",
    shelfCount: "",
    shelfCapacity: "",
    stockCount: "",
    reducedCount: "",
    totalCount: "",
    deliveredCount: "",
    toOrderCount: "",
    expiryDate: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: keyof typeof productDetails, value: string) => {
    setProductDetails({ ...productDetails, [key]: value });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      handleChange("expiryDate", isoDate);
    }
  };

  const handleSubmit = async () => {
    // for (const [key, value] of Object.entries(productDetails)) {
    //   if (value.trim() === "") {
    //     Alert.alert("Validation Error", `Please enter ${key}`);
    //     return;
    //   }
    // }

    try {
      const payload = {
        ...productDetails,
        // shelfCount: parseInt(productDetails.shelfCount),
        // shelfCapacity: parseInt(productDetails.shelfCapacity),
        // stockCount: parseInt(productDetails.stockCount),
        // reducedCount: parseInt(productDetails.reducedCount),
        // totalCount: parseInt(productDetails.totalCount),
        // toOrderCount: parseInt(productDetails.toOrderCount),
      };

      await insertProduct(payload);

      Alert.alert("Success", "Product added successfully");

      setProductDetails({
        name: "",
        fromDealer: "",
        shelfCount: "",
        shelfCapacity: "",
        stockCount: "",
        reducedCount: "",
        totalCount: "",
        deliveredCount: "",
        toOrderCount: "",
        expiryDate: "",
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
      {[
        {
          label: "Product Name",
          field: "name",
          placeholder: "e.g., Chicken Breast",
        },
        {
          label: "Dealer",
          field: "fromDealer",
          placeholder: "e.g., Mt Barker",
        },
        { label: "Shelf Count", field: "shelfCount", keyboardType: "numeric" },
        {
          label: "Shelf Capacity",
          field: "shelfCapacity",
          keyboardType: "numeric",
        },
        { label: "Stock Count", field: "stockCount", keyboardType: "numeric" },
        {
          label: "Reduced Count",
          field: "reducedCount",
          keyboardType: "numeric",
        },
        { label: "Total Count", field: "totalCount", keyboardType: "numeric" },
        {
          label: "Delivered Count",
          field: "deliveredCount",
          keyboardType: "numeric",
        },
        {
          label: "To Order Count",
          field: "toOrderCount",
          keyboardType: "numeric",
        },
      ].map((item, index) => (
        <View key={index} className="mb-4">
          <Text className="text-white mb-1 font-semibold">{item.label}</Text>
          <TextInput
            placeholder={item.placeholder || ""}
            placeholderTextColor="#999"
            className="bg-white text-black p-3 rounded-lg"
            // keyboardType={item.keyboardType || "default"}
            value={productDetails[item.field]}
            onChangeText={(text) =>
              handleChange(item.field as keyof typeof productDetails, text)
            }
          />
        </View>
      ))}

      {/* Expiry Date Picker */}
      <View className="mb-4">
        <Text className="text-white mb-1 font-semibold">Expiry Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-white p-3 rounded-lg"
        >
          <Text className="text-black">
            {productDetails.expiryDate || "Select expiry date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={
              productDetails.expiryDate
                ? new Date(productDetails.expiryDate)
                : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
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
