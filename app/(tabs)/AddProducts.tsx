import { insertProduct } from "@/lib/db";
import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    from: "",
    shelfCount: "",
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
    <View>
      <TextInput
        placeholder="Product Name"
        className="bg-white text-black p-2 mb-4 rounded"
        onChangeText={(text) => handleChange("name", text)}
        value={productDetails.name}
      />
      <TextInput
        placeholder="Dealer"
        className="bg-white text-black p-2 mb-4 rounded"
        onChangeText={(text) => handleChange("from", text)}
        value={productDetails.from}
      />
      <TextInput
        placeholder="Shelf Count"
        className="bg-white text-black p-2 mb-4 rounded"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("shelfCount", text)}
        value={productDetails.shelfCount}
      />
      <TextInput
        placeholder="Stock Count"
        className="bg-white text-black p-2 mb-4 rounded"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("stockCount", text)}
        value={productDetails.stockCount}
      />
      <TextInput
        placeholder="Reduced Count"
        className="bg-white text-black p-2 mb-4 rounded"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("reducedCount", text)}
        value={productDetails.reducedCount}
      />
      <TextInput
        placeholder="Total Count"
        className="bg-white text-black p-2 mb-4 rounded"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("totalCount", text)}
        value={productDetails.totalCount}
      />
      <TextInput
        placeholder="To Order Count"
        className="bg-white text-black p-2 mb-4 rounded"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("toOrderCount", text)}
        value={productDetails.toOrderCount}
      />
      <Button title="Add Product" onPress={handleSubmit} />
    </View>
  );
};

export default AddProducts;
