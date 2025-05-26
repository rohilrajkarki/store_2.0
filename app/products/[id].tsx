import { deleteProduct, getProductById } from "@/lib/db";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Product = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchProduct = async () => {
        const data = await getProductById(parseInt(id as string, 10));
        setProduct(data);
      };
      fetchProduct();
    }, [id])
  );

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(parseInt(id as string, 10));
            Alert.alert("Deleted", "Product has been deleted.");
            router.back();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({ pathname: "/edit", params: { id: id as string } });
  };

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Loading product...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-neutral-900 p-4">
      <Text className="text-white text-3xl font-extrabold mb-6 text-center">
        Product Details
      </Text>

      <View className="bg-neutral-800 rounded-2xl p-4 shadow-lg">
        {[
          { label: "Name", value: product.name },
          { label: "Dealer", value: product.fromDealer },
          { label: "Shelf Count", value: product.shelfCount },
          { label: "Shelf Capacity", value: product.shelfCapacity },
          { label: "Stock Count", value: product.stockCount },
          { label: "Reduced Count", value: product.reducedCount },
          { label: "Total Count", value: product.totalCount },
          { label: "To Order Count", value: product.toOrderCount },
        ].map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mb-3 border-b border-gray-700 pb-3 last:border-b-0"
          >
            <Text className="text-gray-400 text-sm w-1/2">{item.label}</Text>
            <Text className="text-white text-base font-medium text-right w-1/2">
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between mt-8 space-x-4">
        <TouchableOpacity
          onPress={handleEdit}
          className="flex-1 bg-blue-600 py-3 rounded-xl items-center shadow-md"
        >
          <Text className="text-white font-semibold text-base">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          className="flex-1 bg-red-600 py-3 rounded-xl items-center shadow-md"
        >
          <Text className="text-white font-semibold text-base">Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Product;
