import { Stack } from 'expo-router';

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
