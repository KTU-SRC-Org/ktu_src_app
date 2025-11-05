import { View, Text, ScrollView } from 'react-native';
import { ExternalServiceItem } from './external-service-item';
import { ExternalService } from '@/types/settings.types';

type ExternalServicesSectionProps = {
  services: ExternalService[];
  onServicePress: (service: ExternalService) => void;
};

export const ExternalServicesSection = ({
  services,
  onServicePress,
}: ExternalServicesSectionProps) => {
  return (
    <View className="mt-8 mb-4">
      <Text className="px-4 mb-3 text-sm font-semibold text-gray-500">Student Services</Text>
      <View className="mx-4 bg-white rounded-xl">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, gap: 16 }}>
          {services.map((service) => (
            <ExternalServiceItem
              key={service.id}
              service={service}
              onPress={() => onServicePress(service)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
