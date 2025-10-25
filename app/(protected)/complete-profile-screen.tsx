import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CompleteProfileForm from '@/features/onboarding/complete-profile-form';
import { CompleteProfileFormType } from '@/lib/schemas/onboarding';

const CompleteProfileScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CompleteProfileFormType) => {
    setIsSubmitting(true);
    try {
      console.log('Profile Data:', data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <CompleteProfileForm
          onSubmitPress={handleSubmit}
          isSubmitting={isSubmitting}
        />
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