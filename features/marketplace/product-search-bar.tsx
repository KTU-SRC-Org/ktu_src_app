import React from 'react';
import { View, TextInput, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { clsx } from 'clsx';

interface ProductSearchBarProps extends TouchableOpacityProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  editable?: boolean;
}

const ProductSearchBar = ({
  placeholder = 'Search product...',
  value,
  onChangeText,
  onPress,
  onFilterPress,
  editable = false,
  className,
  ...props
}: ProductSearchBarProps) => {
  const handleClear = () => {
    if (onChangeText) onChangeText('');
  };

  return (
    <View
      className={clsx('flex-row items-center rounded-xl bg-[#F5F5F5] px-4 py-3', className)}
      {...props}>
      <Ionicons name="search-outline" size={20} color="#999" style={{ marginTop: 2 }} />

      {editable ? (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          className="ml-2 flex-1 pb-0 text-[15px] leading-[20px] text-gray-700"
          style={{
            paddingVertical: 0,
          }}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} className="ml-2 flex-1">
          <Text className="text-base text-gray-500">{placeholder}</Text>
        </TouchableOpacity>
      )}

      {editable && value && value.length > 0 && (
        <TouchableOpacity onPress={handleClear} className="ml-1">
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}

      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} className="ml-2">
          <Ionicons name="options-outline" size={20} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductSearchBar;
