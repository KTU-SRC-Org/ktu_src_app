import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useRouter} from "expo-router";


const BackNavigationHeader = ({title}: {title: string}) => {
  const router = useRouter();

  return(
    <View className="p-4 flex-row justify-between items-center">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text className="text-lg font-bold capitalize">
        {title}
      </Text>
      <View className="w-6" />
    </View>
  )
}
export default BackNavigationHeader;