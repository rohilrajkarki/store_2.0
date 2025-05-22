import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "./ThemedView";

const Search = () => {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.primary },
        ]}
        placeholder="Search products..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  container: {
    // backgroundColor: "#25292e",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#1c1c1e",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
  },
});

export default Search;
