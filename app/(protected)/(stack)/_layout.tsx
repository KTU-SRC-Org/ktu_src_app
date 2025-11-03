import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="marketplace" options={{ headerShown: false }} />
      <Stack.Screen name="info-center" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;
