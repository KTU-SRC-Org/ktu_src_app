import {Stack, useRouter} from "expo-router";
import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function InfoCenterLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Notification & Announcements",
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"black"} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="info/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
