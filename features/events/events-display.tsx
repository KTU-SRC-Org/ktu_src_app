import {useRef, useState} from "react";
import { View, Animated } from "react-native";
import EventsHeader from "@/features/events/events-header";
import EventsTabs from "@/features/events/events-tabs";
import EventCard from "@/features/events/event-card";
import {eventsData} from "@/features/events/index";
import {TabKeys, Event} from "@/types/events.types";
import TabsTopNav from "@/components/shared/tabs-top-nav";

const EventsDisplay = () => {
  const [selectedTab, setSelectedTab] = useState<TabKeys>("featured");
  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_HEIGHT = 300;

  //On scroll event set opacity to display event top bar
  const topBarOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }: { item: Event }) => (
   <View className={"px-4"}>
     <EventCard
       id={item.id}
       title={item.title}
       date={item.date}
       location={item.location}
     />
   </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/*Event nav bar - only show when scroll pass or reach header-height*/}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 30,
          opacity: topBarOpacity,
        }}
      >
        <TabsTopNav id={'events-header'} title={"Events"}/>
      </Animated.View>

      <Animated.FlatList
        data={eventsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View className="h-4" />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListHeaderComponent={
          <>
            <EventsHeader />
            <EventsTabs selected={selectedTab} setSelected={setSelectedTab} />
          </>
        }
        contentContainerStyle={{ paddingBottom: 20}}
      />
    </View>
  );
};

export default EventsDisplay;
