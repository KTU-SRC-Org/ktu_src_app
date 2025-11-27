import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputField } from '@/components/builders/text-input-field';
import {Control, FieldValues, Path} from "react-hook-form";

interface VerifiedInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'phone' | 'list';
  nextRef?: any;
  disabled?: boolean;
  showVerified?: boolean;
  verifiedText?: string;
}

export function VerifiedInput<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  nextRef,
  showVerified = false,
  disabled = true,
  verifiedText = 'Verified',
}: VerifiedInputProps<T>){
  return (
    <View className="flex-col gap-2">
      <TextInputField
        control={control}
        name={name}
        label={label}
        type={type}
        disabled={disabled}
        nextRef={nextRef}
      />

      {showVerified && (
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="verified" size={20} color="#22C55E" />
          <Text className="text-green-500">{verifiedText}</Text>
        </View>
      )}
    </View>
  );
};
