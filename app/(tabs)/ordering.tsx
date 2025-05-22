import Item from "@/components/Item";
import Search from "@/components/Search";
import { FlatList, View } from "react-native";

const sampleData = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },
  { id: "6", name: "Item 6" },
  { id: "7", name: "Item 7" },
  { id: "8", name: "Item 8" },
  { id: "9", name: "Item 9" },
  { id: "10", name: "Item 10" },
  { id: "11", name: "Item 11" },
  { id: "12", name: "Item 12" },
  { id: "13", name: "Item 13" },
  { id: "14", name: "Item 14" },
  { id: "15", name: "Item 15" },
];

export default function Ordering() {
  return (
    <View className="flex-1 bg-[#25292e] p-4 w-full">
      <View className="w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e] mb-4">
        <Search />
      </View>
      <View className="flex-1 w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e]">
        <FlatList
          data={sampleData}
          renderItem={({ item }) => <Item />}
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
