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
        name="profile-account"
        options={{
          title: 'Profile',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'white' },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          title: 'Password & Security',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'white' },
          headerBackButtonDisplayMode: 'minimal',
        }}

      />
        <Stack.Screen
          name="security/verification"
          options={{
              title: 'Account Verification',
              headerBackTitle: '',
              headerLargeTitleShadowVisible: true,
              headerLargeTitle: false,
              headerShadowVisible: false,
              headerStyle: { backgroundColor: 'white' },
              headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen
          name="security/login-device"
          options={{
              title: 'Device',
              headerBackTitle: '',
              headerLargeTitleShadowVisible: true,
              headerLargeTitle: false,
              headerShadowVisible: false,
              headerStyle: { backgroundColor: 'white' },
              headerBackButtonDisplayMode: 'minimal',
          }}
        />
    </Stack>
  );
};

export default SettingsLayout;
