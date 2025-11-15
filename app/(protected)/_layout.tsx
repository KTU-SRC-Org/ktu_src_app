import { Stack } from 'expo-router';
import { useProfileBootstrap } from '@/hooks/profile/use-profile-bootstrap';
import { useAppStore } from '@/store/store';

const ProtectedLayout = () => {
  // Load profile into store
  useProfileBootstrap();

  const completed = useAppStore((s) => s.profileSummary.completed);
  const hydrated = useAppStore((s) => s._hasHydrated);

  // Don’t render router until store hydration + bootstrap done
  if (!hydrated || completed === null) {
    return null; // or splash screen
  }

  return (
    <Stack>
      <Stack.Protected guard={!completed}>
        <Stack.Screen name="complete-profile-screen" options={{ headerShown: false }} />
      </Stack.Protected>

     <Stack.Protected guard={completed}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)" options={{ headerShown: false }} />
        <Stack.Screen name="hostels/[id]" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default ProtectedLayout;
