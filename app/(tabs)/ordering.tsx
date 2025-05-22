import Item from "@/components/Item";
import Search from "@/components/Search";
import { Text, View } from "react-native";

export default function Ordering() {
  return (
    <View className="flex-1 bg-[#25292e] justify-center items-center p-4">
      <View className="w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e] items-center mb-4">
        <Search />
        <Text className="bg">sdf</Text>
      </View>
      <View className="w-full border-2 border-[#ffd33d] p-4 rounded-xl bg-[#1c1c1e] items-center">
        <Item />
      </View>
    </View>
  );
}
