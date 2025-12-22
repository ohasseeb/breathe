import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../../global.css";

export default function BoxBreathingMenu() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href="./Duration"> 4 Second</Link>
      <Link href="./Duration"> 5 Second</Link>
      <Link href="./Duration"> 6 Second</Link>
      <Link href="./Duration"> Custom</Link>
    </View>
  );
}
