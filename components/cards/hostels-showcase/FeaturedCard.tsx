import images from "@/contants/images";
import { Image, Text, Pressable, View } from "react-native";
import { Star } from "lucide-react-native";


interface Props {
  item: {
    id: string,
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
    <Pressable
      onPress={onPress}
      className="relative flex flex-col items-start w-60 h-72"
    >
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />

      <Image
        source={images.cardGradient}
        className="absolute bottom-0 size-full rounded-2xl"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        {/* <Image source={icons.star} className="size-3.5" /> */}
        <Star size={15} fill={'#f9e406'} color='#f9e406' />
        <Text className="ml-1 text-xs font-rubik-bold text-primary-300">
          {item.rating}
        </Text>
      </View>

      <View className="absolute flex flex-col items-start bottom-5 inset-x-5">
        <Text
          className="text-xl text-white font-rubik-extrabold"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-base text-white font-rubik" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl text-white font-rubik-extrabold">
            ${item.price}
          </Text>
          {/* <Image source={icons.heart} className="size-5" /> */}
        </View>
      </View>
    </Pressable>
  );
};