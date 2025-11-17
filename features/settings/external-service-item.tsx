import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExternalService } from '@/types/settings.types';

type ExternalServiceItemProps = {
  service: ExternalService;
  onPress: () => void;
};

export const ExternalServiceItem = ({ service, onPress }: ExternalServiceItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!service.link}
      className="w-20 items-center"
      activeOpacity={0.7}>
      <View
        className="mb-2 h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: service.backgroundColor || '#6B7280' }}>
        {typeof service.icon === 'string' ? (
          <Ionicons name={service.icon as any} size={28} color="#fff" />
        ) : (
          service.icon
        )}
      </View>
      <Text className="text-center text-xs text-gray-700" numberOfLines={2}>
        {service.name}
      </Text>
    </TouchableOpacity>
  );
};
