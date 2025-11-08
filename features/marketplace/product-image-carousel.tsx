import { useState } from 'react';
import { View, ScrollView, Image, Dimensions, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');

export const ProductImageCarousel = ({ images }: { images: ImageSourcePropType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeIndex) setActiveIndex(slide);
  };

  return (
    <View className="bg-gray-100" style={{ width, height: width }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={{
              width,
              height: width,
              borderRadius: 0,
            }}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View className="absolute bottom-2 flex-row self-center">
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: index === activeIndex ? '#FF8C42' : 'rgba(255,140,66,0.3)',
            }}
          />
        ))}
      </View>
    </View>
  );
};
