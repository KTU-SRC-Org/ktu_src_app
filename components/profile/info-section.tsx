import { View, Text } from 'react-native';

type InfoSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <View className="px-6 mb-6">
      <Text className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase">
        {title}
      </Text>
      <View className="bg-white shadow-sm rounded-2xl">
        {children}
      </View>
    </View>
  );
};