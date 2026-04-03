import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

type countdownProps = {
  // parent can pass a callback to be invoked when countdown finishes
  onCountdownComplete?: () => void;
};

export default function CountDownTimer({
  onCountdownComplete,
}: countdownProps) {
  // starting value for the countdown (3 seconds)
  const [countDownTimer, setCountDownTimer] = useState(3);

  // ref holds the interval id so we can clear it on completion/unmount
  const countDownTimerRef = useRef(null) as any;

  // startTimer returns a Promise that resolves when the countdown reaches zero.
  // It also calls onCountdownComplete (if provided) to inform the parent component.
  const startTimer = () => {
    return new Promise<void>((resolve) => {
      // localTime is used to avoid relying on state immediacy issues:
      let localTime = countDownTimer;

      // clear previous interval if it exists
      if (countDownTimerRef.current) {
        clearInterval(countDownTimerRef.current);
        countDownTimerRef.current = null;
      }

      // create a new interval that ticks every second
      countDownTimerRef.current = setInterval(async () => {
        // decrement the displayed countdown value (clamped to 0)
        setCountDownTimer((prev) => Math.max(prev - 1, 0));

        // NOTE: countDownTimerRef is used as an interval id; do not mutate it as a counter.
        // The following line was present in earlier code and looks like a bug:
        // countDownTimerRef.current += 1;
        // We leave it out to avoid corrupting the interval id.

        // decrement localTime which tracks remaining ticks for this run
        localTime -= 1;

        // when countdown reaches zero, clear interval, resolve promise, and notify parent
        if (localTime === 0) {
          if (countDownTimerRef.current) {
            clearInterval(countDownTimerRef.current);
            countDownTimerRef.current = null;
          }
          resolve(); // fulfill promise so callers can await
          onCountdownComplete?.(); // inform parent that countdown finished
        }
      }, 1000);
    });
  };

  // Start the countdown once when component mounts
  useEffect(() => {
    startTimer();

    // cleanup on unmount: ensure interval is cleared
    return () => {
      if (countDownTimerRef.current) {
        clearInterval(countDownTimerRef.current);
        countDownTimerRef.current = null;
      }
    };
    // startTimer has no dependencies — we want it to run once on mount
  }, []);

  // optional effect to respond to UI changes of the counter
  useEffect(() => {}, [countDownTimer]);

  return (
    <View>
      <Text>Countdown Timer</Text>
      <Text> {countDownTimer}</Text>
    </View>
  );
}
