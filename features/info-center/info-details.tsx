import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { infoData } from "@/features/info-center/index";
import { ArrowLeft, AlertCircle, MapPin, Phone, FileText } from "lucide-react-native";
import { Card, CardContent } from '@/components/ui/card';
import {formatTime} from "@/lib/utils";

const InfoDetails = ({id}: {id: string}) => {
  const router = useRouter();

  const info = infoData.find((item) => item.id === id);

  if (!info) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-400">Info not found</Text>
      </View>
    );
  }

  const updatedAgo = info.updatedAt && formatTime(info.updatedAt)
  const createdDate =  info.createdAt && formatTime(info.createdAt)

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-neutral-200 bg-white">
        <Pressable
          onPress={() => router.back()}
          className="mr-3 p-2 rounded-full active:opacity-70"
        >
          <ArrowLeft size={22} color="#000" />
        </Pressable>
        <Text className="text-lg font-semibold text-black flex-1">
          Notification & Announcements
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        className="px-4 pt-3"
      >
        {info.isImportant && (
          <View className="flex-row items-center bg-amber-100 p-3 rounded-xl mb-4">
            <AlertCircle size={18} color="#92400E" />
            <Text className="ml-2 text-sm text-amber-800 font-medium">
              Important: {info.notice || "Please read and acknowledge."}
            </Text>
          </View>
        )}

        <View className="mb-2">
          <Text className="text-xl font-bold text-black mb-1">{info.title}</Text>
          <Text className="text-gray-500 text-sm">{info.subtitle}</Text>
        </View>

        <Text className="text-xs text-neutral-400 mb-3">
          {updatedAgo} • {createdDate}
        </Text>

        <View className="flex-row gap-2 mb-5">
          <Pressable className="flex-1 bg-neutral-900 py-3 rounded-xl active:opacity-90">
            <Text className="text-white text-center font-semibold text-sm">
              Open Event
            </Text>
          </Pressable>
          <Pressable className="flex-1 bg-neutral-200 py-3 rounded-xl active:opacity-90">
            <Text className="text-neutral-800 text-center font-semibold text-sm">
              Acknowledge
            </Text>
          </Pressable>
        </View>

        <Card className="mb-5">
          <CardContent>
            <Text className="text-base text-gray-700 leading-6">
              {info.details ||
                `Due to logistics and sound checks, the event time has been adjusted. Gates open at ${info.time}.`}
            </Text>
          </CardContent>
        </Card>

        {info.headsUp && (
          <View className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-lg mb-6">
            <Text className="text-sm text-amber-800 font-semibold mb-1">
              Heads Up
            </Text>
            <Text className="text-sm text-gray-700">{info.headsUp}</Text>
          </View>
        )}

        <Text className="font-semibold text-black mb-2">Quick Facts</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {info.quickFacts?.map((fact, index) => (
            <Card key={index} className="w-[48%] mb-3">
              <CardContent>
                <Text className="text-xs text-gray-400 uppercase">{fact.label}</Text>
                <Text className="text-sm font-medium text-black mt-1">
                  {fact.value}
                </Text>
              </CardContent>
            </Card>
          ))}
        </View>

        {(info.attachments?.length && info.attachments?.length > 0) && (
          <View className="mb-6">
            <Text className="font-semibold text-black mb-2">
              Attachments & Resources
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {info.attachments.map((a, idx) => (
                <Pressable
                  key={idx}
                  className="border border-neutral-300 px-3 py-2 rounded-lg flex-row items-center"
                >
                  <FileText size={16} color="#555" />
                  <Text className="ml-2 text-sm text-neutral-700">{a.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <Card className="mb-6">
          <CardContent className="flex-row items-start gap-3">
            <MapPin size={20} color="#2563eb" />
            <View className="flex-1">
              <Text className="text-sm text-gray-700 font-medium">
                {info.location}
              </Text>
              <Text className="text-xs text-gray-500 mt-1">{info.address}</Text>
            </View>
          </CardContent>
        </Card>

        {info.contact && (
          <Pressable className="flex-row items-center justify-center py-3 bg-blue-100 rounded-xl active:opacity-80 mb-8">
            <Phone size={18} color="#2563eb" />
            <Text className="ml-2 text-blue-700 font-medium">
              Call: {info.contact}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default InfoDetails;
