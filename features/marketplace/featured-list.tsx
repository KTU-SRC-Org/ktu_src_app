import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProductCard from '@/features/marketplace/product-card';
import CategoryCard from '@/features/marketplace/category-card';
import { ProductCardInterface } from '@/features/marketplace/index';
import ProductSearchBar from '@/features/marketplace/product-search-bar';
import { useMarketCategories } from '@/hooks/marketplace/use-market-categories';
import { useFeaturedListings } from '@/hooks/marketplace/use-featured-listings';
import { Skeleton } from '@/components/ui/skeleton';

const CategoriesSkeleton = () => (
  <View className="flex-row gap-3">
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="items-center gap-2">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </View>
    ))}
  </View>
);

const FeaturedSkeleton = () => (
  <View className="flex-row flex-wrap justify-between px-4">
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="mb-4 w-[48%] gap-2">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </View>
    ))}
  </View>
);

// This component contains ALL the content that appears ABOVE the product list
const MarketplaceListHeader = () => {
  const router = useRouter();
  const { data: categories = [], isLoading: isCategoriesLoading } = useMarketCategories();

  return (
    // This View replaces the original root View and provides spacing
    <View className="flex-col gap-8">
      <ProductSearchBar />
      {/* Banner */}
      <View className="relative">
        <LinearGradient
          colors={['#F5882B', '#8A3324']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            overflow: 'hidden',
          }}>
          <View className="flex flex-1 flex-col justify-center gap-4">
            <Text className="text-3xl font-bold text-white">Shop Smarter,{'\n'}Save More!</Text>
            <TouchableOpacity className="flex-row items-center space-x-2 self-start rounded-full border border-white bg-transparent px-4 py-2">
              <Ionicons name="pricetag-outline" size={16} color="#fff" />
              <Text className="ml-2 text-sm font-semibold text-white">Get 40% OFF!</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <Image
          source={require('@/assets/images/marketplace/woman.png')}
          className="absolute right-8 top-2 h-[120px] w-[140px] rounded-xl"
        />
      </View>

      {/* Categories */}
      <View className="flex flex-col gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold">Categories</Text>
          <TouchableOpacity
            className="flex-row items-center space-x-1"
            onPress={() =>
              router.push({
                pathname: '/marketplace/categories',
              })
            }>
            <Text className="text-base font-semibold text-[#FF8C42]">See all</Text>
            <Ionicons name="chevron-forward" size={18} color="#FF8C42" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
          {isCategoriesLoading ? (
            <CategoriesSkeleton />
          ) : (
            categories.slice(0, 6).map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon ?? 'help-circle'}
                color={category.color ?? '#000000'}
              />
            ))
          )}
        </ScrollView>
      </View>

      {/* Gadget Image */}
      <View className="overflow-hidden rounded-2xl">
        <Image
          source={require('@/assets/images/marketplace/gadget.png')}
          className="h-[150px] w-full"
        />
      </View>

      {/* Featured Items Title */}
      <Text className="mb-2 text-lg font-bold">Featured Items</Text>
    </View>
  );
};

export default function FeaturedList() {
  const { data: featuredItems = [], isLoading: isFeaturedLoading } = useFeaturedListings();

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard
      key={item.id}
      id={item.id}
      name={item.title}
      price={item.price}
      image={item.hero_image_url}
      rating={item.rating}
    />
  );

  if (isFeaturedLoading) {
    return (
      <View className="flex-1">
        <MarketplaceListHeader />
        <FeaturedSkeleton />
      </View>
    );
  }

  return (
    // The root component is now the FlatList
    <FlatList
      style={{ flex: 1 }} // Ensures the list fills the available space
      // Pass all the header content here
      ListHeaderComponent={MarketplaceListHeader}
      // List data and props remain the same
      data={featuredItems}
      ListEmptyComponent={
        <View className="py-10 items-center justify-center">
          <Text className="text-gray-500">No featured items found</Text>
        </View>
      }
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      horizontal={false}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
      showsVerticalScrollIndicator={false}
      // Apply horizontal padding to the list content to match the header
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
    />
  );
}
