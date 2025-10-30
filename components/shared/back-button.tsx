// import { forwardRef } from "react";
// import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
// import { clsx } from 'clsx';
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
//
// type BackButtonProps = {
//   title?: string;
//   bgColor?: string;
//   textColor?: string;
//   iconColor?: string;
//   showLabel?: boolean;
//   onPress?: () => void;
// } & TouchableOpacityProps;
//
// export const BackButton = forwardRef<View, BackButtonProps>(
//   (
//     {
//       title = "Go Back",
//       bgColor = "bg-[#163B75]",
//       textColor = "text-white",
//       iconColor = "#FFFFFF",
//       showLabel = true,
//       className,
//       onPress,
//       ...props
//     },
//     ref
//   ) => {
//     const router = useRouter();
//
//     return (
//       <TouchableOpacity
//         ref={ref}
//         onPress={onPress || (() => router.back())}
//         className={clsx(
//           "absolute top-10 left-6 flex-row items-center self-start px-4 py-2 rounded-full",
//           bgColor,
//           className
//         )}
//         {...props}
//       >
//         <Ionicons name="arrow-back-circle-outline" size={22} color={iconColor} />
//         {showLabel && (
//           <Text className={clsx("ml-2 font-semibold text-base", textColor)}>
//             {title}
//           </Text>
//         )}
//       </TouchableOpacity>
//     );
//   }
// );
//
// BackButton.displayName = "BackButton";

import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View, StyleSheet } from "react-native";
import { clsx } from "clsx";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type BackButtonProps = {
  title?: string;
  textColor?: string;
  iconColor?: string;
  showLabel?: boolean;
  onPress?: () => void;
} & TouchableOpacityProps;

export const BackButton = forwardRef<View, BackButtonProps>(
  (
    {
      title = "Go Back",
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
        activeOpacity={0.8}
        className={clsx("rounded-full text-sm overflow-hidden", className)}
        {...props}
      >
        <LinearGradient
          colors={["#F5882B", "#8A3324"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContainer}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={18}
            color={iconColor}
          />
          {showLabel && (
            <Text
              className={clsx("ml-1 font-semibold text-sm", textColor)}
              style={{ includeFontPadding: false, textAlignVertical: "center" }}
            >
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
);

BackButton.displayName = "BackButton";

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
  },
});
