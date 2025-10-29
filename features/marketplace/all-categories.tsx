import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {ALL_CATEGORIES, CategoryInterface} from "@/features/marketplace/index";

export default function AllCategories() {
  const router = useRouter();

  const renderCategory = ({ item }: { item: CategoryInterface }) => (
    <TouchableOpacity
      className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-3"
      onPress={() =>
        router.push({
          pathname: "/marketplace/category/[id]",
          params: { id: item.id },
        })
      }
    >
      <View
        className="w-14 h-14 rounded-full justify-center items-center mr-4"
        style={{ backgroundColor: item.color }}
      >
        <Text className="text-2xl">{item.icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold mb-1">{item.name}</Text>
      </View>

      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={ALL_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
