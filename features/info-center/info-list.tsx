import { FlatList, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import InfoCard from '@/features/info-center/info-card';
import InfoCenterHeader from '@/features/info-center/info-center-header';
import { useNotificationsQuery } from '@/hooks/notifications/use-notifications-query';
import { useAnnouncementsQuery } from '@/hooks/announcement/use-announcements-query';
import { NotificationItem, AnnouncementItem } from '@/features/info-center/types';

export type InfoCenterType = 'notifications' | 'announcements';

const InfoList = ({ type }: { type: InfoCenterType }) => {
  const [activeTab, setActiveTab] = useState<InfoCenterType>(type);

  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isRefetching: isRefetchingNotifications,
    refetch: refetchNotifications,
  } = useNotificationsQuery({
    enabled: activeTab === 'notifications',
    // userId: 'current-user-id', // TODO: Get from auth context
  });

  const {
    data: announcements,
    isLoading: isLoadingAnnouncements,
    isRefetching: isRefetchingAnnouncements,
    refetch: refetchAnnouncements,
  } = useAnnouncementsQuery({
    enabled: activeTab === 'announcements',
  });

  const data = activeTab === 'notifications' ? notifications : announcements;
  const isLoading = activeTab === 'notifications' ? isLoadingNotifications : isLoadingAnnouncements;

  const renderItem = ({ item }: { item: NotificationItem | AnnouncementItem }) => {
    // Determine props based on item type
    // We can differentiate by checking for unique properties or just casting if we're confident
    const isNotification = 'recipientId' in item;
    
    // Common props
    const props = {
        href: { pathname: '/info-center/info/[id]', params: { id: item.id } } as const, // Cast to satisfy Expo Router types
        title: item.title,
    };

    if (isNotification) {
        const notif = item as NotificationItem;
        return (
            <View key={item.id} className="pb-4">
                <InfoCard
                    {...props}
                    href={{ pathname: '/info-center/info/[id]', params: { id: item.id, type: 'notification' } }}
                    message={notif.body || 'No details available'}
                    timestamp={notif.createdAt}
                    unread={!notif.read}
                    badge={notif.type}
                />
            </View>
        );
    } else {
        const announce = item as AnnouncementItem;
        console.log('Rendering announcement:', announce);
        return (
            <View key={item.id} className="pb-4">
                <InfoCard
                    {...props}
                    href={{ pathname: '/info-center/info/[id]', params: { id: item.id, type: 'announcement' } }}
                    message={announce.summary || announce.body || 'No details available'}
                    timestamp={announce.startsAt || announce.createdAt}
                    isImportant={announce.isImportant}
                    badge={announce.category}
                />
            </View>
        );
    }
  };

  const EmptyState = () => (
    <View className="items-center justify-center flex-1 py-20">
      <Text className="text-neutral-400">
        {activeTab === 'notifications' ? 'No notifications yet' : 'No announcements yet'}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <InfoCenterHeader title={'Notification & Announcements'} />
      <View className="flex-row items-center justify-start gap-4 px-4 py-2 ">
        <Pressable
          onPress={() => setActiveTab('notifications')}
          className={`rounded-full px-4 py-2 ${
            activeTab === 'notifications'
              ? 'bg-neutral-300'
              : 'border border-neutral-200 bg-transparent'
          }`}>
          <Text
            className={`${
              activeTab === 'notifications' ? 'font-semibold text-black' : 'text-gray-400'
            }`}>
            Notification
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('announcements')}
          className={`rounded-full px-4 py-2 ${
            activeTab === 'announcements'
              ? 'bg-neutral-300'
              : 'border border-neutral-200 bg-transparent'
          }`}>
          <Text
            className={`${
              activeTab === 'announcements' ? 'font-semibold text-black' : 'text-gray-400'
            }`}>
            Announcement
          </Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View className="items-center justify-center flex-1">
            <ActivityIndicator size="small" color="#000000" />
        </View>
      ) : (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 20 }}
            renderItem={renderItem}
            ListEmptyComponent={EmptyState}
            refreshing={activeTab === 'notifications' ? isRefetchingNotifications : isRefetchingAnnouncements}
            onRefresh={activeTab === 'notifications' ? refetchNotifications : refetchAnnouncements}
        />
      )}
    </View>
  );
};
export default InfoList;
