import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Product = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text className="text-white">Product: {id}</Text>
    </View>
  );
};

export default Product;
