import type { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  size?: number; // px
  thickness?: number; // px
  color?: string;
  children?: ReactNode;
  style?: ViewStyle;
};

export default function ActionBox({
  size = 280,
  thickness = 5,
  color = "#000",
  children,
  style,
}: Props) {
  return (
    <View
      // center by default; adjust with className or parent layout if needed
      className="mx-auto my-6"
      style={[
        { width: size, height: size, position: "relative", overflow: "hidden" },
        style,
      ]}
    >
      {/* top */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: thickness,
          backgroundColor: color,
        }}
      />
      {/* bottom */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: thickness,
          backgroundColor: color,
        }}
      />
      {/* left */}
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: thickness,
          backgroundColor: color,
        }}
      />
      {/* right */}
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: thickness,
          backgroundColor: color,
        }}
      />

      {/* content area */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </View>
  );
}
