import '../global.css';

import '../translation';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PortalHost } from '@rn-primitives/portal';
import { RootProvider } from '@/providers/root-provider';
import { useAuthSyncStore } from '@/hooks/auth/use-auth-sync-store';
import { useAuthSession } from '@/hooks/auth/use-auth-session';
import { useRegisterAutoRefresh } from '@/lib/supabase/use-register-auto-refresh';
import { useAuthChangeListener } from '@/lib/supabase/use-auth-change-listener';
import {SafeAreaProvider} from "react-native-safe-area-context";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootProvider>
      <RootLayoutNav />
    </RootProvider>
  );
}

function RootLayoutNav() {
  useRegisterAutoRefresh();
  useAuthSyncStore();

  useAuthChangeListener({
    appHomePath: '/',
  });

  const { isAuthenticated } = useAuthSession();
  // const isLoggedIn = true;

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <PortalHost />
    </SafeAreaProvider>
  );
}
