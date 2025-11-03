import { Text, View } from 'react-native';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm, Controller } from 'react-hook-form';
import { SigninSchema, SigninFormType } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthButton } from '@/components/shared/auth-button';
import React from 'react';

export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SigninFormType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: SigninFormType) => console.log(data);

  return (
    <View>
      <View className="mb-10">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-5">
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
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
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
              {errors.password?.message && (
                <Text className="text-rose-500">{errors.password.message}</Text>
              )}
            </View>
          )}
          name="password"
        />
      </View>

      <View>
        <AuthButton
          title="Sign in"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          className="rounded-sm p-0 py-2"
        />
      </View>
    </View>
  );
}
