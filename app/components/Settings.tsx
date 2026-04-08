import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSettings } from "../hooks/useSettings";

export default function Settings() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        {/* <Text className="text-2xl font-bold">Settings</Text> */}
        <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>
      <SettingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}

function SettingsModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { settings, updateSetting, isLoading } = useSettings();

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className="flex-1 bg-black/50">
        {/* Spacer to push modal to bottom */}
        <View className="flex-1" />

        {/* Bottom sheet - takes up 50% of screen */}
        <View className="h-1/2 bg-white rounded-t-3xl p-6">
          <TouchableOpacity
            onPress={onClose}
            className="mb-4 flex-row justify-end"
          >
            <Text className="text-lg font-bold">Close</Text>
          </TouchableOpacity>

          {/* Scrollable content area */}
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text className="text-2xl font-bold mb-4">Settings</Text>

            {isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <>
                <View className="flex mb-4 flex-row items-center justify-between">
                  <Text className="text-base mb-2">Audio Per Second</Text>
                  <Switch
                    value={settings.audioPerSecondEnabled}
                    onValueChange={(value) =>
                      updateSetting("audioPerSecondEnabled", value)
                    }
                  />
                </View>
                <View className="flex mb-4 flex-row items-center justify-between">
                  <Text className="text-base mb-2">
                    Audio Per Action Change
                  </Text>
                  <Switch
                    value={settings.audioPerActionChangeEnabled}
                    onValueChange={(value) =>
                      updateSetting("audioPerActionChangeEnabled", value)
                    }
                  />
                </View>
                <View className="flex mb-4 flex-row items-center justify-between">
                  <Text className="text-base mb-2">Voice Enabled</Text>
                  <Switch
                    value={settings.voiceEnabled}
                    onValueChange={(value) =>
                      updateSetting("voiceEnabled", value)
                    }
                  />
                </View>

                <View className="flex mb-4 flex-row items-center justify-between">
                  <Text className="text-base mb-2">Male Voice</Text>
                  <Switch
                    value={settings.maleVoice}
                    onValueChange={(value) => updateSetting("maleVoice", value)}
                  />
                </View>

                <View className="flex mb-4 flex-row items-center justify-between">
                  <Text className="text-base mb-2">Female Voice</Text>
                  <Switch
                    value={settings.femaleVoice}
                    onValueChange={(value) =>
                      updateSetting("femaleVoice", value)
                    }
                  />
                </View>

                <View className="mt-6 p-4 bg-gray-100 rounded">
                  <Text className="text-xs font-bold">Debug Info:</Text>
                  <Text className="text-xs">
                    {JSON.stringify(settings, null, 2)}
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
