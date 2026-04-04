import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  const [audioPerSecondEnabled, setAudioPerSecondEnabled] = useState(false);
  const [audioPerActionChangeEnabled, setAudioPerActionChangeEnabled] =
    useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [maleVoice, setMaleVoice] = useState(false);
  const [femaleVoice, setFemaleVoice] = useState(false);

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
            {/* Add your settings options here */}
            <View className="flex mb-4 flex-row items-center justify-between">
              <Text className="text-base mb-2">Audio Per Second</Text>
              <Switch
                value={audioPerSecondEnabled}
                onValueChange={setAudioPerSecondEnabled}
              />
            </View>
            <View className="flex mb-4 flex-row items-center justify-between">
              <Text className="text-base mb-2">Audio Per Action Change</Text>
              <Switch
                value={audioPerActionChangeEnabled}
                onValueChange={setAudioPerActionChangeEnabled}
              />
            </View>
            <View className="flex mb-4 flex-row items-center justify-between">
              <Text className="text-base mb-2">Voice Enabled </Text>
              <Switch value={voiceEnabled} onValueChange={setVoiceEnabled} />
            </View>

            <View className="flex mb-4 flex-row items-center justify-between">
              <Text className="text-base mb-2">Male Voice </Text>
              <Switch value={maleVoice} onValueChange={setMaleVoice} />
              <Text className="text-base mb-2">Female Voice </Text>
              <Switch value={femaleVoice} onValueChange={setFemaleVoice} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
