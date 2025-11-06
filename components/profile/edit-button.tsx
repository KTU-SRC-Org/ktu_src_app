import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type EditButtonProps = {
  onPress: () => void;
};

export const EditButton = ({ onPress }: EditButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-center gap-2 px-6 py-3 mx-6 mb-6 bg-indigo-600 rounded-xl"
      activeOpacity={0.8}
    >
      <Ionicons name="create-outline" size={20} color="#fff" />
      <Text className="text-base font-semibold text-white">
        Edit Profile
      </Text>
    </TouchableOpacity>
  );
};