import { Stack } from 'expo-router';
import React from 'react';

export default function InfoCenterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="info/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
