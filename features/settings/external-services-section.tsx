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
    <View className="mb-4 mt-8">
      <Text className="mb-3 px-4 text-sm font-semibold text-gray-500">Student Services</Text>
      <View className="mx-4 rounded-xl bg-white">
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
