import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
// This View is when the exercise Begins
export default function Action() {
  const { boxSeconds, duration, durationType } = useLocalSearchParams();
  const [time, setTime] = useState(boxSeconds as unknown as number);
  const [globalDuration, setGlobalDuration] = useState(100);
  const timeRef = useRef(null) as any;

  useEffect(() => {}, [time, globalDuration]);

  // work in progress
  const startTimer = (seconds: number) => {
    return new Promise<void>((resolve) => {
      console.log("Starting timer for", seconds, "seconds");
      setTime(seconds);
      let localTime = seconds;

      // clear existing interval if any
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }

      timeRef.current = setInterval(() => {
        setTime((prev) => Math.max(prev - 1, 0));
        localTime -= 1;
        setGlobalDuration((prev) => Math.max(prev - 1, 0));

        if (localTime <= 0) {
          if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
          }
          resolve(); // only resolve when the timer finishes
        }
      }, 1000);
    });
  };

  function pauseBreathingExercise() {
    // Logic to Pause the breathing exercise
    console.log("Breathing exercise paused");
    clearInterval(timeRef.current);
  }

  function stopBreathingExercise() {
    // Logic to stop the breathing exercise
    console.log("Breathing exercise stopped");
    clearInterval(timeRef.current);
    setTime(0);
  }

  function restartBreathingExercise() {
    // Logic to restart the breathing exercise
    console.log("Breathing exercise restarted");
    setTime(duration as unknown as number);
    // startBreathingExercise();
  }

  const startBreathingExercise = async () => {
    let boxSecondsNum = Number(boxSeconds);

    for (let i = 0; i < 2; i++) {
      await startTimer(boxSecondsNum)
        .then(async () => await startTimer(boxSecondsNum))
        .then(async () => await startTimer(boxSecondsNum))
        .then(async () => await startTimer(boxSecondsNum));
    }
  };

  return (
    <View>
      <Text>Action Component</Text>
      <Text>Box Seconds: {boxSeconds}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Duration Type: {durationType}</Text>
      <View className="mt-10 mb-10 items-center justify-center">
        <Text className="text-header-primary">Time Left: {time} seconds</Text>
        <Text className="text-header-secondary">
          {" "}
          Global Duration {globalDuration} seconds
        </Text>
      </View>
      <Button title="Start" onPress={() => startBreathingExercise()} />
      <Button title="Pause" onPress={() => pauseBreathingExercise()} />
      <Button title="Stop" onPress={() => stopBreathingExercise()} />
      <Button title="Restart" onPress={() => restartBreathingExercise()} />
    </View>
  );
}
