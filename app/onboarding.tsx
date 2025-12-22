import React from "react";
import { Text, View } from "react-native";
import "../global.css";

const Onboarding = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-semibold text-green-600">
        Onboarding Screen
      </Text>
      <Text className="mt-4 text-base text-gray-700">
        This is the onboarding process for new users.
      </Text>
    </View>
  );
};
export default Onboarding;
