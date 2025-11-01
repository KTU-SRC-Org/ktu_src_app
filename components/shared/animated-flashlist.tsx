// components/ui/animated-flashlist.tsx
import Animated from "react-native-reanimated";
import { FlashList, FlashListProps } from "@shopify/flash-list";

export const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList as unknown as React.ComponentType<FlashListProps<any>>
);
