import { View } from 'react-native';

export const ProfileSkeleton = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="h-48 bg-gray-200 rounded-b-3xl" />
      
      <View className="px-6 mt-6">
        <View className="h-4 mb-4 bg-gray-200 rounded w-28" />
        <View className="p-6 bg-white rounded-2xl">
          {[1, 2, 3].map((i) => (
            <View key={i} className="mb-4">
              <View className="w-20 h-3 mb-2 bg-gray-200 rounded" />
              <View className="h-4 bg-gray-200 rounded w-36" />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};