import {Stack, useRouter} from "expo-router";
import {Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default function InfoCenterLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="info/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
