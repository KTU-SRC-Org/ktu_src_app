import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { Link } from 'expo-router';
import MemoEventSectionImage from '../icons/EventSectionImage';
import {Event} from "@/types/events.types";
import EventCard from "@/features/events/event-card";
import {eventsData} from "@/features/events";

const UpcomingEventsSection = () => {

  //Future events and nearest first 5 events
  const upcomingEvents = eventsData
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date)
      .getTime() - new Date(b.date).getTime())
    .slice(0, 5);


  return (
    <View className="relative mt-24">
      <View style={styles.container} className="z-10 mx-2 mb-10 rounded-lg bg-white px-3 py-5 ">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg font-bold ">UPCOMING EVENTS</Text>
          <Link href={'/events'}>
            <Text className="text-sm text-blue-500 bg-transparent">View All</Text>
          </Link>
        </View>

        <View className="bg-white mt-4">
          {upcomingEvents.length > 0 ? (
            <View className={"flex flex-col gap-4"}>
              {upcomingEvents.map((event: Event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                />
              ))}
            </View>
          ): (
           <View>
             <Text className="text-lg">
               No upcoming events found.
             </Text>
           </View>
          )}
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
    zIndex: 1,
  },
});

export default UpcomingEventsSection;
