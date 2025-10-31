import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="categories/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
