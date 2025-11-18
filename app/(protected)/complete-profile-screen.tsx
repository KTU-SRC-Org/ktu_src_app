import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CompleteProfileForm from '@/features/onboarding/complete-profile-form';
import { CompleteProfileFormType } from '@/lib/schemas/onboarding';
import { useUpdateProfile } from '@/hooks/onboarding/use-update-profile';

import { Toast } from 'toastify-react-native'

const CompleteProfileScreen = () => {
  const { mutate: updateProfile, isPending: isSubmitting } = useUpdateProfile();

  const handleSubmit = async (data: CompleteProfileFormType) => {
    try {
      updateProfile(data, {
        onError: (error) => {
          console.log('Profile update error:', error)
          Toast.error('Failed to update profile. Please try again.');
        },
      });
      // router.replace('./(drawer)/(tabs)');
    } catch (error) {
      console.error('Profile update error:', error);
      Toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <CompleteProfileForm onSubmitPress={handleSubmit} isSubmitting={isSubmitting} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default CompleteProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
});
