import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

const Item = ({
  name,
  fromDealer,
  shelfCount,
  shelfCapacity,
  stockCount,
  reducedCount,
  totalCount,
  toOrderCount,
  onPress,
}: ItemType) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-full p-4 border-2 border-yellow-600 rounded-md bg-[#2d2d2d]">
        <View className="flex-row flex-wrap justify-between gap-y-2">
          <View className="w-[48%]">
            <ThemedText>Name: {name}</ThemedText>
          </View>
          <View className="w-[48%]">
            <ThemedText>From: {fromDealer}</ThemedText>
          </View>

          <View className="w-[48%]">
            <ThemedText className="text-green-200">
              Shelf Count: {shelfCount}
            </ThemedText>
          </View>
          <View className="w-[48%]">
            <ThemedText className="text-blue-400">
              Stock Count: {stockCount}
            </ThemedText>
          </View>

          <View className="w-[48%]">
            <ThemedText className="text-red-400">
              Reduced Count: {reducedCount}
            </ThemedText>
          </View>
          <View className="w-[48%]">
            <ThemedText>Total Count: {totalCount}</ThemedText>
          </View>

          <View className="w-[48%]">
            <ThemedText className="text-yellow-300">
              Shelf Capacity: :{shelfCapacity}
            </ThemedText>
          </View>
          <View className="w-[48%]">
            <ThemedText className="text-purple-400">
              To Order Count: {toOrderCount}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
