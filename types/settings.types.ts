import { Ionicons } from '@expo/vector-icons';

export type SettingItem = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  link?: string;
  disabled?: boolean;
  comingSoon?: boolean;
  onPress?: () => void;
};

export type SettingSection = {
  id: string;
  title?: string;
  items: SettingItem[];
};

export type ExternalService = {
  id: string;
  name: string;
  icon: any;
  link?: string;
  backgroundColor?: string;
};
