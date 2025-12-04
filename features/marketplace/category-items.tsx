import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ProductCard from '@/features/marketplace/product-card';
import BackNavigationHeader from '@/features/marketplace/back-navigation-header';
import ProductSearchBar from '@/features/marketplace/product-search-bar';
import { useSearchSync } from '@/hooks/use-search-sync';
import { useInfiniteListings } from '@/hooks/marketplace/use-infinite-listings';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryItems = ({ id, title }: { id: string; title: string }) => {
  const { search, debouncedSearch, handleChange } = useSearchSync();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteListings(
    id,
    debouncedSearch
  );

  const listings = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const renderItem = ({ item }: { item: any }) => (
    <View className="w-full px-2 pt-4">
      <ProductCard
        key={item.id}
        id={item.id}
        name={item.title}
        price={item.price}
        image={item.hero_image_url}
        rating={item.rating}
        category={id}
      />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="items-center py-4">
        <Skeleton className="mb-2 h-40 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
      </View>
    );
  };

  return (
    <View className="flex-1">
      <BackNavigationHeader title={title} itemCount={listings.length} />

      <FlashList
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ProductSearchBar
            editable
            placeholder="Search for product..."
            value={search}
            onChangeText={handleChange}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <View className="flex-row flex-wrap justify-between px-2">
              {[1, 2, 3, 4].map((i) => (
                <View key={i} className="mb-4 w-[48%] gap-2">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </View>
              ))}
            </View>
          ) : (
            <Text className="mt-10 text-center text-gray-400">
              {search ? 'No product found in this search' : 'No product found in this category.'}
            </Text>
          )
        }
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
export default CategoryItems;
