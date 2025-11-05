import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BoxedIcon } from '@/components/shared/boxed-icon';
import { SettingItem as SettingItemType } from '@/types/settings.types';

type SettingItemProps = {
  item: SettingItemType;
  onPress: () => void;
};

export const SettingItem = ({ item, onPress }: SettingItemProps) => {
  const isDisabled = item.disabled || item.comingSoon;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center p-3 ${isDisabled ? 'opacity-50' : ''}`}
      activeOpacity={0.7}>
      <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

      <View className="flex-row items-center flex-1 ml-3">
        <Text className="flex-1 text-lg">{item.name}</Text>

        {item.comingSoon && (
          <View className="px-2 py-1 mr-2 bg-yellow-100 rounded">
            <Text className="text-xs font-semibold text-yellow-700">Coming Soon</Text>
          </View>
        )}

        {!isDisabled && <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );
};
