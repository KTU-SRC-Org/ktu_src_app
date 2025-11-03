import { View, Pressable, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { blurhash } from '@/constants';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderSectionProps {
  image: string;
}

const HeaderSection = ({ image }: HeaderSectionProps) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View className="relative w-full" style={{ height: windowHeight / 2 }}>
      <Image
        source={image}
        style={{
          flex: 1,
          width: '100%',
        }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={800}
      />

      {/* Gradient overlay */}
      <View
        className="absolute top-0 h-32 w-full"
        style={{
          backgroundColor: 'transparent',
          experimental_backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
        }}
      />

      <View
        className="absolute inset-x-7 z-50"
        style={{
          top: Platform.OS === 'ios' ? 70 : 20,
        }}>
        <View className="flex w-full flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="flex size-11 flex-row items-center justify-center rounded-full bg-white">
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>

          <View className="flex flex-row items-center gap-3">
            <Pressable className="size-11 items-center justify-center rounded-full bg-white">
              <Ionicons name="heart-outline" size={24} color="#191D31" />
            </Pressable>
            <Pressable className="size-11 items-center justify-center rounded-full bg-white">
              <Ionicons name="share-outline" size={24} color="#191D31" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderSection;
