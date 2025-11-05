import React from 'react';
import { View, Text } from 'react-native';
import { SettingItem } from './setting-item';
import { SectionSeparator } from '@/components/shared/section-seperator';
import {
  SettingSection as SettingSectionType,
  SettingItem as SettingItemType,
} from '@/types/settings.types';

type SettingSectionProps = {
  section: SettingSectionType;
  onItemPress: (item: SettingItemType) => void;
};

export const SettingSection = ({ section, onItemPress }: SettingSectionProps) => {
  return (
    <View className="mx-4 mt-5 bg-white rounded-xl">
      {section.title && (
        <Text className="px-4 pt-3 pb-1 text-sm font-semibold text-gray-500">{section.title}</Text>
      )}

      {section.items.map((item, index) => (
        <React.Fragment key={item.id}>
          <SettingItem item={item} onPress={() => onItemPress(item)} />
          {index < section.items.length - 1 && <SectionSeparator />}
        </React.Fragment>
      ))}
    </View>
  );
};
