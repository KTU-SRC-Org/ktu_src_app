import { useState, useCallback } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';

import { RepresentativeCard } from '@/components/cards/RepresentativeCard';

const window = Dimensions.get('window');
const scale = 0.9;
const PAGE_HEIGHT = 220 * scale;

interface RepresentativeData {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
}

// Dummy data for testing
const dummyRepresentatives: RepresentativeData[] = [
  {
    id: '1',
    name: 'STACY BENSON',
    position: 'S.R.C President',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'JAMES WILSON',
    position: 'Vice President',
    description:
      'Dedicated to serving the student community with integrity and passion. Working together to create positive change and meaningful experiences for all students on campus.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'SARAH JOHNSON',
    position: 'General Secretary',
    description:
      'Committed to transparency and effective communication. Ensuring that every student voice is heard and represented in our decision-making processes.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'MICHAEL CHEN',
    position: 'Financial Secretary',
    description:
      'Managing student funds with accountability and precision. Dedicated to ensuring financial transparency and responsible resource allocation for student programs.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'EMMA DAVIS',
    position: 'Organizing Secretary',
    description:
      'Bringing creativity and organization to every student event. Passionate about creating memorable experiences that bring our campus community together.',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
  },
];

// Pagination Indicator Component
function PaginationIndicator({ total, current }: { total: number; current: number }) {
  return (
    <View className="mt-2 flex flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full transition-all ${
            index === current ? 'w-8 bg-gray-600' : 'w-2 bg-gray-400'
          }`}
        />
      ))}
    </View>
  );
}

// Representative Carousel Component
export function RepresentativeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    'worklet';

    const opacity = interpolate(value, [-1, 0, 1], [0, 1, 0]);
    const scale = interpolate(value, [-1, 0, 1], [0.85, 1, 0.85]);

    return {
      transform: [{ scale }],
      opacity,
    };
  }, []);

  return (
    <View className="w-full ">
      <Text className="mb-1 px-4 text-[16px] font-medium">Know your representatives</Text>
      <Carousel
        loop={false}
        autoPlay={true}
        autoPlayInterval={4000}
        style={{
          width: window.width,
          height: PAGE_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        width={window.width}
        height={PAGE_HEIGHT}
        data={dummyRepresentatives}
        renderItem={({ item }) => <RepresentativeCard {...item} />}
        customAnimation={animationStyle}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />

      <PaginationIndicator total={dummyRepresentatives.length} current={currentIndex} />
    </View>
  );
}

export default RepresentativeCarousel;
