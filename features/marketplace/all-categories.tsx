import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ALL_CATEGORIES, CategoryInterface } from '@/features/marketplace/index';

export default function AllCategories() {
  const router = useRouter();

  const renderCategory = ({ item }: { item: CategoryInterface }) => (
    <TouchableOpacity
      className="my-2 flex-row items-center rounded-xl bg-gray-100 p-4"
      onPress={() =>
        router.push({
          pathname: '/marketplace/category/[id]',
          params: { id: item.id },
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

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={ALL_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
