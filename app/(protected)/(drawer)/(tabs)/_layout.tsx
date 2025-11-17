import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '@/components/HeaderButton';
import { Store, House, Hotel, Settings, Calendar } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        animation: 'shift',
        tabBarLabelStyle: { marginTop: 5 },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <House color={color} style={styles.tabBarIcon} size={28} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace-screen"
        options={{
          title: 'Market',
          tabBarIcon: ({ color }) => <Store color={color} style={styles.tabBarIcon} size={28} />,
        }}
      />

      <Tabs.Screen
        name="hotels-showcase"
        options={{
          title: 'Hostels',
          tabBarIcon: ({ color }) => <Hotel color={color} style={styles.tabBarIcon} size={28} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} style={styles.tabBarIcon} size={28} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <Calendar color={color} style={styles.tabBarIcon} size={28} />,
        }}
      />
    </Tabs>
  );
}

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
