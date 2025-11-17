import { View, Text, ScrollView, Pressable } from 'react-native';
import { infoData } from '@/features/info-center/index';
import { AlertCircle, MapPin } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';
import InfoCenterHeader from '@/features/info-center/info-center-header';
import AttachmentsList from '@/features/info-center/attachement-list';

const InfoDetails = ({ id }: { id: string }) => {
  const info = infoData.find((item) => item.id === id);

  if (!info) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400">Info not found</Text>
      </View>
    );
  }

  const updatedAgo = info.updatedAt && formatTime(info.updatedAt);
  const createdDate = info.createdAt && formatTime(info.createdAt);

  return (
    <View className="flex-1 bg-white">
      <InfoCenterHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-col gap-8 pb-2">
        <View className={'flex flex-col'}>
          {info.isImportant && (
            <View className="flex-row items-center bg-amber-100 p-4">
              <AlertCircle size={18} color="#92400E" />
              <Text className="ml-2 text-sm font-medium text-amber-800">
                Important: {info.notice || 'Please read and acknowledge.'}
              </Text>
            </View>
          )}
          <View className="flex flex-col gap-4 bg-neutral-200 px-4 py-8">
            <Text className="text-xl font-bold">{info.title}</Text>
            <Text className="text-sm text-gray-500">{info.subtitle}</Text>
          </View>
        </View>

        {(info.updatedAt || info.createdAt) && (
          <Text className="px-4 text-xs text-neutral-400">
            {updatedAgo} • {createdDate}
          </Text>
        )}

        {info.message && (
          <View className={'px-4'}>
            <View className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
              <Text className="mb-1 text-sm font-semibold text-amber-800">Notice!!!</Text>
              <Text className="text-sm text-gray-700">{info.message}</Text>
            </View>
          </View>
        )}

        <View className="flex-row gap-2 px-4">
          <Pressable className="flex-1 rounded-xl bg-neutral-900 py-3 active:opacity-90">
            <Text className="text-center text-sm font-semibold text-white">Open Event</Text>
          </Pressable>
          <Pressable className="flex-1 rounded-xl bg-neutral-200 py-3 active:opacity-90">
            <Text className="text-center text-sm font-semibold text-neutral-800">Acknowledge</Text>
          </Pressable>
        </View>

        <Card className="mx-4">
          <CardContent>
            <Text className="text-base leading-6 text-gray-700">
              {info.details ||
                `Due to logistics and sound checks, the event time has been adjusted. Gates open at ${info.time}.`}
            </Text>
          </CardContent>
        </Card>

        {info.headsUp && (
          <View className={'px-4'}>
            <View className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
              <Text className="mb-1 text-sm font-semibold text-amber-800">Heads Up</Text>
              <Text className="text-sm text-gray-700">{info.headsUp}</Text>
            </View>
          </View>
        )}

        {info.quickFacts && info.quickFacts?.length > 0 && (
          <View className={'flex flex-col gap-2 px-4'}>
            <Text className="mb-2 font-semibold text-black">Quick Facts</Text>
            <View className="flex-row flex-wrap justify-between">
              {info.quickFacts?.map((fact, index) => (
                <Card key={index} className="mb-3 w-[48%]">
                  <CardContent>
                    <Text className="text-xs uppercase text-gray-400">{fact.label}</Text>
                    <Text className="mt-1 text-sm font-medium">{fact.value}</Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </View>
        )}

        {info.attachments?.length && info.attachments?.length > 0 && (
          <AttachmentsList resources={info.attachments} />
        )}

        {(info.location || info.address) && (
          <Card className={'mx-4'}>
            <CardContent className="flex-row items-start gap-3">
              <MapPin size={20} color="#2563eb" />
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700">{info.location}</Text>
                <Text className="mt-1 text-xs text-gray-500">{info.address}</Text>
              </View>
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

export default InfoDetails;
