import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../../global.css";

//This page is the Menu for Box Breathing, choosing the duration of inhales/exhales/holds

export default function BoxBreathingMenu() {
  function handleDurationSelect(duration: number | "Custom") {
    const durationNavigationObj = {
      pathname: "./Duration",
      params: { duration: duration === "Custom" ? "Custom" : duration },
    } as any; // Satisfy the typed Link Href

    return durationNavigationObj;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href={handleDurationSelect(4)}>4 Second</Link>
      <Link href={handleDurationSelect(5)}>5 Second</Link>
      <Link href={handleDurationSelect(6)}>6 Second</Link>
      <Link href={handleDurationSelect("Custom")}>Custom</Link>
    </View>
  );
}
