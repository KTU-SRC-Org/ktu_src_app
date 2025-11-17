import React from 'react';
import { View, Text } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';

interface Props {
  id: string;
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

const TabsTopNav = ({ id, title, leftContent, rightContent, children }: Props) => {
  return (
    <View key={id} className="z-50 bg-white py-1">
      <View className="relative min-h-[48px] flex-row items-center justify-between px-4">
        <View className="items-start">{leftContent || <DrawerToggleButton />}</View>

        {title && (
          <View className="absolute inset-0 items-center justify-center">
            <Text className="text-lg font-semibold">{title}</Text>
          </View>
        )}

        <View className="items-end">{rightContent || <View />}</View>
      </View>

      {children && <View className={'px-4'}>{children}</View>}
    </View>
  );
};

export default TabsTopNav;
