import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Duration() {
  return (
    <View>
      <Text>Duration Component</Text>
      <Link href="./Action"> Go to Action</Link>
    </View>
  );
}
