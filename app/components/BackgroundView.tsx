import { View } from "react-native";

export default function BackgroundView({
  className,
  children,
  styleToggle = false,
}: {
  className?: string;
  children: React.ReactNode;
  styleToggle?: boolean; // if true, no default styles applied
}) {
  let styles = `bg-skyBlue p-6 ${className}`;

  return <View className={styleToggle ? `` : styles}>{children}</View>;
}
