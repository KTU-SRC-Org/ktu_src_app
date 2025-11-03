import { useSharedValue } from 'react-native-reanimated';
import { SRCUpdateCard } from '@/components/cards/SrcUpdateCard';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface NotificationData {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  readMoreLink?: string;
  avatarUrl?: string;
  avatarFallback: string;
  gradientColors: [string, string];
}

const dummyNotifications: NotificationData[] = [
  {
    id: '1',
    title: 'SRC Update – WiFi Expansion',
    timestamp: '2h ago',
    description:
      'The new Starlink-powered WiFi hotspots are now live at the Library and Engineering Block. Students can log in using their institutional email for unlimited access...',
    avatarFallback: 'SRC',
    gradientColors: ['#C2185B', '#5E35B1'],
  },
  {
    id: '2',
    title: 'Campus Event – Tech Summit 2025',
    timestamp: '5h ago',
    description:
      'Join us for the annual Tech Summit featuring industry leaders, workshops, and networking opportunities. Register now to secure your spot for this exciting event...',
    avatarFallback: 'CS',
    gradientColors: ['#1976D2', '#0D47A1'],
  },
  {
    id: '3',
    title: 'Library Hours Extended',
    timestamp: '1d ago',
    description:
      'Great news! The main library will now be open 24/7 during exam periods. Access your study materials and resources anytime you need them...',
    avatarFallback: 'LIB',
    gradientColors: ['#388E3C', '#1B5E20'],
  },
  {
    id: '4',
    title: 'Sports Day Registration Open',
    timestamp: '2d ago',
    description:
      'Sign up for the annual inter-department sports competition. Multiple categories available including football, basketball, athletics, and more...',
    avatarFallback: 'SPT',
    gradientColors: ['#F57C00', '#E65100'],
  },
  {
    id: '5',
    title: 'New Food Court Opening',
    timestamp: '3d ago',
    description:
      'Exciting news! A new food court with diverse cuisine options is opening next to the Student Center. Grand opening with special discounts this Friday...',
    avatarFallback: 'FC',
    gradientColors: ['#D32F2F', '#B71C1C'],
  },
];

export function HomeUpdatesCarousel() {
  const window = Dimensions.get('window');
  const progress = useSharedValue<number>(0);

  const handleAction = (action: string, notificationId: string) => {
    console.log(`${action} pressed for notification ${notificationId}`);
  };

  const renderItem = ({ item }: { item: NotificationData }) => {
    return (
      <SRCUpdateCard
        {...item}
        onDownload={() => handleAction('Download', item.id)}
        onShare={() => handleAction('Share', item.id)}
        onCopy={() => handleAction('Copy', item.id)}
        onExternalLink={() => handleAction('External Link', item.id)}
        onReadMore={() => handleAction('Read More', item.id)}
      />
    );
  };

  return (
    <View className="w-full">
      <Carousel
        autoPlay={true}
        autoPlayInterval={5000}
        data={dummyNotifications}
        height={240}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={window.width}
        style={{
          width: window.width,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 40,
        }}
        onProgressChange={progress}
        renderItem={renderItem}
      />
    </View>
  );
}

export default HomeUpdatesCarousel;
