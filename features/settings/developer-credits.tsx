import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type DeveloperCreditsProps = {
  onPress?: () => void;
};

export const DeveloperCredits = ({ onPress }: DeveloperCreditsProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 my-4 overflow-hidden rounded-2xl"
      activeOpacity={0.9}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#D946EF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 py-5">
        <View className="flex-row items-center justify-between px-4 pt-2 mb-3">
          <View className="flex-row items-center gap-2">
            <View className="items-center justify-center p-2 rounded-lg bg-white/20">
              <Ionicons name="code-slash" size={18} color="#fff" />
            </View>
            <View className="items-center justify-center p-2 rounded-lg bg-white/20">
              <Ionicons name="rocket" size={18} color="#fff" />
            </View>
            <View className="items-center justify-center p-2 rounded-lg bg-white/20">
              <Ionicons name="bulb" size={18} color="#fff" />
            </View>
          </View>

          {onPress && (
            <View className="items-center justify-center p-2 rounded-full bg-white/25">
              <Ionicons name="chevron-forward" size={16} color="#fff" />
            </View>
          )}
        </View>

        <View className="px-4">
          <Text className="mb-1 text-xs font-medium text-white/70">Crafted with passion by</Text>
          <Text className="text-lg font-bold leading-tight text-white">SRC Tech & Innovations</Text>
          <Text className="text-lg font-bold leading-tight text-white">Committee</Text>
        </View>

        <View className="mt-3 flex-row items-center gap-1.5 px-4 pb-2">
          <Ionicons name="people" size={13} color="rgba(255,255,255,0.9)" />
          <Text className="text-xs font-medium text-white/90">Students building for students</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
