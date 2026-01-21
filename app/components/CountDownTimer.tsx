import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

type countdownProps = {
  onCountdownComplete?: () => void;
};

export default function CountDownTimer({
  onCountdownComplete,
}: countdownProps) {
  const [countDownTimer, setCountDownTimer] = useState(3);
  const countDownTimerRef = useRef(null) as any;

  const startTimer = () => {
    return new Promise<void>((resolve) => {
      let localTime = countDownTimer;

      if (countDownTimerRef.current) {
        clearInterval(countDownTimerRef.current);
        countDownTimerRef.current = null;
      }

      countDownTimerRef.current = setInterval(async () => {
        setCountDownTimer((prev) => Math.max(prev - 1, 0));
        countDownTimerRef.current += 1;
        localTime -= 1;

        if (localTime === 0) {
          clearInterval(countDownTimerRef.current);
          countDownTimerRef.current = null;
          resolve();
          onCountdownComplete?.();
        }
      }, 1000);
    });
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {}, [countDownTimer]);

  return (
    <View>
      <Text>Countdown Timer</Text>
      <Text> {countDownTimer}</Text>
    </View>
  );
}
