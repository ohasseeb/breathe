import { Link, useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";
import "../../global.css";
import BackgroundView from "../components/BackgroundView";
import StyledButton from "../components/StyledButton";
//This page is the Menu for Box Breathing, choosing the duration of inhales/exhales/holds

export default function BoxBreathingMenu() {
  const router = useRouter();
  function navigateToDurationSelect(boxSeconds: number | "Custom") {
    const durationNavigationObj = {
      pathname: "./Duration",
      params: { boxSeconds: boxSeconds === "Custom" ? "Custom" : boxSeconds },
    } as any; // Satisfy the typed Link Href

    return durationNavigationObj;
  }

  return (
    <BackgroundView className="flex-1 items-center justify-center p-6">
      <Text className="text-4xl font-bold text-blue-500">Box Breathing</Text>
      {/* // Turn this into a Scroll View */}
      <ScrollView className="w-full mt-10">
        <StyledButton
          onPress={() => router.push(navigateToDurationSelect(4))}
          buttonColor="mellowYellow"
        >
          <Text className="text-header-secondary">4 Seconds</Text>
        </StyledButton>
        <StyledButton
          onPress={() => router.push(navigateToDurationSelect(5))}
          buttonColor="mellowGreen"
        >
          <Text className="text-header-secondary">5 Seconds</Text>
        </StyledButton>
        <StyledButton
          onPress={() => router.push(navigateToDurationSelect(6))}
          buttonColor="mellowRed"
        >
          <Text className="text-header-secondary">6 Seconds</Text>
        </StyledButton>
        <StyledButton
          onPress={() => router.push(navigateToDurationSelect("Custom"))}
        >
          <Text className="text-header-secondary">Custom</Text>
        </StyledButton>
      </ScrollView>
    </BackgroundView>
  );
}

function NavigationLink({ href, children }: { href: any; children: string }) {
  return (
    <Text className="text-2xl m-4 ">
      <Link className="w-full h-full" href={href}>
        {children}
      </Link>
    </Text>
  );
}
