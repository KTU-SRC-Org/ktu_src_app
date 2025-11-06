import React from "react";
import {View, Text, useWindowDimensions, Platform, ImageBackground, Pressable} from "react-native";
import {ArrowRight, MapPin} from "lucide-react-native";
import { Image } from "expo-image";
import { getFormattedDate } from "@/lib/utils";

const EventsHeader = () => {
  const { width } = useWindowDimensions();
  //Set image height base on device width
  const imageHeight = width * 0.45;

  //Base on the image height set the image overlap
  const overlap = imageHeight * 0.35;

  //Get day, and month of display event
  const { day, month } = getFormattedDate(new Date(Date.now())); //Hard coded

  return (
    <View className="flex flex-col w-full bg-white">
      <ImageBackground
        source={require("@/assets/images/events/event-bg.png")}
        resizeMode="cover"
        style={{ width: "100%", paddingTop: 16, paddingBottom: 80 }}
      >
        <View className="relative px-4">
          <Text className="text-4xl font-extrabold text-white">Events</Text>

          <View className="mt-2">
            <Text className="text-white/90 text-base font-medium">
              Upcoming Events
            </Text>

            <View className="flex-row items-center mt-1">
              <MapPin size={18} color="#fff" />
              <Text className="text-white ml-2">On Campus</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View className="relative px-4 z-10" style={{ marginTop: -overlap }}>
        <Image
          source={require("@/assets/images/events/img.png")}
          style={{
            width: "100%",
            height: imageHeight,
            borderRadius: 16,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 4 },
          }}
          contentFit="cover"
        />
        <View className="absolute top-4 left-8 bg-[#0B151EBD] rounded-md p-2 items-center shadow border-2 border-[#F5882B]">
          <Text className="text-white text-sm font-bold">{month}</Text>
          <Text
            className="text-center text-3xl font-extrabold text-white leading-none"
            style={{
              fontVariant: ["tabular-nums"],
              fontFamily: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
              }),
            }}
          >
            {day}
          </Text>
        </View>
        <Pressable
          onPress={() => ""}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0B151EBD] items-center justify-center rounded-full w-12 h-12 p-2"
        >
          <ArrowRight size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default EventsHeader;
