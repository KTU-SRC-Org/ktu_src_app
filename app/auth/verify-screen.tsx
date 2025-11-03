import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BackButton } from '@/components/shared/back-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import VerifyOtpForm from '@/features/Auth/verify-otp-form';

const VerifyScreen = () => {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#043270]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="px-8 pt-16">
          <BackButton />
          <VerifyOtpForm />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default VerifyScreen;
