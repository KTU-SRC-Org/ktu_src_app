import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useRouter} from "expo-router";


const BackNavigationHeader = ({title, itemCount}: {title: string, itemCount?: number}) => {
  const router = useRouter();

  return(
    <View className="p-4 flex-row justify-between items-center">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text className="flex flex-row gap-2 items-center text-lg font-bold capitalize">
        {title} {''}
        {itemCount !== undefined && itemCount > 0 && <Text>{` [${itemCount}]`}</Text>}
      </Text>
      <View className="w-6" />
    </View>
  )
}
export default BackNavigationHeader;