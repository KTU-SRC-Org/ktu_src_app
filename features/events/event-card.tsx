import React from "react";
import {View, Text, StyleSheet, Pressable, Platform} from "react-native";
import { Calendar, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import {getFormattedDate} from "@/lib/utils";

export interface EventCardProps {
  id: string
  date: Date | string;
  title: string;
  location: string;
}

const EventCard = ({ date, title, location, id }: EventCardProps) => {
  const router = useRouter();

  //Destruct the date into day, time, month
  const {day, time, month} = getFormattedDate(date);

  return (
    <Pressable
      onPress={() => router.push({
        pathname: "/events/[id]",
        params: {id: id}
      })}
      style={styles.container}
      className="flex flex-row items-center justify-between gap-3 rounded-md bg-slate-100 px-3 py-2 active:opacity-70"
    >
      <View className="rounded-md bg-blue-400 px-2 py-1 w-14">
        <Text className="text-center text-base font-bold text-white">{month}</Text>
        <Text
          className="text-center text-3xl font-extrabold text-white leading-none"
          style={{
            fontVariant: ['tabular-nums'],
            fontFamily: Platform.select({
              ios: 'Menlo',
              android: 'monospace',
              default: 'monospace',
            }),
          }}
        >
          {day}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          className="mb-1 text-base font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className="flex flex-row items-center gap-4">
          <View className="flex flex-row items-center gap-1">
            <Calendar size={12} color="#334155" />
            <Text className="text-xs text-slate-700">{time}</Text>
          </View>

          <View className="flex flex-row items-center gap-1">
            <MapPin size={12} color="#334155" />
            <Text className="text-xs text-slate-700" numberOfLines={1}>
              {location}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 5,
    },
  },
});

export default EventCard;
