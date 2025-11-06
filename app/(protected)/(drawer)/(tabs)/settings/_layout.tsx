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
       <Stack.Screen
        name="profile-account/index"
        options={{
          title: 'Profile',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'white' },
          headerBackButtonDisplayMode: 'minimal'
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
