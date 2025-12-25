import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
// This View is when the exercise Begins
export default function Action() {
  const { boxSeconds, duration, durationType } = useLocalSearchParams();
  const [time, setTime] = useState(10);
  const timeRef = useRef(null) as any;

  useEffect(() => {}, [time]);

  function startBreathingExercise() {
    // Logic to start the breathing exercise
    console.log("Breathing exercise started");

    let localTime = time;
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      localTime -= 1;
      if (localTime <= 0) {
        clearInterval(timeRef.current);
      }
    }, 1000);
  }

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

  // work in progress
  function startTimer(seconds: number) {
    setTime(seconds);
    setInterval(() => {
      seconds--;
      globalDuration = globalDuration - 1;
    }, 1000);
  }
  return (
    <View>
      <Text>Action Component</Text>
      <Text>Box Seconds: {boxSeconds}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Duration Type: {durationType}</Text>
      <View className="mt-10 mb-10 items-center justify-center">
        <Text className="text-header-primary">Time Left: {time} seconds</Text>
      </View>
      <Button title="Start" onPress={() => startBreathingExercise()} />
      <Button title="Pause" onPress={() => pauseBreathingExercise()} />
      <Button title="Stop" onPress={() => stopBreathingExercise()} />
      <Button title="Restart" onPress={() => restartBreathingExercise()} />
    </View>
  );
}
