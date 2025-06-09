import { getProductById, updateProduct } from "@/lib/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ProductDetails = {
  name: string;
  fromDealer: string;
  shelfCount: string;
  shelfCapacity: string;
  stockCount: string;
  reducedCount: string;
  totalCount: string;
  toOrderCount: string;
  expiryDate: string;
};

const EditProduct = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      handleChange("expiryDate", isoDate);
    }
  };

  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    fromDealer: "",
    shelfCount: "",
    shelfCapacity: "",
    stockCount: "",
    reducedCount: "",
    totalCount: "",
    toOrderCount: "",
    expiryDate: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const productId = parseInt(id as string, 10);
          const data = await getProductById(productId);
          setProduct(data);
          setProductDetails({
            name: data.name || "",
            fromDealer: data.fromDealer || "",
            shelfCapacity: data.shelfCapacity?.toString() || "0",
            shelfCount: data.shelfCount?.toString() || "0",
            stockCount: data.stockCount?.toString() || "0",
            reducedCount: data.reducedCount?.toString() || "0",
            totalCount: data.totalCount?.toString() || "0",
            toOrderCount: data.toOrderCount?.toString() || "0",
            expiryDate: data.expiryDate || "",
          });
        } catch (error) {
          Alert.alert("Error", "Failed to load product");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (field: keyof ProductDetails, value: string) => {
    setProductDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    for (const [key, value] of Object.entries(productDetails)) {
      if (value.trim() === "") {
        Alert.alert("Validation Error", `Please fill in ${key}`);
        return;
      }
    }

    try {
      setSaving(true);
      await updateProduct(parseInt(id as string, 10), {
        ...productDetails,
        shelfCount: parseInt(productDetails.shelfCount),
        shelfCapacity: parseInt(productDetails.shelfCapacity),
        stockCount: parseInt(productDetails.stockCount),
        reducedCount: parseInt(productDetails.reducedCount),
        totalCount: parseInt(productDetails.totalCount),
        toOrderCount: parseInt(productDetails.toOrderCount),
        expiryDate: productDetails.expiryDate,
      });

      Alert.alert("Success", "Product updated successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update the product");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-6">Edit Product</Text>

      {[
        { label: "Product Name", field: "name" },
        { label: "Dealer", field: "fromDealer" },
        { label: "Expiry Date", field: "expiryDate" },
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
          label: "To Order Count",
          field: "toOrderCount",
          keyboardType: "numeric",
        },
      ].map((item, index) => (
        <View key={index} className="mb-4">
          <Text className="text-gray-400 text-sm mb-1">{item.label}</Text>
          <TextInput
            className="bg-white text-black p-3 rounded-lg"
            value={productDetails[item.field as keyof ProductDetails]}
            keyboardType={item.keyboardType || "default"}
            onChangeText={(text) =>
              handleChange(item.field as keyof ProductDetails, text)
            }
            editable={!saving}
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
        className={`py-3 rounded-lg mt-6 items-center ${
          saving ? "bg-gray-500" : "bg-blue-600"
        }`}
        onPress={handleSave}
        disabled={saving}
      >
        <Text className="text-white font-semibold text-lg">
          {saving ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProduct;
