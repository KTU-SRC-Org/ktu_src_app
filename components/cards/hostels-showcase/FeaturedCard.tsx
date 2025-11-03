import images from '@/constants/images';
import { Image, Text, Pressable, View } from 'react-native';
import { Star } from 'lucide-react-native';

interface Props {
  item: {
    id: string;
    image: string;
    rating: number;
    name: string;
    address: string;
    price: number;
  };
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} className="relative flex h-72 w-60 flex-col items-start">
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />

      <Image source={images.cardGradient} className="absolute bottom-0 size-full rounded-2xl" />

      <View className="absolute right-5 top-5 flex flex-row items-center rounded-full bg-white/90 px-3 py-1.5">
        {/* <Image source={icons.star} className="size-3.5" /> */}
        <Star size={15} fill={'#f9e406'} color="#f9e406" />
        <Text className="font-rubik-bold text-primary-300 ml-1 text-xs">{item.rating}</Text>
      </View>

      <View className="absolute inset-x-5 bottom-5 flex flex-col items-start">
        <Text className="font-rubik-extrabold text-xl text-white" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="font-rubik text-base text-white" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex w-full flex-row items-center justify-between">
          <Text className="font-rubik-extrabold text-xl text-white">${item.price}</Text>
          {/* <Image source={icons.heart} className="size-5" /> */}
        </View>
      </View>
    </Pressable>
  );
};
