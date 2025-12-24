import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
// This View is when the exercise Begins
export default function Action() {
  const { boxSeconds, duration, durationType } = useLocalSearchParams();

  return (
    <View>
      <Text>Action Component</Text>
      <Text>Box Seconds: {boxSeconds}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Duration Type: {durationType}</Text>
    </View>
  );
}
