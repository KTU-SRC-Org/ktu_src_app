import type { Key } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { X } from 'lucide-react-native';
import { Label } from '@/components/ui/label';

interface ImageFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

export function ImageField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: ImageFieldProps<T>) {
  const pickImage = async (onChange: (v: any) => void, existing: string[]) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.7,
    });
    if (!res.canceled) {
      const uris = res.assets.map((a) => a.uri);
      onChange([...(existing || []), ...uris]);
    }
  };

  const removeImage = (i: Key | null | undefined, onChange: (v: any) => void, v: string[]) =>
    onChange(v.filter((_, idx) => idx !== i));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="w-full">
          <Label className="mb-1 font-semibold text-gray-900">{label}</Label>

          <Pressable
            onPress={() => pickImage(onChange, value || [])}
            disabled={disabled}
            className="flex items-center justify-center rounded-lg border border-dashed border-gray-400 p-4">
            <Text className="text-gray-600">
              {Array.isArray(value) && value.length > 0
                ? 'Add more images'
                : 'Tap to upload image(s)'}
            </Text>
          </Pressable>

          {Array.isArray(value) && value.length > 0 && (
            <View className="mt-3 flex-row flex-wrap gap-3">
              {value.map((uri: string, index: Key | null | undefined) => (
                <View key={index} className="relative">
                  <Image source={{ uri }} className="h-20 w-20 rounded-md" />
                  <Pressable
                    onPress={() => removeImage(index, onChange, value)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1">
                    <X size={14} color="white" />
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          {error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}
