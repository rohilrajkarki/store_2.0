import Item from "@/components/Item";
import Search from "@/components/Search";
import { sampleItems } from "@/lib/data";
import { router } from "expo-router";
import { FlatList, View } from "react-native";

export default function Ordering() {
  const handleCardPress = (id: string) => {
    router.push({
      pathname: "/products/[id]",
      params: { id },
    });
  };

  return (
    <View className="flex-1 bg-[#25292e] p-4 w-full">
      <View className="w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e] mb-4">
        <Search />
      </View>
      <View className="flex-1 w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e]">
        <FlatList
          data={sampleItems}
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
