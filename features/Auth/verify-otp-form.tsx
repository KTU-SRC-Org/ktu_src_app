import { Keyboard, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import OTPInput from '@/components/builders/otp-input';
import { AuthButton } from '@/components/shared/auth-button';
import React, { useEffect, useState } from 'react';
import { OTPFormType, OTPSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useVerifyOtp } from '@/hooks/auth/use-verify-otp';
import { useResendOtp } from '@/hooks/auth/use-resend-otp';

const VerifyOtpForm = () => {
  const { email } = useLocalSearchParams();
  const [timer, setTimer] = useState(180); // 3 minutes

  // Supabase OTP mutation
  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const form = useForm<OTPFormType>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otpCode: '' },
  });

  // Handle Supabase OTP Verification
  const handleSubmitOTP = async (data: OTPFormType) => {
    try {
      Keyboard.dismiss();

      await verifyOtp.mutateAsync({
        email: email as string,
        token: data.otpCode,
        type: 'email', // important
      });

      //router.push('/(protected)/complete-profile-screen');
    } catch (err: any) {
      form.setError('otpCode', {
        message: err?.message || 'OTP verification failed',
      });
    }
  };

  const handleOtpResend = async () => {
    try {
      await resendOtp.mutateAsync(email as string);

      // reset timer + form
      setTimer(180);
      form.reset({ otpCode: '' });
    } catch (err: any) {
      form.setError('otpCode', {
        message: err.message || 'Failed to resend code',
      });
    }
  };

  return (
    <View className="flex flex-col items-center justify-center gap-12 pt-16">
      <View className="w-full items-center">
        <Text className="text-center text-2xl font-bold text-white">Check your email.</Text>
        <Text className="mt-1 text-center text-base text-white">
          We’ve sent the code to {email}
        </Text>
      </View>

      <Controller
        control={form.control}
        name="otpCode"
        render={({ field, fieldState }) => (
          <OTPInput
            length={6}
            value={(field.value ?? '').split('')}
            setValue={(val) => field.onChange(val.join(''))}
            isValid={fieldState.error ? false : field.value.length === 6 ? true : null}
          />
        )}
      />

      <View className="flex w-full flex-col items-center gap-4">
        {form.formState.errors.otpCode ? (
          <Text className="mt-2 text-center text-[#FF4D4D]">
            {form.formState.errors.otpCode.message}
          </Text>
        ) : (
          <Text className={`mt-2 text-center ${timer < 10 ? 'text-red-500' : 'text-white'}`}>
            Code expires in {formatTime(timer)}
          </Text>
        )}

        <AuthButton
          title="Verify"
          onPress={form.handleSubmit(handleSubmitOTP)}
          loading={verifyOtp.isPending}
          disabled={!form.formState.isValid || timer === 0 || verifyOtp.isPending}
        />

        <AuthButton
          title="Send again"
          variant="outline"
          onPress={handleOtpResend}
          loading={resendOtp.isPending}
          disabled={timer > 0 || resendOtp.isPending}
        />
      </View>
    </View>
  );
};

export default VerifyOtpForm;
