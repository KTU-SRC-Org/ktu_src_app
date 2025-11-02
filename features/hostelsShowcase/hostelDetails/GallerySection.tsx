import { View, FlatList, Text, Image } from 'react-native';

interface GalleryProps {
  gallery: {
    id: string;
    image: string;
  }[];
}

const GallerySection = ({ gallery }: GalleryProps) => {
  return (
    <View className="mt-7">
      <Text className="text-xl font-bold text-gray-800">Gallery</Text>
      <FlatList
        contentContainerStyle={{ paddingRight: 20 }}
        data={gallery}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (     
                  <Image
                    source={{uri: item.image }}
                   className="mr-4 size-40 rounded-xl"
                  />
        )}
        style={{ marginTop: 12 }}
      />
    </View>
  );
};

export default GallerySection;
