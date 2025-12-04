import { Stack, useRouter } from 'expo-router';
import React from 'react';

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
      <Stack.Screen name="info/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
