import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useState } from "react";

interface Settings {
  audioPerSecondEnabled: boolean;
  audioPerActionChangeEnabled: boolean;
  voiceEnabled: boolean;
  maleVoice: boolean;
  femaleVoice: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  audioPerSecondEnabled: false,
  audioPerActionChangeEnabled: false,
  voiceEnabled: false,
  maleVoice: false,
  femaleVoice: false,
};

const SETTINGS_FILE = FileSystem.documentDirectory + "breathe_settings.json";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(SETTINGS_FILE);
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(SETTINGS_FILE);
        setSettings(JSON.parse(content));
        console.log("Settings loaded from file:", JSON.parse(content));
      } else {
        console.log("No settings file found, using defaults");
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => {
    try {
      const updated = { ...settings, [key]: value };
      setSettings(updated);
      await FileSystem.writeAsStringAsync(
        SETTINGS_FILE,
        JSON.stringify(updated),
      );
      console.log("Settings saved successfully:", updated);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const clearSettings = async () => {
    try {
      await FileSystem.deleteAsync(SETTINGS_FILE, { idempotent: true });
      setSettings(DEFAULT_SETTINGS);
      console.log("Settings cleared");
    } catch (error) {
      console.error("Failed to clear settings:", error);
    }
  };

  return { settings, updateSetting, clearSettings, isLoading };
}
