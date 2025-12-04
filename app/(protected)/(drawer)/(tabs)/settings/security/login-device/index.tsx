import { SafeAreaView } from 'react-native-safe-area-context';
import LoginDevice from '@/features/settings/security/login-device';
import { Stack } from 'expo-router';

const LoginDeviceScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Device',
        }}
      />
      <LoginDevice />
    </SafeAreaView>
  );
};
export default LoginDeviceScreen;
