import { View, Text } from 'react-native';

type InfoSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <View className="mb-6 px-6">
      <Text className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </Text>
      <View className="rounded-2xl bg-white shadow-sm">{children}</View>
    </View>
  );
};
