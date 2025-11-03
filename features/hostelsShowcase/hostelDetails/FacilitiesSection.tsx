import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const facilityIcons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  WiFi: 'wifi',
  Parking: 'car',
  Kitchen: 'restaurant',
  Laundry: 'shirt',
  Lounge: 'people',
  '24/7 Security': 'shield-checkmark',
};

interface FacilitiesSectionProps {
  facilities: string[];
}

const FacilitiesSection = ({ facilities }: FacilitiesSectionProps) => {
  return (
    <View className="mt-2 flex flex-row flex-wrap items-start justify-start gap-5">
      {facilities.map((item: string, index: number) => (
        <View key={index} className="flex min-w-16 max-w-20 flex-1 flex-col items-center">
          <View className="flex size-14 items-center justify-center rounded-full bg-blue-100">
            <Ionicons
              name={facilityIcons[item] || 'information-circle-outline'}
              size={24}
              color="#0061FF"
            />
          </View>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="mt-1.5 text-center text-sm font-normal text-gray-700">
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default FacilitiesSection;
