import { Text, View } from 'react-native';
import { BackButton } from '@/components/shared/back-button';

const BackNavigationHeader = ({ title, itemCount }: { title: string; itemCount?: number }) => {
  return (
    <View className="relative flex-row items-center justify-center bg-white px-6 py-4">
      <View className="absolute left-2">
        <BackButton />
      </View>

      <View className="flex-col">
        <Text className="text-center text-lg font-bold text-black">
        {title}  
      </Text>
      {itemCount !== undefined && itemCount > 0 && (
          <Text className="text-black font-normal text-xs -mt-1">{` ${itemCount} items`}</Text>
        )}
      </View>
    </View>
  );
};

export default BackNavigationHeader;
