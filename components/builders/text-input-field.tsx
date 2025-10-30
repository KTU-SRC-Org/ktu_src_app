import React from 'react';
import {View, Text, TextInputProps, TextInput} from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'phone' | 'list';
  disabled?: boolean;
  nextRef?: React.RefObject<TextInput | null>;
}

export function TextInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
  nextRef,
}: TextInputFieldProps<T>) {
  const getInputProps = (): Partial<TextInputProps> => {
    switch (type) {
      case 'email':
        return {
          keyboardType: 'email-address',
          textContentType: 'emailAddress',
          autoCapitalize: 'none',
        };
      case 'password':
        return {
          secureTextEntry: true,
          textContentType: 'password',
          autoCapitalize: 'none',
        };
      case 'number':
        return {
          keyboardType: 'numeric',
        };
      case 'phone':
        return {
          keyboardType: 'phone-pad',
          textContentType: 'telephoneNumber',
        };
      default:
        return {};
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="w-full">
          <Label className="mb-1 font-semibold text-gray-900">{label}</Label>

          <Input
            onBlur={onBlur}
            onChangeText={(text) => {
              if (type === 'number') {
                const parsed = Number(text);
                onChange(isNaN(parsed) ? undefined : parsed);
              } else if (type === 'list') {
                const arr = text
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean);
                onChange(arr);
              } else {
                onChange(text);
              }
            }}
            value={Array.isArray(value) ? value.join(', ') : value !== undefined ? String(value) : ''}
            placeholder={placeholder}
            editable={!disabled}
            returnKeyType={nextRef ? 'next' : 'done'}
            onSubmitEditing={() => nextRef?.current?.focus()}
            ref={nextRef}
            {...getInputProps()}
          />

          {error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}
