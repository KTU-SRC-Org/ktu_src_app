import { Text, View } from 'react-native';
import { BackButton } from '@/components/shared/back-button';

const BackNavigationHeader = ({ title, itemCount }: { title: string; itemCount?: number }) => {
  return (
    <View className="relative flex-row items-center justify-center bg-white px-6 py-4">
      <View className="absolute left-2">
        <BackButton />
      </View>

      <Text className="text-center text-lg font-bold capitalize text-black">
        {title}
        {itemCount !== undefined && itemCount > 0 && (
          <Text className="text-black">{` [${itemCount}]`}</Text>
        )}
      </Text>
    </View>
  );
};

export default BackNavigationHeader;
