import { useRef, useState } from 'react';
import { View, Animated, Text, ActivityIndicator } from 'react-native';
import EventsHeader from '@/features/events/events-header';
import EventsTabs from '@/features/events/events-tabs';
import EventCard from '@/features/events/event-card';
import { TabKeys, Event } from '@/types/events.types';
import TabsTopNav from '@/components/shared/tabs-top-nav';
import { useInfiniteEvents } from '@/hooks/events/use-infinite-events';

const EventsDisplay = () => {
  const [selectedTab, setSelectedTab] = useState<TabKeys>('featured');
  const scrollY = useRef(new Animated.Value(0)).current;

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, error } =
    useInfiniteEvents(selectedTab);

  const events = data?.pages.flat() || [];
console.log(error);
  const HEADER_HEIGHT = 300;

  //On scroll event set opacity to display event top bar
  const topBarOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderItem = ({ item }: { item: Event }) => (
    <View className={'px-4'}>
      <EventCard
        id={item.id}
        title={item.title}
        date={item.starts_at}
        location={item.location}
      />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };



  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Error loading events</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/*Event nav bar - only show when scroll pass or reach header-height*/}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 30,
          opacity: topBarOpacity,
        }}>
        <TabsTopNav id={'events-header'} title={'Events'} />
      </Animated.View>

      <Animated.FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View className="h-4" />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        ListHeaderComponent={
          <>
            <EventsHeader />
            <EventsTabs selected={selectedTab} setSelected={setSelectedTab} />
          </>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={
          isLoading ? (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-gray-500">No events found</Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default EventsDisplay;
