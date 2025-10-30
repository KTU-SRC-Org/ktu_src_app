import { Text, View } from "react-native";
import React from "react";
import { BackButton } from "@/components/shared/back-button";

const BackNavigationHeader = ({title, itemCount,}: {
  title: string;
  itemCount?: number;
}) => {
  return (
    <View className="relative flex-row items-center justify-center bg-white py-4 px-6">
      <View className="absolute left-2">
        <BackButton />
      </View>

      <Text className="text-lg font-bold text-black capitalize text-center">
        {title}
        {itemCount !== undefined && itemCount > 0 && (
          <Text className="text-black">{` [${itemCount}]`}</Text>
        )}
      </Text>
    </View>
  );
};

export default BackNavigationHeader;
