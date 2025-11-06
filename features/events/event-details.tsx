import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable, Platform, useWindowDimensions,
} from "react-native";
import {MapPin, Calendar, Users, ArrowLeft} from "lucide-react-native";
import { useRouter } from "expo-router";
import { eventsData } from "@/features/events";
import {getFormattedDate} from "@/lib/utils";
import BookCanopyModal from "@/features/events/book-canopy-modal";

const EventDetails = ({id}: {id: string}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const {width} = useWindowDimensions();
  //Set the image height base on the device width
  const imageHeight = width * 0.50;

  //Get the clicked event ID and find full details
  const event = eventsData.find((item) => item.id === id);

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Event not found.</Text>
      </View>
    );
  }

  //Get the date and destruct into day, time, and month
  const {day, time, month } = getFormattedDate(event.date)

  return (
   <>
     <View className="flex-1 bg-white">
       <ScrollView
         className="flex-1"
         showsVerticalScrollIndicator={false}
         contentContainerClassName={"flex flex-col gap-4 pb-8"}>
         <View
           className="relative w-full"
           style={{ height: imageHeight}}
         >
           <Image
             source={{
               uri:
                 event.image ||
                 "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
             }}
             className="w-full h-full"
           />

           <Pressable
             onPress={() => router.back()}
             className="absolute top-4 left-4 bg-white/80 items-center rounded-full w-10 h-10 p-2"
           >
             <ArrowLeft size={24} color="#000" />
           </Pressable>

           <View className="absolute top-16 left-4 bg-[#0B151EBD] rounded-md p-2 items-center shadow border-2 border-[#F5882B]">
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
         </View>

         <Text className="px-4 text-sm text-blue-600 font-semibold">
           {event.category || "Event"}
         </Text>

         <Text className="px-4 text-xl font-bold text-neutral-900 mt-1">
           {event.title}
         </Text>

         <View className="px-4 flex-row items-center gap-3 mt-2 flex-wrap">
           <View className="flex-row items-center gap-1">
             <MapPin size={14} color="#475569" />
             <Text className="text-sm text-slate-700">
               {event.location}
             </Text>
           </View>

           <View className="flex-row items-center gap-1">
             <Calendar size={14} color="#475569" />
             <Text className="text-sm text-slate-700">
               {month} {day} • {time}
             </Text>
           </View>
         </View>

         <View className="px-4 flex-row items-center justify-between">
           <View className="flex-row items-center gap-2">
             <Users size={16} color="#334155" />
             <Text className="text-sm text-slate-700">
               {event.attendees || "2.7K+"} Going
             </Text>
           </View>
           <Text className="text-blue-500 text-sm font-medium">
             View all / Invite
           </Text>
         </View>

         <View className={"px-4"}>
           <Pressable
             onPress={() => setOpenModal(true)}
             className="self-start bg-blue-500 rounded-md mt-4 py-3 px-5 active:opacity-80"
           >
             <Text className="text-center text-white font-semibold text-base">
               Book Canopy
             </Text>
           </Pressable>
         </View>

         <View className="px-4">
           <Text className="text-base font-semibold text-neutral-900 mb-1">
             About Event
           </Text>
           <Text className="text-sm text-slate-700 leading-relaxed">
             {event.description ||
               "No detailed description available for this event."}
           </Text>
         </View>

         {event.organizer && (
           <View className="px-4">
             <Text className="text-base font-semibold text-neutral-900 mb-1">
               Organizer
             </Text>
             <Text className="text-sm text-slate-700">
               {event.organizer}
             </Text>
           </View>
         )}
       </ScrollView>
     </View>
     {openModal && (
       <BookCanopyModal
         visible={openModal}
         onClose={() => setOpenModal(false)}
         event={event}
       />
     )}
   </>
  );
};

export default EventDetails;
