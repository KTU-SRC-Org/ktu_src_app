import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const MarketplaceHeader = () => {
  return(
    <View className="flex-row justify-between items-center p-4">
      <Text className="text-2xl font-bold">Marketplace</Text>
      <TouchableOpacity
        className="bg-[#FF8C42] w-10 h-10 rounded-full justify-center items-center shadow-lg"
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}
export default MarketplaceHeader;