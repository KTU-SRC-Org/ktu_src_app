import { router, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  FlatList
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@/components/cards/hostels-showcase/Card';
import { blurhash } from '@/contants';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

// Dummy hostels data
const dummyHostels = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
    rating: 4.8,
    name: 'Trap House/Doe Heights',
    address: 'Dome, Accra',
    price: 25,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    rating: 4.5,
    name: 'Sunrise Hostel',
    address: 'Madina, Accra',
    price: 30,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
    rating: 4.7,
    name: 'Urban Stay',
    address: 'Legon, Accra',
    price: 28,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    rating: 4.6,
    name: 'Campus Lodge',
    address: 'East Legon, Accra',
    price: 35,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
    rating: 4.9,
    name: 'Student Haven',
    address: 'Ashongman, Accra',
    price: 22,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    rating: 4.4,
    name: 'Modern Living',
    address: 'Spintex, Accra',
    price: 32,
  },
];

interface Property {
  id: string;
  image: string;
  rating: number;
  name: string;
  address: string;
  price: number;
}

const AllHostelsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<1 | 2>(2);

  const handleCardPress = (id: string) => router.push(`/hostels/${id}`);

  const filteredHostels = dummyHostels.filter((hostel) =>
    hostel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const renderItem = ({ item }: { item: Property }) => (
    <Card item={item} onPress={() => handleCardPress(item.id)} />
  );

  const renderListHeader = () => (
    <>
      {/* Hero Image with "Go Back" button */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/hostels-showcase/House-For-Rent1.png')}
          style={styles.image}
          placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        />
        
        {/* Overlay gradient */}
        <View style={styles.overlay} />
        
        {/* Go Back Button */}
          <View
            className="absolute z-50 inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center justify-between w-full">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row items-center justify-center bg-white rounded-full size-11"
              >
                <Ionicons name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity className="items-center justify-center bg-white rounded-full size-11">
                  <Ionicons name="heart-outline" size={24} color="#191D31" />
                </TouchableOpacity>
                <TouchableOpacity className="items-center justify-center bg-white rounded-full size-11">
                  <Ionicons name="share-outline" size={24} color="#191D31" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hostels..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Section Header with View Toggle */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All available hostels</Text>
        <TouchableOpacity 
          onPress={() => setViewMode(viewMode === 2 ? 1 : 2)}
          style={styles.viewToggle}
        >
          <Ionicons 
            name={viewMode === 2 ? 'grid-outline' : 'list-outline'} 
            size={24} 
            color="#000" 
          />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={viewMode}
        data={filteredHostels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode}
        ListHeaderComponent={renderListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === 1 ? undefined : {gap: 5 , paddingHorizontal: 10}}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No hostels found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: IMG_HEIGHT,
    width: width,
    position: 'relative',
    backgroundColor: '#14B8A6',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  goBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  titleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: '50%',
    transform: [{ translateY: -60 }],
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  viewToggle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

export default AllHostelsScreen;