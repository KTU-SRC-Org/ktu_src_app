import React from 'react';
import { Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthButton } from '@/components/shared/auth-button';

import { SigninSchema, SigninFormType } from '@/lib/schemas/auth';
import { useSignInWithEmailPassword } from '@/hooks/auth/use-signin-with-email-password';

export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 🟢 Initialize mutation
  const { mutateAsync: signIn, isPending, error } = useSignInWithEmailPassword();

  // 🟢 Handle sign-in
  const onSubmit = async (data: SigninFormType) => {
    try {
      await signIn(data);
      // Example:
      // router.replace("/(app)/home");
    } catch (err) {
      console.log('Sign in failed:', err);
    }
  };

  return (
    <View>
      <View className="mb-10">
        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-5">
              <Label className="mb-2">Institution Email</Label>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="example234d@ktu.edu.gh"
              />
              {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
            </View>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Label className="mb-2">Password</Label>
              <Input
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            </View>
          )}
        />
      </View>

      {/* Backend Error */}
      {error && <Text className="mb-4 text-red-500">{error.message || 'Failed to sign in.'}</Text>}

      {/* Submit */}
      <AuthButton
        title="Sign in"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        disabled={!isValid || isPending}
        className="rounded-sm p-0 py-2"
      />
    </View>
  );
}
