import Item from "@/components/Item";
import Search from "@/components/Search";
import { getProducts } from "@/lib/db";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Ordering() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardPress = (id: string) => {
    router.push({
      pathname: "/products/[id]",
      params: { id },
    });
  };

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchQuery.trim()) {
        setFilteredProducts(products);
      } else {
        const lowercased = searchQuery.toLowerCase();
        const filtered = products.filter(
          (item) =>
            item.name.toLowerCase().includes(lowercased) ||
            item.expiryDate?.toLowerCase().includes(lowercased)
        );
        setFilteredProducts(filtered);
      }
    }, 300); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, products]);

  return (
    <View className="flex-1 bg-[#25292e] p-4 w-full">
      <View className="w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e] mb-4">
        <Search value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <View className="flex-1 w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e]">
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <Item onPress={() => handleCardPress(item.id)} {...item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
