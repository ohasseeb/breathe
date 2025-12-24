import { Picker } from "@react-native-picker/picker";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
// Takes in Seconds as Props , if no prop then custom is selected

export default function Duration() {
  const { duration } = useLocalSearchParams();

  // CONSTANTS
  const durationOptions = ["holds", "minutes"];
  const HOLDS = 0;
  const MINUTES = 1;
  const isCustom = duration === "Custom";

  // STATES
  const [durationType, setDurationType] = useState(durationOptions[MINUTES]);
  const [openPicker, setOpenPicker] = useState(false);
  const togglePicker = () => setOpenPicker((prev) => !prev);

  useEffect(() => {}, [openPicker]);

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
        <Text className="text-subheader-secondary">Box Seconds </Text>
        <Text> {!isCustom ? duration : ""}</Text>
        {isCustom && (
          <TextInput
            className="border border-gray-300 rounded p-2 text-form-value w-20"
            placeholder="Enter custom duration"
          />
        )}
      </View>
      <View className="flex flex-row items-center justify-center mt-10">
        <Text className="text-subheader-secondary"> Duration</Text>
        <Text> {!isCustom ? duration : ""}</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 text-form-value w-20"
          placeholder="Enter custom duration"
        />
        <TouchableOpacity onPress={togglePicker}>
          <Text className="text-link-primary ml-2"> {durationType} </Text>
        </TouchableOpacity>
      </View>
      {/* For Duration Add a picker for seconds / minutes */}

      {openPicker && (
        <View>
          <Picker
            selectedValue={durationType}
            onValueChange={(itemValue) => {
              setDurationType(itemValue);
            }}
          >
            <Picker.Item label="holds" value={durationOptions[HOLDS]} />
            <Picker.Item label="minutes" value={durationOptions[MINUTES]} />
          </Picker>
          <TouchableOpacity onPress={togglePicker}>
            <View className="items-center justify-center">
              <Text className="text-subheader-secondary border border-gray-300 rounded p-2 mt-2">
                Close
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View className="items-center justify-center mt-20">
        <Link className="text-subheader-primary" href="./Action">
          Start
        </Link>
      </View>
    </View>
  );
}
