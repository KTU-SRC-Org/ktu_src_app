import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMarketCategories } from '@/hooks/marketplace/use-market-categories';
import { Skeleton } from '@/components/ui/skeleton';

export default function AllCategories() {
  const router = useRouter();
  const { data: categories = [], isLoading } = useMarketCategories();

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="my-2 flex-row items-center rounded-xl bg-gray-100 p-4"
      onPress={() =>
        router.push({
          pathname: '/marketplace/category/[id]',
          params: { id: item.id, title: item.name },
        })
      }>
      <View
        className="mr-4 h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: item.color }}>
        <Text className="text-2xl">{item.icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="mb-1 text-base font-semibold">{item.name}</Text>
      </View>

      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-white px-4 py-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View key={i} className="my-2 flex-row items-center rounded-xl bg-gray-100 p-4">
            <Skeleton className="mr-4 h-14 w-14 rounded-full" />
            <View className="flex-1">
              <Skeleton className="mb-1 h-5 w-32" />
            </View>
            <Skeleton className="h-6 w-6 rounded-full" />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={categories as any}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-10 items-center justify-center">
            <Text className="text-gray-500">No categories found</Text>
          </View>
        }
      />
    </View>
  );
}
