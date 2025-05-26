import { getProductById, updateProduct } from "@/lib/db";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditProduct = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    fromDealer: "",
    shelfCount: "",
    stockCount: "",
    reducedCount: "",
    totalCount: "",
    toOrderCount: "",
  });

  useEffect(() => {
    if (id) {
      const productId = parseInt(id as string, 10);
      getProductById(productId).then((data) => {
        setProduct(data);
        setForm({
          name: data.name,
          fromDealer: data.fromDealer,
          shelfCount: data.shelfCount.toString(),
          stockCount: data.stockCount.toString(),
          reducedCount: data.reducedCount.toString(),
          totalCount: data.totalCount.toString(),
          toOrderCount: data.toOrderCount.toString(),
        });
      });
    }
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    for (const [key, value] of Object.entries(form)) {
      if (value.trim() === "") {
        Alert.alert("Validation Error", `Please fill in ${key}`);
        return;
      }
    }

    try {
      await updateProduct(parseInt(id as string, 10), {
        ...form,
        shelfCount: parseInt(form.shelfCount),
        stockCount: parseInt(form.stockCount),
        reducedCount: parseInt(form.reducedCount),
        totalCount: parseInt(form.totalCount),
        toOrderCount: parseInt(form.toOrderCount),
      });

      Alert.alert("Success", "Product updated successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update the product");
      console.error(error);
    }
  };

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-6">Edit Product</Text>

      {[
        { label: "Product Name", field: "name" },
        { label: "Dealer", field: "fromDealer" },
        { label: "Shelf Count", field: "shelfCount", keyboardType: "numeric" },
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
          <Text className="text-gray-400 text-sm">{item.label}</Text>
          <TextInput
            className="bg-white text-black p-3 rounded-lg"
            value={form[item.field]}
            keyboardType={item.keyboardType || "default"}
            onChangeText={(text) => handleChange(item.field, text)}
          />
        </View>
      ))}

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-lg mt-6 items-center"
        onPress={handleSave}
      >
        <Text className="text-white font-semibold text-lg">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProduct;
