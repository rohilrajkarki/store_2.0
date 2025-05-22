import Search from "@/components/Search";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-[#25292e] items-center justify-center">
      <Search />
      <Text className="text-white">Home screen</Text>
      <Link href="../orders" className="text-white text-[20px] underline mt-4">
        Go to Orders screen
      </Link>
    </View>
  );
}
