import { Text, View, Platform } from 'react-native';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

import { useForm, Controller } from 'react-hook-form';
import { SignupSchema, SignupFormType } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthButton } from '@/components/shared/auth-button';
import { router } from 'expo-router';

import { useSignUpWithEmail } from '@/hooks/auth/use-signup-with-email-password';

// interface SignupFormTypes {
//     email: string,
//     password: string,
//     confirmPassword: string
// }

export default function SignUpForm() {
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const signUp = useSignUpWithEmail({ onError: () => {} });

  function onCheckedChange(checked: boolean) {
    impactAsync(ImpactFeedbackStyle.Light);
    setChecked(checked);
  }

  const onSubmit = async (data: SignupFormType) => {
    console.log(data);

    try {
      const res = await signUp.mutateAsync({
        email: data.email,
        password: data.password,
        // you can pass email redirect if you use magic links verification like:
        // options: { emailRedirectTo: 'myapp://auth/callback' }
      });

      if (signUp.isSuccess || res.user) {
        console.log('navigation')
        // otp code screen
        router.push({
          pathname: '/auth/verify-screen',
          params: {email: data.email}
        });
      } else {
        console.log(signUp.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View className="mb-10">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Label className={'mb-2'}>Institution Email</Label>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                placeholder="example234d@ktu.edu.gh"
              />
            </View>
          )}
          name="email"
        />
        {errors.email && <Text className="text-rose-500">This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className={'mb-4'}>
              <Label className="mb-2">Password</Label>
              <Input
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password?.message && (
                <Text className="text-rose-500">{errors.password.message}</Text>
              )}
            </View>
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Label className="mb-2">Password</Label>
              <Input
                placeholder="Repeat Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.confirmPassword?.message && (
                <Text className="text-rose-500">{errors.confirmPassword.message}</Text>
              )}
            </View>
          )}
          name="confirmPassword"
        />
      </View>

      <View className="flex flex-col items-center">
        <View className="flex-row items-center gap-2 mb-2">
          <Checkbox
            aria-labelledby="terms-checkbox"
            id="terms-checkbox"
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
          <Label
            nativeID="terms-checkbox"
            htmlFor="terms-checkbox"
            onPress={Platform.select({
              native: () => {
                impactAsync(ImpactFeedbackStyle.Light);
                setChecked((prev) => !prev);
              },
            })}>
            Accept terms and conditions
          </Label>
        </View>

        <AuthButton
          title="Sign up"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting || !checked}
          className="p-0 py-2 rounded-sm"
        />
      </View>
    </View>
  );
}
