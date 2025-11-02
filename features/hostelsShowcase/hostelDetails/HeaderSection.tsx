import { View, Pressable, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { blurhash } from '@/contants';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


interface HeaderSectionProps {
 image: string;
}

const HeaderSection = ({image}: HeaderSectionProps) => {

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
            className="absolute top-0 w-full h-32"
            style={{
              backgroundColor: 'transparent',
              experimental_backgroundImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            }}
          />

          <View
            className="absolute z-50 inset-x-7"
            style={{
              top: Platform.OS === 'ios' ? 70 : 20,
            }}>
            <View className="flex flex-row items-center justify-between w-full">
              <Pressable
                onPress={() => router.back()}
                className="flex flex-row items-center justify-center bg-white rounded-full size-11">
                <Ionicons name="chevron-back" size={24} color="#000" />
              </Pressable>

              <View className="flex flex-row items-center gap-3">
                <Pressable className="items-center justify-center bg-white rounded-full size-11">
                  <Ionicons name="heart-outline" size={24} color="#191D31" />
                </Pressable>
                <Pressable className="items-center justify-center bg-white rounded-full size-11">
                  <Ionicons name="share-outline" size={24} color="#191D31" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
    );
}


export default HeaderSection;
