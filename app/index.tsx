import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold text-blue-500">
        Welcome to Breathe!
      </Text>
      <Link href="../BoxBreathing/Menu"> Box Breathing</Link>
      {/* <Link href="./boxBreathingMenu">4 - 7 - 8 Breathing</Link> */}
    </View>
  );
}
