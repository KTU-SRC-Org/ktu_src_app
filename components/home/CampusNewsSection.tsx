import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from '@/components/ui/text';
import { NewsItemCard } from '../cards/NewsItemCard';
import { infoData } from '@/features/info-center';
import { useRouter } from 'expo-router';

export interface NewsItemData {
  id: string;
  title: string;
  description: string;
  readMoreLink?: string;
}

export function CampusNewsSection() {
  const router = useRouter();

  const handleReadMore = (newsId: string) => {
    router.push({
      pathname: '/info-center/info/[id]',
      params: { id: newsId },
    });
  };

  const handleViewAll = () => {
    router.push({
      pathname: '/info-center',
      params: { type: 'announcements' },
    });
  };

  return (
    <View className="mb-10 px-2">
      <View className="w-full overflow-hidden rounded-3xl bg-[#CD8606]">
        {/* Header Image Section */}
        <AspectRatio ratio={16 / 10} className="relative w-full overflow-hidden">
          <Image
            source={require('@/assets/images/Campus-1.png')}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={300}
          />

          {/* Overlay Text */}
          {/* <View className="absolute inset-0 flex items-center justify-center px-4">
          <View className="items-end w-full pr-8">
            <Text className="text-4xl font-bold leading-tight text-white">
              Campus
            </Text>
            <View className="flex flex-row items-baseline">
              <Text className="text-[#B8860B] font-bold text-4xl">News</Text>
              <Text className="ml-1 text-2xl font-bold text-white">&</Text>
            </View>
            <Text 
              className="text-4xl font-bold leading-tight"
              style={{
                color: '#fff',
                textShadowColor: '#FF69B4',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 0,
              }}
            >
              Updates
            </Text>
          </View>
        </View> */}

          {/* View All Button */}
          <TouchableOpacity onPress={handleViewAll} className="absolute bottom-3 right-4">
            <Text className="text-sm font-semibold text-[#974E17]">View All</Text>
          </TouchableOpacity>
        </AspectRatio>

        {/* News Items List */}
        <View className="p-4">
          {infoData
            .filter((item) => (item.type = 'announcement'))
            .slice(0, 3)
            .map((item) => (
              <NewsItemCard
                id={item.id}
                key={item.id}
                title={item.title}
                description={item.message}
                onReadMore={() => handleReadMore(item.id)}
              />
            ))}
        </View>
      </View>
    </View>
  );
}
