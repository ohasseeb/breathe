import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { TouchableOpacity } from "react-native";

// button 46 from : https://getcssscan.com/css-buttons-examples
interface StyledButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
  buttonColor?: string;
}

//Tailwind Does not like Dynamic Class Names so we map them here
const colorMap: Record<string, string> = {
  mellowYellow: "bg-mellowYellow",
  mellowGreen: "bg-mellowGreen",
  mellowRed: "bg-mellowRed",
  skyBlue: "bg-skyBlue",
  accent1: "bg-accent1",
  accent2: "bg-accent2",
  accent3: "bg-accent3",
  accent4: "bg-accent4",
  accent5: "bg-accent5",
  default: "bg-default",
  // add more as needed
};

const StyledButton = ({
  onPress,
  children,
  buttonColor = "", // default button styling
}: StyledButtonProps) => {
  const backgroundClass = colorMap[buttonColor] || colorMap["default"];
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center w-full max-w-full 
       ${backgroundClass} border border-[#DFDFDF] rounded-2xl 
      text-black text-[18px] leading-7 font-sans px-[22px] py-[14px] mt-4`}
    >
      {children}

      {/* {link && <Link href={link} />} */}
    </TouchableOpacity>
  );
};

export default StyledButton;
