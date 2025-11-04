import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { infoData } from "@/features/info-center/index";
import { AlertCircle, MapPin, Phone } from "lucide-react-native";
import { Card, CardContent } from '@/components/ui/card';
import {formatTime} from "@/lib/utils";
import InfoCenterHeader from "@/features/info-center/info-center-header";
import AttachmentsList from "@/features/info-center/attachement-list";

const InfoDetails = ({id}: {id: string}) => {

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
      <InfoCenterHeader/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-col gap-8 pb-2"
      >
        <View className={"flex flex-col"}>
          {info.isImportant && (
            <View className="flex-row items-center bg-amber-100 p-4">
              <AlertCircle size={18} color="#92400E" />
              <Text className="ml-2 text-sm text-amber-800 font-medium">
                Important: {info.notice || "Please read and acknowledge."}
              </Text>
            </View>
          )}
          <View className="flex flex-col gap-4 bg-neutral-200 px-4 py-8">
            <Text className="text-xl font-bold">{info.title}</Text>
            <Text className="text-gray-500 text-sm">{info.subtitle}</Text>
          </View>
        </View>

        {(info.updatedAt || info.createdAt) && (
          <Text className="text-xs text-neutral-400 px-4">
            {updatedAgo} • {createdDate}
          </Text>
        )}

        <View className="flex-row gap-2 px-4">
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

        <Card className="mx-4">
          <CardContent>
            <Text className="text-base text-gray-700 leading-6">
              {info.details ||
                `Due to logistics and sound checks, the event time has been adjusted. Gates open at ${info.time}.`}
            </Text>
          </CardContent>
        </Card>

        {info.headsUp && (
          <View className={"px-4"}>
            <View className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-lg">
              <Text className="text-sm text-amber-800 font-semibold mb-1">
                Heads Up
              </Text>
              <Text className="text-sm text-gray-700">{info.headsUp}</Text>
            </View>
          </View>
        )}

        {(info.quickFacts && info.quickFacts?.length > 0) && (
          <View className={"flex flex-col gap-2 px-4"}>
            <Text className="font-semibold text-black mb-2">Quick Facts</Text>
            <View className="flex-row flex-wrap justify-between">
              {info.quickFacts?.map((fact, index) => (
                <Card key={index} className="w-[48%] mb-3">
                  <CardContent>
                    <Text className="text-xs text-gray-400 uppercase">{fact.label}</Text>
                    <Text className="text-sm font-medium mt-1">
                      {fact.value}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </View>
        )}

        {(info.attachments?.length && info.attachments?.length > 0) && (
          <AttachmentsList resources={info.attachments} />
        )}

        {(info.location || info.address) && (
          <Card className={"mx-4"}>
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
        )}
      </ScrollView>
    </View>
  );
};

export default InfoDetails;
