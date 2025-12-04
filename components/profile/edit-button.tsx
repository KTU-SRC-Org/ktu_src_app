import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type EditButtonProps = {
  onPress: () => void;
};

export const EditButton = ({ onPress }: EditButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-6 mb-6 flex-row items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3"
      activeOpacity={0.8}>
      <Ionicons name="create-outline" size={20} color="#fff" />
      <Text className="text-base font-semibold text-white">Edit Profile</Text>
    </TouchableOpacity>
  );
};
