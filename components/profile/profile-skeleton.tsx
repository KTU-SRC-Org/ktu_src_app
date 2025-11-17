import { View } from 'react-native';

export const ProfileSkeleton = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="h-48 rounded-b-3xl bg-gray-200" />

      <View className="mt-6 px-6">
        <View className="mb-4 h-4 w-28 rounded bg-gray-200" />
        <View className="rounded-2xl bg-white p-6">
          {[1, 2, 3].map((i) => (
            <View key={i} className="mb-4">
              <View className="mb-2 h-3 w-20 rounded bg-gray-200" />
              <View className="h-4 w-36 rounded bg-gray-200" />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
