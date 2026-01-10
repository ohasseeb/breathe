import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BackgroundView from "../components/BackgroundView";
import StyledButton from "../components/StyledButton";
// Takes in Seconds as Props , if no prop then custom is selected

export default function Duration() {
  const { boxSeconds } = useLocalSearchParams();

  const router = useRouter();

  // CONSTANTS
  const durationOptions = ["Holds", "Minutes"];
  const HOLDS = 0;
  const MINUTES = 1;
  const isCustom = boxSeconds === "Custom";

  // STATES
  const [durationType, setDurationType] = useState(durationOptions[HOLDS]);
  const [customSeconds, onChangeCustomSeconds] = useState("");
  const [customDuration, onChangeCustomDuration] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const togglePicker = () => setOpenPicker((prev) => !prev);

  useEffect(() => {}, [openPicker]);

  function navigateToAction(
    boxSeconds: number,
    duration: number,
    durationType: string
  ) {
    const actionNavigationObj = {
      pathname: "./Action",
      params: { boxSeconds, duration, durationType },
    } as any; // Satisfy the typed Link Href)

    return actionNavigationObj;
  }

  return (
    <BackgroundView className="h-full">
      {/* Text displaying the box breathing duration */}
      <View className="items-center justify-center">
        <Text className="text-5xl color-light-200 font-semibold">
          Box Breathing
        </Text>

        <Text className=" text-header-secondary color-light-300 font-medium">
          {boxSeconds ? boxSeconds : "Custom"} Second Holds
        </Text>
      </View>

      {/* Text displaying the box breathing duration in seconds */}
      <View className="flex flex-row items-center justify-center mt-20">
        <Text className="text-header-secondary font-medium">Box Seconds: </Text>
        <Text className="text-header-secondary">
          {!isCustom ? boxSeconds : " "}
        </Text>
        {isCustom && (
          <TextInput
            className="border border-gray-300 rounded p-2 text-form-value w-20"
            placeholder="Enter custom duration"
            onChangeText={onChangeCustomSeconds}
            value={customSeconds}
          />
        )}
      </View>

      {/* Text displaying the box breathing duration type */}
      <View className="flex flex-row items-center justify-center mt-10">
        <Text className="text-header-secondary"> Duration: </Text>
        <TextInput
          className="border border-gray-300 rounded p-2 text-header-secondary w-19"
          placeholder="10" //Enter custom duration
          onChangeText={onChangeCustomDuration}
          value={customDuration}
        />
        <TouchableOpacity onPress={togglePicker}>
          <Text className="text-header-secondary ml-2 border border-gray-100">
            {durationType}
          </Text>
        </TouchableOpacity>
      </View>

      {openPicker && (
        // Consider putting all of this in a Modal instead of a View
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
              <Text className="text-header-secondary border border-gray-300 rounded p-2 mt-2">
                Close
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Text displaying the Start button to start navigation */}
      <View className="items-center justify-center mt-20">
        <StyledButton
          onPress={() =>
            router.push(
              navigateToAction(
                Number(boxSeconds) ? Number(boxSeconds) : Number(customSeconds),
                customDuration ? Number(customDuration) : Number(boxSeconds),
                durationType
              )
            )
          }
          buttonColor="mellowGreen"
        >
          <Text className="text-header-secondary"> Start</Text>
        </StyledButton>
      </View>
    </BackgroundView>
  );
}
