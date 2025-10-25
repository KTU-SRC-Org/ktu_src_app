import React, {useState} from 'react';
import {View, Text, TextInputProps, LayoutChangeEvent} from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  NativeSelectScrollView
} from '@/components/ui/select';

type FieldType = 'text' | 'email' | 'password' | 'number' | 'phone' | 'select';

interface SelectOption {
  label: string;
  value: string;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: FieldType;
  disabled?: boolean;
  options?: SelectOption[];
}

function FormField<T extends FieldValues>({
                                            control,
                                            name,
                                            label,
                                            placeholder,
                                            type = 'text',
                                            disabled,
                                            options = [],
                                          }: FormFieldProps<T>) {
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  const getInputProps = (): Partial<TextInputProps> => {
    switch (type) {
      case 'email':
        return {
          keyboardType: 'email-address',
          textContentType: 'emailAddress',
          autoComplete: 'email',
        };
      case 'password':
        return {
          secureTextEntry: true,
          textContentType: 'password',
          autoComplete: 'password',
        };
      case 'number':
        return {
          keyboardType: 'numeric',
        };
      case 'phone':
        return {
          keyboardType: 'phone-pad',
          textContentType: 'telephoneNumber',
          autoComplete: 'tel',
        };
      default:
        return {};
    }
  };

  const inputProps = getInputProps();

  const handleLayout = (e: LayoutChangeEvent) => {
    setTriggerWidth(e.nativeEvent.layout.width);
  };

  const getSelectedLabel = (value: string) => {
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption?.label || '';
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View>
          <Label className="mb-2">{label}</Label>

          {type === 'select' ? (
            <Select
              value={value ? { label: getSelectedLabel(value), value: value } : undefined}
              onValueChange={(selectedValue) => {
                const actualValue = typeof selectedValue === 'object' && selectedValue?.value
                  ? selectedValue.value
                  : selectedValue;
                onChange(actualValue);
              }}
              disabled={disabled}
            >
              <View onLayout={handleLayout}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder ?? 'Select an option'} />
                </SelectTrigger>
              </View>
              <SelectContent
                style={{
                  width: triggerWidth || '100%',
                  alignSelf: 'center',
                }}
              >
                <NativeSelectScrollView>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} label={opt.label}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </NativeSelectScrollView>
              </SelectContent>
            </Select>
          ) : (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              editable={!disabled}
              {...inputProps}
            />
          )}

          {error && (
            <Text className="mt-1 text-sm text-red-500">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

export { FormField };