import Item from "@/components/Item";
import Search from "@/components/Search";
import { getProducts } from "@/lib/db";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Ordering() {
  const handleCardPress = (id: string) => {
    router.push({
      pathname: "/products/[id]",
      params: { id },
    });
  };

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  console.log("products=>", products);

  return (
    <View className="flex-1 bg-[#25292e] p-4 w-full">
      <View className="w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e] mb-4">
        <Search />
      </View>
      <View className="flex-1 w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e]">
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Item onPress={() => handleCardPress(item.id)} {...item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            //  alignItems: "center",
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
