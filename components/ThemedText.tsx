import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

export function ThemedText({
  lightColor,
  darkColor,
  type = "default",
  className = "",
  ...rest
}: ThemedTextProps) {
  // Optional: if you want to fallback to theme color when no className color is given
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const typeClasses = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-2xl font-bold leading-8",
    subtitle: "text-lg font-bold",
    link: "text-base leading-7 text-blue-600",
  };

  return <Text className={className ? className : "text-white"} {...rest} />;
}
