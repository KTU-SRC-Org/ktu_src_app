import { Image, Text, Pressable, View } from 'react-native';
import { Star } from 'lucide-react-native';
import type { HostelCard } from '@/hooks/hostel/use-hostel';

interface Props {
  item: HostelCard;
  onPress?: () => void;
}

export const Card = ({ item, onPress }: Props) => {
  return (
    <Pressable
      className="shadow-black-100/70 relative mt-4 w-full flex-1 rounded-lg bg-white px-3 py-4 shadow-lg"
      onPress={onPress}>
      <View className="absolute right-5 top-5 z-50 flex flex-row items-center rounded-full bg-white/90 p-1 px-2">
        {/* <Image source={icons.star} className="size-2.5" /> */}
        <Star size={15} fill={'#f9e406'} color="#f9e406" />
        <Text className="font-rubik-bold text-primary-300 ml-0.5 text-xs">{item.rating}</Text>
      </View>

      <Image
        source={{
          uri: item.image ?? 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
        }}
        className="h-40 w-full rounded-lg"
      />

      <View className="mt-2 flex flex-col">
        <Text className="font-rubik-bold text-black-300 text-base">{item.name}</Text>
        <Text className="font-rubik text-black-100 text-xs">{item.address}</Text>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Text className="font-rubik-bold text-primary-300 text-base">${item.price}</Text>
          {/* <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          /> */}
        </View>
      </View>
    </Pressable>
  );
};
