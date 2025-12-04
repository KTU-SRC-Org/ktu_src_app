import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChevronRight } from 'lucide-react-native';
type EditableSlug = 'edit-phone-number';

type InfoFieldProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor?: string;
  editable?: boolean;
  onEditPress?: () => void;
};

export const InfoField = ({
  icon,
  label,
  value,
  iconColor = '#6366F1',
  editable,
  onEditPress,
}: InfoFieldProps) => {
  return (
    <View className={'flex-1 items-center'}>
      <Pressable
        className={'flex-row items-center justify-between'}
        onPress={() => {
          if (editable && onEditPress) onEditPress();
        }}>
        <View className="flex-1 flex-row items-start py-4">
          <View
            className="mr-3 h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${iconColor}15` }}>
            <Ionicons name={icon} size={20} color={iconColor} />
          </View>

          <View className="flex-1">
            <Text className="mb-1 text-xs font-medium uppercase text-gray-500">{label}</Text>
            <Text className="text-base text-gray-900">{value || '—'}</Text>
          </View>
        </View>
        {editable && (
          <View>
            <Text>
              <ChevronRight />
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
