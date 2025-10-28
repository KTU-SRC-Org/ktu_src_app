import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import UpcomingEventCard from '../cards/UpcomingEventCard';
import MemoEventSectionImage from '../icons/EventSectionImage';

const UpcomingEventsSection = () => {
  return (
    <View className="relative mt-24">
      <View
        style={styles.container}
        className="z-10 px-3 py-5 mx-2 mb-10 bg-white rounded-lg ">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg font-bold ">UPCOMING EVENTS</Text>
          <Link href="/">
            <Text className="text-sm text-blue-500">View All</Text>
          </Link>
        </View>

        <View className="gap-4 mt-4">
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
        </View>
      </View>

      <View style={styles.imageContainer} className="absolute -right-9 -top-[100px] z-0">
        <MemoEventSectionImage />
        {/* <Image
          style={{ width: '50%', height: '50%', borderRadius: 10 }}
          contentFit="contain"
          transition={300}
          source={require('@/assets/images/event-section-image.png')}
          className="absolute -right-9 -top-[65px] z-0"
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    zIndex: 2,
  },
  imageContainer: {
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.62,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    zIndex: 1
  }
});

export default UpcomingEventsSection;
