import { Dimensions, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  rating: number;
  category?: string;
}

const ProductCard = ({ id, name, price, image, rating, category }: ProductCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={id}
      className="rounded-xl bg-[#F8F8F8]"
      style={{ width: (width - 52) / 2 }}
      onPress={() =>
        router.push({
          pathname: '/marketplace/product/[id]',
          params: { id: id, category },
        })
      }>
      <Image source={image} className="h-[140px] w-full rounded-t-xl" resizeMode="cover" />
      <View className="p-2">
        <Text className="mb-1 text-sm font-semibold" numberOfLines={1}>
          {name}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-[#FF8C42]">₵{price}</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="text-xs font-medium text-gray-500">{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
