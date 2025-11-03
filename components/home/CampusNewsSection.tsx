import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from '@/components/ui/text';
import { NewsItemCard } from '../cards/NewsItemCard';

export interface NewsItemData {
  id: string;
  title: string;
  description: string;
  readMoreLink?: string;
}

const dummyNewsItems: NewsItemData[] = [
  {
    id: '1',
    title: 'SRC Secures 20% Student Discount at XYZ Bookstore',
    description:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has...',
  },
  {
    id: '2',
    title: 'SRC Secures 20% Student Discount at XYZ Bookstore',
    description:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has...',
  },
  {
    id: '3',
    title: 'SRC Secures 20% Student Discount at XYZ Bookstore',
    description:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has...',
  },
];

export function CampusNewsSection() {
  const handleReadMore = (newsId: string) => {
    console.log(`Read more pressed for news item: ${newsId}`);
  };

  const handleViewAll = () => {
    console.log('View All pressed');
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
          {dummyNewsItems.map((item) => (
            <NewsItemCard key={item.id} {...item} onReadMore={() => handleReadMore(item.id)} />
          ))}
        </View>
      </View>
    </View>
  );
}
