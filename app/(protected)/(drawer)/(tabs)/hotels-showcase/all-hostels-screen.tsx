// AllHostelsScreen.tsx
import { router, useNavigation } from 'expo-router';
import { useLayoutEffect, useMemo, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/cards/hostels-showcase/Card';
import { blurhash } from '@/constants';
import Search from '@/components/shared/Search';
import { useSearchSync } from '@/hooks/use-search-sync';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

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

const Header = memo(function Header({
  viewMode,
  toggleViewMode,
  query,
  setQuery,
  submitQuery,
}: {
  viewMode: 1 | 2;
  toggleViewMode: () => void;
  query: string;
  setQuery: (t: string) => void;
  submitQuery?: () => void;
}) {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/hostels-showcase/House-For-Rent1.png')}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.overlay} />
        <View className="absolute inset-x-7 z-50" style={{ top: Platform.OS === 'ios' ? 70 : 20 }}>
          <View className="flex w-full flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="flex size-11 flex-row items-center justify-center rounded-full bg-white">
              <Ionicons name="chevron-back" size={24} color="#000" />
            </Pressable>

            <View className="flex flex-row items-center gap-3">
              <Pressable className="size-11 items-center justify-center rounded-full bg-white">
                <Ionicons name="share-outline" size={24} color="#191D31" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <Search value={query} onChangeText={setQuery} onSubmit={submitQuery} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All available hostels</Text>
        <TouchableOpacity onPress={toggleViewMode} style={styles.viewToggle}>
          <Ionicons
            name={viewMode === 2 ? 'grid-outline' : 'list-outline'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </>
  );
});

const AllHostelsScreen = () => {
  const navigation = useNavigation();

  const { search, handleChange, debouncedSearch } = useSearchSync();

  const [viewMode, setViewMode] = useState<1 | 2>(2);
  const toggleViewMode = useCallback(() => {
    setViewMode((v) => (v === 2 ? 1 : 2));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const filteredHostels = useMemo(() => {
    if (!debouncedSearch) return dummyHostels;
    const q = debouncedSearch.toLowerCase();
    return dummyHostels.filter(
      (h) => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)
    );
  }, [debouncedSearch]);

  const renderItem = ({ item }: any) => (
    <View className={`${viewMode === 2 ? 'w-full flex-1' : 'w-full px-2'}`}>
      <Card item={item} onPress={() => router.push(`/hostels/${item.id}`)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={viewMode}
        data={filteredHostels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode}
        ListHeaderComponent={
          <Header
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
            query={search}
            setQuery={handleChange}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === 1 ? undefined : { gap: 10, paddingHorizontal: 10 }}
        keyboardShouldPersistTaps="handled"
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
  /* your existing styles… */
  container: { flex: 1, backgroundColor: 'white' },
  imageContainer: { height: IMG_HEIGHT, width, position: 'relative', backgroundColor: '#14B8A6' },
  image: { height: IMG_HEIGHT, width },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  viewToggle: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  listContent: { paddingBottom: 50 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 20, fontWeight: '600', color: '#6B7280', marginTop: 16 },
  emptySubtext: { fontSize: 14, color: '#9CA3AF', marginTop: 8 },
});

export default AllHostelsScreen;
