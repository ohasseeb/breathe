import { Link, useLocalSearchParams } from "expo-router";
import { Text, TextInput, View } from "react-native";

// Takes in Seconds as Props , if no prop then custom is selected

export default function Duration() {
  const { duration } = useLocalSearchParams();

  console.log("Duration Params:", duration);
  return (
    <View>
      <View className="items-center justify-center">
        <Text className="text-5xl "> Box Breathing</Text>

        <Text className=" text-5xl">
          {duration ? duration : "Custom"} Second Holds{" "}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-center mt-20">
        <Text className="text-5xl">Box Seconds </Text>
        <Text> {duration !== "custom" ? duration : ""}</Text>
        {duration === "custom" && (
          <TextInput
            className="border border-gray-300 rounded p-2"
            placeholder="Enter custom duration"
          />
        )}
      </View>

      <View className="flex flex-row items-center justify-center mt-10">
        <Text className="text-5xl"> Duration</Text>
        <Text> {duration !== "custom" ? duration : ""}</Text>
        <TextInput
          className="border border-gray-300 rounded p-2"
          placeholder="Enter custom duration"
        />
      </View>
      {/*  For Duration Add a picker for seconds / minutes */}

      <View className="items-center justify-center">
        <Link className="text-5xl" href="./Action">
          {" "}
          Start
        </Link>
      </View>
    </View>
  );
}
