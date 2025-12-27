import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import "../../global.css";

//This page is the Menu for Box Breathing, choosing the duration of inhales/exhales/holds

export default function BoxBreathingMenu() {
  function navigateToDurationSelect(boxSeconds: number | "Custom") {
    const durationNavigationObj = {
      pathname: "./Duration",
      params: { boxSeconds: boxSeconds === "Custom" ? "Custom" : boxSeconds },
    } as any; // Satisfy the typed Link Href

    return durationNavigationObj;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl font-bold text-blue-500">Box Breathing</Text>
      {/* // Turn this into a Scroll View */}
      <ScrollView>
        <NavigationLink href={navigateToDurationSelect(4)}>
          4 Second
        </NavigationLink>
        <NavigationLink href={navigateToDurationSelect(5)}>
          5 Second
        </NavigationLink>
        <NavigationLink href={navigateToDurationSelect(6)}>
          6 Second
        </NavigationLink>
        <NavigationLink href={navigateToDurationSelect("Custom")}>
          Custom
        </NavigationLink>
      </ScrollView>
    </View>
  );
}

function NavigationLink({ href, children }: { href: any; children: string }) {
  return (
    <Text className="text-2xl m-4">
      <Link href={href}>{children}</Link>
    </Text>
  );
}
