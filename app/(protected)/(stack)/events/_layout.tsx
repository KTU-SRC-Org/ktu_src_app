import { Stack } from 'expo-router';

const EventsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="events/[id]" />
    </Stack>
  );
};

export default EventsLayout;
