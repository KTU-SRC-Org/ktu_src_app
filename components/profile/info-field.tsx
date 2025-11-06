import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InfoFieldProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor?: string;
};

export const InfoField = ({ 
  icon, 
  label, 
  value, 
  iconColor = '#6366F1' 
}: InfoFieldProps) => {
  return (
    <View className="flex-row items-start py-4">
      <View 
        className="items-center justify-center w-10 h-10 mr-3 rounded-full"
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      
      <View className="flex-1">
        <Text className="mb-1 text-xs font-medium text-gray-500 uppercase">
          {label}
        </Text>
        <Text className="text-base text-gray-900">
          {value || '—'}
        </Text>
      </View>
    </View>
  );
};