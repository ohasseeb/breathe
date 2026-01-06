import { useRouter } from "expo-router";
import { Text } from "react-native";
import "../global.css";
import BackgroundView from "./components/BackgroundView";
import StyledButton from "./components/StyledButton";
export default function Index() {
  const router = useRouter();
  function navigateToExerciseMenu(exercise: string) {
    const exerciseNavigationObj = {
      pathname: `../${exercise}/Menu`,
      params: {},
    } as any;

    console.log(exerciseNavigationObj);

    return exerciseNavigationObj;
  }

  return (
    <BackgroundView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold text-light-200 mb-6">
        Welcome to Breathe
      </Text>

      <StyledButton
        onPress={() => router.push(navigateToExerciseMenu("BoxBreathing"))}
        buttonColor="mellowYellow"
      >
        <Text className="text-header-secondary">Box Breathing</Text>
      </StyledButton>

      <StyledButton
        onPress={() => router.push(navigateToExerciseMenu("4-7-8"))}
        buttonColor="mellowGreen"
      >
        <Text className="text-header-secondary">4 - 7 - 8 Breathing</Text>
      </StyledButton>
    </BackgroundView>
  );
}
