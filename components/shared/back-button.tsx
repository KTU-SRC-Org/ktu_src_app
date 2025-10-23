import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { clsx } from 'clsx';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type BackButtonProps = {
  title?: string;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  showLabel?: boolean;
  onPress?: () => void;
} & TouchableOpacityProps;

export const BackButton = forwardRef<View, BackButtonProps>(
  (
    {
      title = "Go Back",
      bgColor = "bg-[#163B75]",
      textColor = "text-white",
      iconColor = "#FFFFFF",
      showLabel = true,
      className,
      onPress,
      ...props
    },
    ref
  ) => {
    const router = useRouter();

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress || (() => router.back())}
        className={clsx(
          "absolute top-10 left-6 flex-row items-center self-start px-4 py-2 rounded-full",
          bgColor,
          className
        )}
        {...props}
      >
        <Ionicons name="arrow-back" size={22} color={iconColor} /> 
        {showLabel && (
          <Text className={clsx("ml-2 font-semibold text-base", textColor)}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

BackButton.displayName = "BackButton";
