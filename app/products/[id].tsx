import { deleteProduct, getProductById } from "@/lib/db";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Product = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  // useEffect(() => {
  //   if (id) {
  //     const numericId = parseInt(id as string, 10);
  //     getProductById(numericId).then((data) => {
  //       setProduct(data);
  //     });
  //   }
  // }, [id]);

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
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(parseInt(id as string, 10));
            Alert.alert("Deleted", "Product has been deleted.");
            router.back(); // Go back to previous screen
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
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-6">
        Product Details
      </Text>

      {[
        { label: "Name", value: product.name },
        { label: "Dealer", value: product.fromDealer },
        { label: "Shelf Count", value: product.shelfCount },
        { label: "Stock Count", value: product.stockCount },
        { label: "Reduced Count", value: product.reducedCount },
        { label: "Total Count", value: product.totalCount },
        { label: "To Order Count", value: product.toOrderCount },
      ].map((item, index) => (
        <View key={index} className="mb-4">
          <Text className="text-gray-400 text-sm">{item.label}</Text>
          <Text className="text-white text-lg font-semibold">{item.value}</Text>
        </View>
      ))}

      <View className="flex-row justify-between mt-8">
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-lg"
          onPress={handleEdit}
        >
          <Text className="text-white font-semibold">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-600 px-4 py-2 rounded-lg"
          onPress={handleDelete}
        >
          <Text className="text-white font-semibold">Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Product;
