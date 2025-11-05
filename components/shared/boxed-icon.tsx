import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type BoxedIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  size?: number;
};

export const BoxedIcon = ({ name, backgroundColor, size = 22 }: BoxedIconProps) => {
  return (
    <View className="p-1 rounded-md" style={{ backgroundColor }}>
      <Ionicons name={name} size={size} color="#fff" />
    </View>
  );
};
