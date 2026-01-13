import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function CountDownTimer() {
  const [countDownTimer, setCountDownTimer] = useState(3);
  const countDownTimerRef = useRef(null) as any;

  const startTimer = () => {
    return new Promise<void>((resolve) => {
      if (countDownTimerRef.current) {
        clearInterval(countDownTimerRef.current);
        countDownTimerRef.current = null;
      }

      countDownTimerRef.current = setInterval(async () => {
        console.log("in the Start timer function");
        setCountDownTimer((prev) => Math.max(prev - 1, 0));
        // localCountDownTimer -= 1;
        countDownTimerRef.current += 1;

        if (countDownTimerRef.ref === 3) {
          clearInterval(countDownTimerRef.current);
          countDownTimerRef.current = null;
          resolve();
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
      {/* <Button title="Start" onPress={() => startTimer()} /> */}
    </View>
  );
}
