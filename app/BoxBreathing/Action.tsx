import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import BackgroundView from "../components/BackgroundView";
// This View is when the exercise Begins
export default function Action() {
  const {
    boxSeconds,
    duration = boxSeconds,
    durationType,
  } = useLocalSearchParams();
  const [time, setTime] = useState(boxSeconds as unknown as number); // Is the  small timer that counts down each box seconds
  const durationConversion =
    durationType === "Minutes"
      ? (duration as unknown as number) * 60 // Minutes
      : (duration as unknown as number); // Else holds

  const [globalDuration, setGlobalDuration] = useState(durationConversion); // Global Counter for total seconds, one hold is 4 * box seconds
  const [breathState, setBreathState] = useState("");
  const [holdsCounter, setHoldsCounter] = useState(0);
  const [secondsCounter, setSecondsCounter] = useState(0);
  const [minutesCounter, setMinutesCounter] = useState(0);
  const breathStateOptions = ["Inhale", "Hold", "Exhale", "Hold"];
  const timeRef = useRef(null) as any;
  const secondsRef = useRef(0);
  const INHALE = 0;
  const HOLD = 1;
  const EXHALE = 2;

  // Minutes Calcuation

  useEffect(() => {}, [time, globalDuration, secondsCounter, minutesCounter]);

  // work in progress
  // LocalTime acts as the timer for each breath phase due to setTime (SetState is async)
  const startTimer = (seconds: number) => {
    return new Promise<void>((resolve) => {
      setTime(seconds);
      let localTime = seconds;

      // clear existing interval if any
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }

      timeRef.current = setInterval(async () => {
        setTime((prev) => Math.max(prev - 1, 0));
        setSecondsCounter((prev) => prev + 1);

        localTime -= 1;
        setGlobalDuration((prev) => Math.max(prev - 1, 0));
        secondsRef.current += 1;

        // For Minutes based Duration tracking
        if (secondsRef.current % 60 === 0) {
          setMinutesCounter((prev) => prev + 1);
        }

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
  }

  const inhale = async () => {
    setBreathState(breathStateOptions[INHALE]);
    await startTimer(Number(boxSeconds));
  };

  const exhale = async () => {
    setBreathState(breathStateOptions[EXHALE]);
    await startTimer(Number(boxSeconds));
  };

  const hold = async () => {
    setBreathState(breathStateOptions[HOLD]);
    await startTimer(Number(boxSeconds));
  };

  const startBreathingExercise = async () => {
    let localGlobalDuration = globalDuration;
    if (durationType === "Holds") {
      localGlobalDuration = duration as unknown as number;
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
    } else {
      // Minutes
      //   console.log("Starting Minutes based breathing exercise");
      //   console.log("Duration, Minutes:", duration);
      //   console.log("Duration Type: ", durationType);
      //   console.log("Duration Conversion:", durationConversion);
      while (secondsRef.current <= durationConversion) {
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
    <BackgroundView>
      <Text>Box Seconds: {boxSeconds}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Duration Type: {durationType}</Text>
      <View className="mt-10 mb-10 items-center justify-center">
        <Text className="text-header-secondary">
          Breath State: {breathState}
        </Text>
        <Text className="text-header-primary">Time Left: {time} seconds</Text>
        <View>
          <Text className="text-header-secondary">
            Global Duration {globalDuration} Seconds
          </Text>
          {durationType === "Minutes" && (
            <View>
              <Text className="text-header-secondary">
                Seconds Counter: {secondsCounter}
              </Text>

              <Text className="text-header-secondary">
                Minutes Counter: {minutesCounter}
              </Text>
            </View>
          )}
        </View>
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
      </View>
    </BackgroundView>
  );
}
