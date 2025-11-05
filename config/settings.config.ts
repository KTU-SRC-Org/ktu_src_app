import { SettingSection, ExternalService } from '@/types/settings.types';

export const settingsSections: SettingSection[] = [
  {
    id: 'account',
    items: [
      {
        id: 'profile',
        name: 'Profile & Account',
        icon: 'person-circle',
        backgroundColor: '#3B82F6',
        link: '/settings/profile',
      },
      {
        id: 'auth',
        name: 'Password & Security',
        icon: 'key',
        backgroundColor: '#8B5CF6',
        link: '/settings/security',
      },
    ],
  },
  {
    id: 'preferences',
    items: [
      {
        id: 'notifications',
        name: 'Notifications',
        icon: 'notifications',
        backgroundColor: '#EF4444',
        link: '/settings/notifications',
      },
      {
        id: 'communication',
        name: 'Communication Preferences',
        icon: 'chatbubbles',
        backgroundColor: '#10B981',
        link: '/settings/communication',
      },
      {
        id: 'appearance',
        name: 'Appearance',
        icon: 'color-palette',
        backgroundColor: '#F59E0B',
        link: '/settings/appearance',
      },
    ],
  },
  {
    id: 'privacy',
    items: [
      {
        id: 'privacy',
        name: 'Privacy & Data',
        icon: 'shield-checkmark',
        backgroundColor: '#06B6D4',
        link: '/settings/privacy',
      },
      {
        id: 'blocked',
        name: 'Blocked Users',
        icon: 'ban',
        backgroundColor: '#EF4444',
        link: '/settings/blocked',
        comingSoon: true,
      },
    ],
  },
  {
    id: 'app',
    items: [
      {
        id: 'app-preferences',
        name: 'App Preferences',
        icon: 'options',
        backgroundColor: '#6366F1',
        link: '/settings/app-preferences',
      },
      {
        id: 'storage',
        name: 'Storage & Data',
        icon: 'server',
        backgroundColor: '#8B5CF6',
        link: '/settings/storage',
      },
      {
        id: 'language',
        name: 'Language',
        icon: 'language',
        backgroundColor: '#10B981',
        link: '/settings/language',
        comingSoon: true,
      },
    ],
  },
  {
    id: 'support',
    items: [
      {
        id: 'help',
        name: 'Help Center',
        icon: 'help-circle',
        backgroundColor: '#3B82F6',
        link: '/settings/help',
      },
      {
        id: 'contact',
        name: 'Contact Student Rep',
        icon: 'mail',
        backgroundColor: '#10B981',
        link: '/settings/contact',
      },
      {
        id: 'feedback',
        name: 'Send Feedback',
        icon: 'chatbox-ellipses',
        backgroundColor: '#F59E0B',
        link: '/settings/feedback',
      },
      {
        id: 'bug',
        name: 'Report a Bug',
        icon: 'bug',
        backgroundColor: '#EF4444',
        link: '/settings/report-bug',
      },
    ],
  },
  {
    id: 'legal',
    items: [
      {
        id: 'terms',
        name: 'Terms of Service',
        icon: 'document-text',
        backgroundColor: '#6B7280',
        link: '/settings/terms',
      },
      {
        id: 'privacy-policy',
        name: 'Privacy Policy',
        icon: 'document-lock',
        backgroundColor: '#6B7280',
        link: '/settings/privacy-policy',
      },
      {
        id: 'about',
        name: 'About',
        icon: 'information-circle',
        backgroundColor: '#3B82F6',
        link: '/settings/about',
      },
    ],
  },
];

export const externalServices: ExternalService[] = [
  {
    id: 'school-website',
    name: 'School Website',
    icon: 'globe',
    backgroundColor: '#3B82F6',
    link: 'https://school.edu',
  },
  {
    id: 'student-portal',
    name: 'Student Portal',
    icon: 'school',
    backgroundColor: '#10B981',
    link: 'https://portal.school.edu',
  },
  {
    id: 'library',
    name: 'Library',
    icon: 'library',
    backgroundColor: '#8B5CF6',
    link: 'https://library.school.edu',
  },
  {
    id: 'email',
    name: 'Webmail',
    icon: 'mail',
    backgroundColor: '#EF4444',
    link: 'https://mail.school.edu',
  },
  {
    id: 'lms',
    name: 'Learning Portal',
    icon: 'book',
    backgroundColor: '#F59E0B',
    link: 'https://lms.school.edu',
  },
  {
    id: 'career',
    name: 'Career Services',
    icon: 'briefcase',
    backgroundColor: '#06B6D4',
  },
];
