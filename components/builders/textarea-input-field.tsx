import React from 'react';
import {View, Text, TextInput} from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {Textarea} from "@/components/ui/textarea";

interface TextareaInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  nextRef?: React.RefObject<TextInput | null>;
}

export function TextareaInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  nextRef
}: TextareaInputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="w-full">
          <Label className="mb-1 font-semibold text-gray-900">{label}</Label>

          <Textarea
            textAlignVertical="top"
            className="h-20"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ?? ''}
            placeholder={placeholder}
            editable={!disabled}
            returnKeyType={nextRef ? 'next' : 'done'}
            onSubmitEditing={() => nextRef?.current?.focus()}
            ref={nextRef}
          />

          {error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}
