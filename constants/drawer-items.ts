import { Feather, MaterialIcons } from '@expo/vector-icons';

export interface DrawerItemProps {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap | keyof typeof Feather.glyphMap;
  route?: string;
  onClick?: () => void;
  isFeather?: boolean;
  position?: 'bottom';
}

export const drawerItems: DrawerItemProps[] = [
  { label: 'SRC News', icon: 'campaign', route: '/src-news' },
  { label: 'Profile', icon: 'person-outline', route: '/profile' },
  { label: 'Clubs & Societies', icon: 'groups', route: '/clubs-societies' },
  { label: 'Campus Navigation', icon: 'map', route: '/campus-navigation' },
  { label: 'Past Questions', icon: 'description', route: '/past-questions' },
  { label: 'Help Bot', icon: 'smart-toy', route: '/help-bot' },
  { label: 'Settings', icon: 'settings', route: '/settings', position: 'bottom' },
  { label: 'Compliance', icon: 'chat-bubble-outline', route: '/compliance', position: 'bottom' },
  { label: 'Logout', icon: 'logout', onClick: () => '', position: 'bottom' },
];
