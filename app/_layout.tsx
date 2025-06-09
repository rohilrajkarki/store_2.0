import { useColorScheme } from "@/hooks/useColorScheme.web";
import { initDB } from "@/lib/db";
import { migrateProductsTable } from "@/lib/migrateTable";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    migrateProductsTable();
    initDB();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="edit" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
