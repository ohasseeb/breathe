import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
// This View is when the exercise Begins
export default function Action() {
  const {
    boxSeconds,
    duration = boxSeconds,
    durationType,
  } = useLocalSearchParams();
  const [time, setTime] = useState(boxSeconds as unknown as number);
  const durationConversion =
    durationType === "Minutes"
      ? (duration as unknown as number) * 60 // Minutes
      : (duration as unknown as number); // Else holds

  const [globalDuration, setGlobalDuration] = useState(durationConversion);
  const [breathState, setBreathState] = useState("");
  const [holdsCounter, setHoldsCounter] = useState(0);
  const breathStateOptions = ["Inhale", "Hold", "Exhale", "Hold"];
  const timeRef = useRef(null) as any;
  const INHALE = 0;
  const HOLD = 1;
  const EXHALE = 2;

  console.log("Duration in seconds:", duration);
  console.log("Duration Type:", durationType);

  /*

  duration = duration * 60 to seconds

  if (durationType == "holds") {
    setGlobalDuration((prev) => prev + 16);
  }

  duration = duration * 4 * boxSeconds 

  Globalduration

  */

  useEffect(() => {}, [time, globalDuration]);

  // work in progress
  const startTimer = (seconds: number, breathState: string) => {
    return new Promise<void>((resolve) => {
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
    setHoldsCounter(0);
    // startBreathingExercise();
  }

  const inhale = async () => {
    setBreathState(breathStateOptions[INHALE]);
    await startTimer(Number(boxSeconds), breathStateOptions[0]);
  };

  const exhale = async () => {
    setBreathState(breathStateOptions[EXHALE]);
    await startTimer(Number(boxSeconds), breathStateOptions[2]);
  };

  const hold = async () => {
    setBreathState(breathStateOptions[HOLD]);
    await startTimer(Number(boxSeconds), breathStateOptions[1]);
  };

  const startBreathingExercise = async () => {
    let localGlobalDuration = globalDuration;
    if (durationType === "Holds") {
      localGlobalDuration = duration as unknown as number;
      //   setGlobalDuration(localGlobalDuration);
    }
    if (durationType === "Holds") {
      while (localGlobalDuration > 0) {
        await inhale()
          .then(async () => await hold())
          .then(async () => await exhale())
          .then(async () => await hold());
        setHoldsCounter((prev) => prev + 1);
        localGlobalDuration -= 1;
      }
    }
  };

  return (
    <View>
      <Text>Action Component</Text>
      <Text>Box Seconds: {boxSeconds}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Duration Type: {durationType}</Text>
      <View className="mt-10 mb-10 items-center justify-center">
        <Text className="text-header-secondary">
          Breath State: {breathState}
        </Text>
        <Text className="text-header-primary">Time Left: {time} seconds</Text>
        {durationType === "Minutes" && (
          <Text className="text-header-secondary">
            Global Duration {globalDuration} {durationType}
          </Text>
        )}
        {durationType === "Holds" && (
          <Text className="text-header-secondary">
            Holds Counter: {holdsCounter} / {duration as unknown as number}
          </Text>
        )}
      </View>
      <Button title="Start" onPress={() => startBreathingExercise()} />
      <Button title="Pause" onPress={() => pauseBreathingExercise()} />
      <Button title="Stop" onPress={() => stopBreathingExercise()} />
      <Button title="Restart" onPress={() => restartBreathingExercise()} />

      <View className="items-center justify-center">
        <View className="border border-8 border-indigo-500 w-40 h-40  mt-10" />
        {/* <View className="border border-t-8 border-indigo-500 w-40 h-40  mt-10" /> */}
      </View>
    </View>
  );
}
