import { Image, Text, Pressable, View } from "react-native";
import { Star } from "lucide-react-native";

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

export const Card = ({ item, onPress }: Props) => {
  return (
    <Pressable
      className="relative flex-1 w-full px-3 py-4 mt-4 bg-white rounded-lg shadow-lg shadow-black-100/70"
      onPress={onPress}
    >
      <View className="absolute z-50 flex flex-row items-center p-1 px-2 rounded-full top-5 right-5 bg-white/90">
        {/* <Image source={icons.star} className="size-2.5" /> */}
        <Star size={15} fill={'#f9e406'} color='#f9e406' />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>

      <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          {item.name}
        </Text>
        <Text className="text-xs font-rubik text-black-100">
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${item.price}
          </Text>
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