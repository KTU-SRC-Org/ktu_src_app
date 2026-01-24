import { ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { SettingSection } from '@/features/settings/setting-section';
import { ExternalServicesSection } from '@/features/settings/external-services-section';
import { DeveloperCredits } from '@/features/settings/developer-credits';
import { settingsSections, externalServices } from '@/config/settings.config';
import { SettingItem, ExternalService } from '@/types/settings.types';
import { useSignOut } from '@/hooks/auth/use-signout';

const SettingsScreen = () => {
  const router = useRouter();
  const signOut = useSignOut();

  const handleItemPress = (item: SettingItem) => {
    if (item.disabled || item.comingSoon) return;

    if (item.onPress) {
      item.onPress();
    } else if (item.link) {
      console.log('Navigate to:', item.link);
      router.push(item.link as Href);
    }
  };

  const handleServicePress = (service: ExternalService) => {
    if (service.link) {
      console.log('Open external link:', service.link);
      // Linking.openURL(service.link);
    }
  };

  const handleDeveloperCreditsPress = () => {
    console.log('Navigate to developer credits');
    // router.push('/settings/developers');
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          signOut.mutate(undefined, {
            onError: (error) => {
              Alert.alert('Error', error.message);
            },
          });
        },
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      {/* Settings Sections */}
      {settingsSections.map((section) => (
        <SettingSection key={section.id} section={section} onItemPress={handleItemPress} />
      ))}

      {/* External Services */}
      <ExternalServicesSection services={externalServices} onServicePress={handleServicePress} />

      {/* Developer Credits */}
      <DeveloperCredits onPress={handleDeveloperCreditsPress} />

      {/* Sign Out Button */}
      <TouchableOpacity
        onPress={handleSignOut}
        className="mb-2 mt-4"
        activeOpacity={0.7}
        disabled={signOut.isPending}>
        <Text className="py-4 text-center text-lg font-semibold text-blue-600">
          {signOut.isPending ? 'Signing Out...' : 'Log Out'}
        </Text>
      </TouchableOpacity>

      {/* Version Info */}
      <Text className="mt-2 text-center text-xs text-gray-400">Version 1.0.0 (Build 100)</Text>
    </ScrollView>
  );
};

export default SettingsScreen;
