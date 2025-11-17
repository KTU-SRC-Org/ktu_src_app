import { Stack } from 'expo-router';

const SrcNewLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SrcNewLayout;
