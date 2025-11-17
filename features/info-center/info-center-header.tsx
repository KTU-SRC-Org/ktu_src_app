import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const InfoCenterHeader = ({ title }: { title?: string }) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center border-b border-neutral-200 bg-white p-2">
      <Pressable onPress={() => router.back()} className="mr-2 rounded-full p-2 active:opacity-70">
        <Ionicons name="chevron-back" color={'#000'} size={24} />
      </Pressable>
      {title && <Text className="flex-1 text-lg font-semibold text-black">{title}</Text>}
    </View>
  );
};
export default InfoCenterHeader;
