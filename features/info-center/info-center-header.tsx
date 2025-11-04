import {Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useRouter} from "expo-router";

const InfoCenterHeader = ({title} : {title?: string}) => {
  const router = useRouter();
  return(
    <View className="flex-row items-center p-2 border-b border-neutral-200 bg-white">
      <Pressable
        onPress={() => router.back()}
        className="mr-2 p-2 rounded-full active:opacity-70"
      >
        <Ionicons name="chevron-back" color={"#000"}  size={24}/>
      </Pressable>
      {title && (
        <Text className="text-lg font-semibold text-black flex-1">
          {title}
        </Text>
      )}
    </View>
  )
}
export default InfoCenterHeader;