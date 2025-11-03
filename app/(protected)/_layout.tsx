import { Stack } from 'expo-router';

const ProtectedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="complete-profile-screen" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)" options={{ headerShown: false }} />
      <Stack.Screen name="hostels/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
