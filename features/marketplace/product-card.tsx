import {Dimensions, Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const { width } = Dimensions.get('window');

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  rating: number;
}

const ProductCard = ({id, name, price, image, rating}: ProductCardProps) => {
  const router = useRouter();

  return(
    <TouchableOpacity
      key={id}
      className="bg-[#F8F8F8] rounded-xl"
      style={{ width: (width - 52) / 2 }}
      onPress={() =>
        router.push({
          pathname: "/market-place-screen/product/[id]",
          params: { id: id },
        })
      }
    >
      <Image
        source={image}
        className="w-full h-[140px] rounded-t-xl"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="text-sm font-semibold mb-1" numberOfLines={1}>
          {name}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-[#FF8C42] font-bold text-base">
            ₵{price}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="text-xs font-medium text-gray-500">
              {rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard