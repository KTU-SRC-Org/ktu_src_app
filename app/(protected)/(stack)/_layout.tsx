import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="marketplace"/>
      <Stack.Screen name="info-center"/>
      <Stack.Screen name="events" />
    </Stack>
  );
};

export default StackLayout;
