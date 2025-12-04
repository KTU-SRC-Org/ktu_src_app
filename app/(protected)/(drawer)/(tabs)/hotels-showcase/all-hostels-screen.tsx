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
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/cards/hostels-showcase/Card';
import { blurhash } from '@/constants';
import Search from '@/components/shared/Search';
import { useSearchSync } from '@/hooks/use-search-sync';
import { useInfiniteHostels } from '@/hooks/hostel/use-infinite-hostels';
import type { HostelCard } from '@/hooks/hostel/use-hostel';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Header = memo(function Header({
  viewMode,
  toggleViewMode,
  query,
  setQuery,
  submitQuery,
  currentCount,
  totalCount,
}: {
  viewMode: 1 | 2;
  toggleViewMode: () => void;
  query: string;
  setQuery: (t: string) => void;
  submitQuery?: () => void;
  totalCount: number;
  currentCount: number;
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
        <View>
          <Text style={styles.sectionTitle}>All available hostels</Text>
          {totalCount !== 0 && (
            <Text className="text-xs text-muted-foreground">
              Showing {currentCount} of {totalCount} hostels
            </Text>
          )}
        </View>
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

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useInfiniteHostels(debouncedSearch);

  // const filteredHostels = useMemo(() => {
  //   if (!debouncedSearch) return dummyHostels;
  //   const q = debouncedSearch.toLowerCase();
  //   return dummyHostels.filter(
  //     (h) => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)
  //   );
  // }, [debouncedSearch]);

  const allHostels: HostelCard[] = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  const totalCount = data?.pages[0]?.count ?? null;

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: any) => (
    <View className={`${viewMode === 2 ? 'w-full flex-1' : 'w-full px-2'}`}>
      <Card item={item} onPress={() => router.push(`/hostels/${item.id}`)} />
    </View>
  );

  const ListEmptyComponent = () => {
    if (isLoading || isRefetching) {
      return <ActivityIndicator size="large" color="#0061FF" style={{ marginTop: 40 }} />;
    }

    if (isError) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="warning-outline" size={48} color="#F97316" />
          <Text style={styles.emptyText}>Failed to load hostels</Text>
          <Text style={styles.emptySubtext}>{(error as any)?.message ?? 'Please try again.'}</Text>
          <Pressable onPress={() => refetch()} style={{ marginTop: 16 }}>
            <Text style={[styles.emptySubtext, { color: '#0061FF' }]}>Tap to retry</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={64} color="#D1D5DB" />
        <Text style={styles.emptyText}>No hostels found</Text>
        <Text style={styles.emptySubtext}>Try adjusting your search</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return <View style={{ height: 20 }} />;
    return (
      <View style={styles.loaderFooter}>
        <ActivityIndicator size="small" color="#14B8A6" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={viewMode}
        data={allHostels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode}
        ListHeaderComponent={
          <Header
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
            query={search}
            setQuery={handleChange}
            totalCount={totalCount ?? 0}
            currentCount={allHostels.length}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === 1 ? undefined : { gap: 10, paddingHorizontal: 10 }}
        keyboardShouldPersistTaps="handled"
        // Infinite Scroll Props
        onEndReached={loadMore}
        onEndReachedThreshold={0.5} // Trigger when 50% from bottom
        ListFooterComponent={renderFooter}
        ListEmptyComponent={ListEmptyComponent}
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
  loaderFooter: { paddingVertical: 20, alignItems: 'center' },
});

export default AllHostelsScreen;
