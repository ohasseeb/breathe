import { Link } from "expo-router";
import { Text, View } from "react-native";

// Takes in Seconds as Props , if no prop then custom is selected

type DurationProps = {
  seconds?: number;
};

export default function Duration({ seconds }: DurationProps) {
  return (
    <View>
      <View className="items-center justify-center">
        <Text className="text-5xl "> Box Breathing</Text>

        <Text className=" text-5xl">
          {seconds ? seconds : "Custom"} Duration{" "}
        </Text>
      </View>

      <Text> Box Seconds {seconds ? seconds : ""} </Text>
      <Text> Durations {seconds ? seconds : ""} </Text>
      {/*  For Duration Add a picker for seconds / minutes */}

      <View className="items-center justify-center">
        <Link href="./Action"> Start</Link>
      </View>
    </View>
  );
}
