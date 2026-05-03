import { useAudioPlayer } from "expo-audio"; // This component runs the box-breathing exercise.
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import ActionBox from "../components/ActionBox";
import BackgroundView from "../components/BackgroundView";
import CountDownTimer from "../components/CountDownTimer";
import { useSettings } from "../hooks/useSettings";
// It reads params from the route (boxSeconds, duration, durationType)
// and coordinates the inhale/hold/exhale/hold sequence using startTimer,
// which returns a Promise that resolves when the phase finishes.
export default function Action() {
  // read search params from router
  const {
    boxSeconds,
    duration = boxSeconds,
    durationType,
  } = useLocalSearchParams();

  const settings = useSettings();

  console.log("Settings From Local Storage in Action:", settings);
  // small-phase timer (counts down each phase/box)
  const [time, setTime] = useState(boxSeconds as unknown as number);

  // convert minutes -> seconds when appropriate
  const durationConversion =
    durationType === "Minutes"
      ? (duration as unknown as number) * 60 // Minutes
      : (duration as unknown as number); // Else holds

  // total remaining global duration (seconds or holds depending on durationType)
  const [globalDuration, setGlobalDuration] = useState(durationConversion);

  // UI & counters
  const [breathState, setBreathState] = useState("");
  const [holdsCounter, setHoldsCounter] = useState(0);
  const [secondsCounter, setSecondsCounter] = useState(0);
  const [minutesCounter, setMinutesCounter] = useState(0);

  // toggles used to highlight which side of the box is active
  const [topToggle, setTopToggle] = useState(false);
  const [botToggle, setBotToggle] = useState(false);
  const [leftToggle, setLeftToggle] = useState(false);
  const [rightToggle, setRightToggle] = useState(false);

  // flag set by the countdown component when the pre-countdown completes
  const [countdownCallBack, setCountdownCallback] = useState(false);

  // breath phases and refs/constants
  const breathStateOptions = ["Inhale", "Hold", "Exhale", "Hold"];
  const timeRef = useRef<NodeJS.Timeout | number | null>(null); // holds the current interval id for phase timers
  const secondsRef = useRef(0); // persistent seconds counter across phases
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const INHALE = 0;
  const HOLD = 1;
  const EXHALE = 2;
  const DEBUG = false;
  const FIRST = 1;
  const SECOND = 2;

  // const Audio Source
  const sonarSource = require("../../assets/audio/Sonar.wav");
  const drumSource = require("../../assets/audio/DrumEdited.wav");
  const secondPlayer = useAudioPlayer(sonarSource);
  const stateChangePlayer = useAudioPlayer(drumSource);
  // Start the breathing exercise automatically once the countdown completes.
  // countdownCallBack is set to true by <CountDownTimer onCountdownComplete={...} />
  useEffect(() => {
    if (countdownCallBack) {
      startBreathingExercise();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownCallBack]);

  // Cleanup on unmount (e.g., navigation Back button or hardware back)
  useEffect(() => {
    return () => {
      stopAllExerciseActivity();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // a placeholder effect that can be used for debugging or derived updates
  useEffect(() => {}, [
    time,
    globalDuration,
    secondsCounter,
    minutesCounter,
    topToggle,
    leftToggle,
    rightToggle,
    botToggle,
  ]);

  // startTimer: runs a countdown for "seconds" and resolves when it finishes.
  // - Clears any existing interval first to prevent overlaps.
  // - Uses setTime to update the UI-per-phase timer.
  // - Updates global duration and per-second counters.
  const startTimer = (seconds: number) => {
    return new Promise<void>((resolve) => {
      setTime(seconds);
      let localTime = seconds;

      // clear existing interval if any (prevents multiple concurrent intervals)
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }

      // create a new interval that ticks every second
      timeRef.current = setInterval(async () => {
        if (!isMounted.current) {
          if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
          }
          return;
        }

        // decrement phase timer (clamped at 0)
        setTime((prev) => Math.max(prev - 1, 0));

        // increment an overall seconds counter (stored in state)
        setSecondsCounter((prev) => prev + 1);

        // track local phase time remaining
        localTime -= 1;

        // decrement the global duration (clamped at 0)
        setGlobalDuration((prev) => Math.max(prev - 1, 0));

        // increment persistent seconds counter (stored in ref to persist across phases)
        secondsRef.current += 1;

        // If we've reached a full minute, update minute counter
        if (secondsRef.current % 60 === 0) {
          setMinutesCounter((prev) => prev + 1);
        }
        // Play Audio (When Clicking Back Button then Forward, Gets an Error)
        // Add Conditional Logic incase it's an Option
        // When the sound is equal to box seconds have a differents sound
        if (secondsRef.current % (boxSeconds as unknown as number) === 0) {
          stateChangePlayer?.seekTo?.(0);
          stateChangePlayer?.play?.();
        } else {
          secondPlayer?.seekTo?.(0);
          secondPlayer?.play?.();
        }

        // When the local phase finishes, clear interval and resolve the Promise
        if (localTime <= 0) {
          if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
          }
          resolve(); // signal that this phase is done
        }
      }, 1000);
    });
  };

  // Unified cleanup for timing and audio; can be called from any stop/exit path.
  function stopAllExerciseActivity() {
    console.log("Breathing exercise cleanup");

    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }

    setTime(0);

    try {
      secondPlayer?.pause?.();
      // secondPlayer?.stop?.();
      stateChangePlayer?.pause?.();
      // stateChangePlayer?.stop?.();
    } catch (error) {
      console.warn("Audio cleanup failed", error);
    }
  }

  // Pause: clears the current interval (simple pause)
  function pauseBreathingExercise() {
    console.log("Breathing exercise paused");
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
  }

  // Stop: clears interval and reset the small-phase timer to 0
  function stopBreathingExercise() {
    console.log("Breathing exercise stopped");
    stopAllExerciseActivity();
  }

  // helper to turn all toggles off
  function togglesOff() {
    setLeftToggle(false);
    setBotToggle(false);
    setRightToggle(false);
    setTopToggle(false);
  }

  // Restart logic: reset phase timer and counters as needed
  function restartBreathingExercise() {
    console.log("Breathing exercise restarted");
    setTime(duration as unknown as number);
    setHoldsCounter(0);
  }

  // Phase helpers: each sets UI state then awaits startTimer for that phase length.
  // They ensure phases run sequentially when awaited/chained.
  const inhale = async () => {
    setBreathState(breathStateOptions[INHALE]);
    setBotToggle(false);
    setLeftToggle(true);
    await startTimer(Number(boxSeconds));
  };

  const exhale = async () => {
    setBreathState(breathStateOptions[EXHALE]);
    setTopToggle(false);
    setRightToggle(true);
    await startTimer(Number(boxSeconds));
  };

  const hold = async (whichHold: number) => {
    setBreathState(breathStateOptions[HOLD]);
    if (whichHold === FIRST) {
      setLeftToggle(false);
      setTopToggle(true);
    }
    if (whichHold === SECOND) {
      setRightToggle(false);
      setBotToggle(true);
    }
    await startTimer(Number(boxSeconds));
  };

  // Orchestrates the full breathing exercise:
  // - For "Holds" mode it repeats the 4-phase sequence `duration` times.
  // - For "Minutes" mode it repeats until the secondsRef reaches the total duration in seconds.
  // Note: the loops await each phase sequentially so phases don't overlap.
  const startBreathingExercise = async () => {
    let localGlobalDuration = globalDuration;
    if (durationType === "Holds") {
      localGlobalDuration = duration as unknown as number;
    }

    if (durationType === "Holds") {
      while (localGlobalDuration > 0) {
        await inhale()
          .then(async () => await hold(FIRST))
          .then(async () => await exhale())
          .then(async () => await hold(SECOND));
        setHoldsCounter((prev) => prev + 1);
        localGlobalDuration -= 1;
      }
      togglesOff();
    } else {
      while (secondsRef.current <= durationConversion) {
        await inhale()
          .then(async () => await hold(FIRST))
          .then(async () => await exhale())
          .then(async () => await hold(SECOND));
        setHoldsCounter((prev) => prev + 1);
        localGlobalDuration -= 1;
      }
      togglesOff();
    }
  };

  // Render UI: includes a Countdown timer which triggers start via onCountdownComplete
  return (
    <BackgroundView>
      {/* Countdown runs first; when it finishes it calls setCountdownCallback(true) */}
      <CountDownTimer onCountdownComplete={() => setCountdownCallback(true)} />

      {/* Debug info (optional) */}
      {DEBUG && (
        <View>
          <Text>Box Seconds: {boxSeconds}</Text>
          <Text>Duration: {duration}</Text>
          <Text>Duration Type: {durationType}</Text>
        </View>
      )}

      {/* Main action box displays current breath state and timers */}
      <View className="mt-10 mb-10 items-center justify-center">
        <ActionBox
          size={350}
          thickness={3}
          leftToggle={leftToggle}
          topToggle={topToggle}
          rightToggle={rightToggle}
          botToggle={botToggle}
          color="#000"
        >
          <Text className="text-header-secondary">{breathState}</Text>
          <Text className="text-header-primary">{time} seconds</Text>
          <View>
            {DEBUG && (
              <Text className="text-header-secondary">
                Global Duration {globalDuration} Seconds
              </Text>
            )}
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
        </ActionBox>

        {/* Show holds counter only for Holds mode */}
        {durationType === "Holds" && (
          <Text className="text-header-secondary">
            Holds Counter: {holdsCounter} / {duration as unknown as number}
          </Text>
        )}
      </View>

      {/* Manual controls for testing */}
      <Button title="Start" onPress={() => startBreathingExercise()} />
      <Button title="Pause" onPress={() => pauseBreathingExercise()} />
      <Button title="Stop" onPress={() => stopBreathingExercise()} />
      <Button title="Restart" onPress={() => restartBreathingExercise()} />
    </BackgroundView>
  );
}
