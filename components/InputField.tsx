import { Text, TextInput, View } from "react-native";

const InputField = ({
  label,
  placeholder,
  value,
  keyboardType = "default",
  field,
}: {
  label: string;
  placeholder: string;
  value: string;
  keyboardType?: "default" | "numeric";
  field: keyof typeof productDetail;
}) => (
  <View className="mb-4">
    <Text className="text-white mb-1 font-semibold">{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType={keyboardType}
      value={value}
      onChangeText={(text) => handleChange(field, text)}
      className="bg-white text-black p-3 rounded-lg"
    />
  </View>
);
