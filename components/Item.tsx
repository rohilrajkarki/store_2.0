import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const Item = () => {
  return (
    <View className="w-full p-4 border-2 border-yellow-600 rounded-md bg-[#2d2d2d]">
      <View className="flex-row flex-wrap justify-between gap-y-2">
        <View className="w-[48%]">
          <ThemedText>Name:</ThemedText>
        </View>
        <View className="w-[48%]">
          <ThemedText>From:</ThemedText>
        </View>

        <View className="w-[48%]">
          <ThemedText>Shelf Count:</ThemedText>
        </View>
        <View className="w-[48%]">
          <ThemedText>Stock Count:</ThemedText>
        </View>

        <View className="w-[48%]">
          <ThemedText>Reduced Count:</ThemedText>
        </View>
        <View className="w-[48%]">
          <ThemedText>Total Count:</ThemedText>
        </View>

        <View className="w-[48%]">
          <ThemedText>Shelf Capacity: 2/4</ThemedText>
        </View>
        <View className="w-[48%]">
          <ThemedText>To Order Count:</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default Item;
