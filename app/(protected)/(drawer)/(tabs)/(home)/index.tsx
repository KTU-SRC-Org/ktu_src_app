import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import HomeCustomHeader from '@/components/home/HomeCustomHeader';
import { HomeUpdatesCarousel } from '@/components/builders/HomeUpdatesCarousel';
import HomeRepresentativeCarousel from '@/components/builders/HomeRepresentativeCarousel';
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection';
import ActiveProjectsSection from '@/components/home/ActiveProjectsSection';
import EnterMarketSection from '@/components/home/EnterMarketSection';
import { CampusNewsSection } from '@/components/home/CampusNewsSection';

export default function Home() {
  return (
    <>
      <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
        <StatusBar style="dark" />
        <HomeCustomHeader />

        <ScrollView style={{ flex: 1 }} className="pt-2">
          <HomeUpdatesCarousel />
          <HomeRepresentativeCarousel />

          <UpcomingEventsSection />
          <CampusNewsSection />
          <ActiveProjectsSection />

          <EnterMarketSection />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
