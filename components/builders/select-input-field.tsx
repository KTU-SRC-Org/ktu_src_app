import React, { useState } from 'react';
import {View, Text, LayoutChangeEvent, TextInput} from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  NativeSelectScrollView,
} from '@/components/ui/select';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  nextRef?: React.RefObject<TextInput | null>;
}

export function SelectInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  disabled,
  nextRef
}: SelectInputFieldProps<T>) {
  const [width, setWidth] = useState(0);

  const getLabel = (value: string) => options.find((o) => o.value === value)?.label || '';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="w-full">
          <Label className="mb-1 font-semibold text-gray-900">{label}</Label>

          <View onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}>
            <Select
              value={value ? { label: getLabel(value), value } : undefined}
              onValueChange={(val) => {
                const realVal = typeof val === 'object' ? val.value : val;
                onChange(realVal);
                if (nextRef?.current) nextRef.current.focus();
              }}
              disabled={disabled}>
              <SelectTrigger className="w-full rounded-md border border-gray-300">
                <SelectValue placeholder={placeholder ?? 'Select'} />
              </SelectTrigger>
              <SelectContent style={{ width: width || '100%' }}>
                <NativeSelectScrollView>
                  {options.map((o) => (
                    <SelectItem key={o.value} value={o.value} label={o.label}>
                      {o.label}
                    </SelectItem>
                  ))}
                </NativeSelectScrollView>
              </SelectContent>
            </Select>
          </View>

          {error &&
            <Text className="mt-1 text-sm text-red-500">
            {error.message}
          </Text>
          }
        </View>
      )}
    />
  );
}
