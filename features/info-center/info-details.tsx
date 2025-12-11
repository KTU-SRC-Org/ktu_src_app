import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { AlertCircle, MapPin } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';
import InfoCenterHeader from '@/features/info-center/info-center-header';
import AttachmentsList from '@/features/info-center/attachement-list';
import { useNotificationQuery } from '@/hooks/notifications/use-notifications-query';
import { useAnnouncementQuery } from '@/hooks/announcement/use-announcements-query';
import { AnnouncementItem, NotificationItem } from './types';

interface InfoDetailsProps {
  id: string;
  type: 'notification' | 'announcement';
}

const InfoDetails = ({ id, type }: InfoDetailsProps) => {
  const { data: notification, isLoading: isLoadingNotif } = useNotificationQuery(
    type === 'notification' ? id : ''
  );
  const { data: announcement, isLoading: isLoadingAnnounce } = useAnnouncementQuery(
    type === 'announcement' ? id : ''
  );

  const isLoading = type === 'notification' ? isLoadingNotif : isLoadingAnnounce;
  const info = type === 'notification' ? notification : announcement;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (!info) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-400">Info not found</Text>
      </View>
    );
  }

  // Normalize data for display
  const isAnnouncement = type === 'announcement';
  const announceData = isAnnouncement ? (info as AnnouncementItem) : null;
  const notifData = !isAnnouncement ? (info as NotificationItem) : null;

  const title = info.title;
  const subtitle = announceData?.subtitle;
  const message = announceData ? announceData.body || announceData.summary : notifData?.body;
  const notice = announceData?.notice; // Notifications from DB don't strictly have 'notice' col, but `data` might.
  const headsUp = announceData?.headsUp;
  const details = announceData?.body; // Using body as details for now
  const location = announceData?.location;
  const address = announceData?.address;
  const quickFacts = announceData?.quickFacts;
  const attachments = announceData?.attachments as any; // Cast to match AttachmentList expected type if needed

  const timestamp = isAnnouncement ? announceData?.updatedAt || announceData?.createdAt : notifData?.createdAt;
  const updatedAgo = timestamp ? formatTime(timestamp) : '';

  return (
    <View className="flex-1 bg-white">
      <InfoCenterHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-col gap-8 pb-10">
        <View className={'flex flex-col'}>
          {isAnnouncement && announceData?.isImportant && (
            <View className="flex-row items-center bg-amber-100 p-4">
              <AlertCircle size={18} color="#92400E" />
              <Text className="ml-2 text-sm font-medium text-amber-800">
                Important: {notice || 'Please read and acknowledge.'}
              </Text>
            </View>
          )}
          <View className="flex flex-col gap-4 bg-neutral-100 px-4 py-8">
            <Text className="text-xl font-bold">{title}</Text>
            {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
          </View>
        </View>

        {updatedAgo && (
          <Text className="px-4 text-xs text-neutral-400">
            {updatedAgo}
          </Text>
        )}

        {message && (
          <View className={'px-4'}>
             {/* Styling differently if it's a simple message vs a "native" notice */}
            <View className={isAnnouncement ? "rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3" : "p-2"}>
               {isAnnouncement && <Text className="mb-1 text-sm font-semibold text-amber-800">Notice</Text>}
              <Text className="text-base text-gray-800">{message}</Text>
            </View>
          </View>
        )}

        <View className="flex-row gap-2 px-4">
          <Pressable className="flex-1 rounded-xl bg-neutral-900 py-3 active:opacity-90">
            <Text className="text-center text-sm font-semibold text-white">Open {isAnnouncement ? 'Event' : 'Link'}</Text>
          </Pressable>
          <Pressable className="flex-1 rounded-xl bg-neutral-200 py-3 active:opacity-90">
            <Text className="text-center text-sm font-semibold text-neutral-800">Acknowledge</Text>
          </Pressable>
        </View>

        {details && isAnnouncement && (
            <Card className="mx-4">
            <CardContent>
                <Text className="text-base leading-6 text-gray-700">
                {details}
                </Text>
            </CardContent>
            </Card>
        )}

        {headsUp && (
          <View className={'px-4'}>
            <View className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
              <Text className="mb-1 text-sm font-semibold text-amber-800">Heads Up</Text>
              <Text className="text-sm text-gray-700">{headsUp}</Text>
            </View>
          </View>
        )}

        {quickFacts && quickFacts.length > 0 && (
          <View className={'flex flex-col gap-2 px-4'}>
            <Text className="mb-2 font-semibold text-black">Quick Facts</Text>
            <View className="flex-row flex-wrap justify-between">
              {quickFacts.map((fact: any, index: number) => (
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

        {attachments && attachments.length > 0 && (
          <AttachmentsList resources={attachments} />
        )}

        {(location || address) && (
          <Card className={'mx-4'}>
            <CardContent className="flex-row items-start gap-3">
              <MapPin size={20} color="#2563eb" />
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700">{location}</Text>
                <Text className="mt-1 text-xs text-gray-500">{address}</Text>
              </View>
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

export default InfoDetails;
