import { TextInput } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function Search({ value, onChangeText }: Props) {
  return (
    <TextInput
      placeholder="Search by name or expiry date..."
      placeholderTextColor="#aaa"
      className="bg-white text-black p-3 rounded-lg"
      value={value}
      onChangeText={onChangeText}
    />
  );
}
