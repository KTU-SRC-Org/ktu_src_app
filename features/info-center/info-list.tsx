import { FlatList, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import { InfoCardInterface, infoData } from '@/features/info-center/index';
import InfoCard from '@/features/info-center/info-card';
import InfoCenterHeader from '@/features/info-center/info-center-header';

export type InfoCenterType = 'notifications' | 'announcements';

const InfoList = ({ type }: { type: InfoCenterType }) => {
  const [activeTab, setActiveTab] = useState<InfoCenterType>(type);

  const notifications = infoData.filter((item) => item.type === 'notification');
  const announcements = infoData.filter((item) => item.type === 'announcement');

  const data = activeTab === 'notifications' ? notifications : announcements;

  const renderList = ({ item }: { item: InfoCardInterface }) => (
    <View className={'pb-4'}>
      <InfoCard
        key={item.id}
        href={{ pathname: '/info-center/info/[id]', params: { id: item.id } }}
        title={item.title}
        message={item.message}
        timestamp={item.timestamp}
      />
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

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 20 }}
        renderItem={renderList}
      />
    </View>
  );
};
export default InfoList;
