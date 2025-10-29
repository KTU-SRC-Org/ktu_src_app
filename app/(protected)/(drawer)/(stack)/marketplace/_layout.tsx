import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="marketplace/categories/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="marketplace/product/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="marketplace/category/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
