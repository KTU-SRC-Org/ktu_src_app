import { useState } from 'react';
import { ScrollView, View, Text, Switch } from 'react-native';

type NotificationItem = {
  id: string;
  label: string;
};

type NotificationGroup = {
  title: string;
  items: NotificationItem[];
};

const notificationGroups: NotificationGroup[] = [
  {
    title: 'General Notifications',
    items: [
      { id: '1', label: 'Allow Notifications' },
      { id: '2', label: 'App Updates' },
    ],
  },
  {
    title: 'Email Notifications',
    items: [
      { id: '3', label: 'Email Alerts' },
      { id: '4', label: 'Promotions' },
    ],
  },
  {
    title: 'Reminders & Activity',
    items: [
      { id: '10', label: 'Event Reminders' },
      { id: '11', label: 'Marketplace Activity' },
    ],
  },
];

const NotificationOptions = () => {
  const initialState = notificationGroups.reduce(
    (acc, group) => {
      group.items.forEach((item) => {
        acc[item.id] = false;
      });
      return acc;
    },
    {} as { [key: string]: boolean }
  );

  const [enabled, setEnabled] = useState<{ [key: string]: boolean }>(initialState);

  const toggleSwitch = (id: string) => {
    setEnabled((prev) => (
      { ...prev,
        [id]: !prev[id]
      }
    ));
  };

  return (
    <ScrollView
      className="flex-1"
      contentInsetAdjustmentBehavior={"automatic"}
      showsVerticalScrollIndicator={false}
    >
      <View className={"flex-col gap-4 p-4"}>
        {notificationGroups.map((group) => (
          <NotificationGroupComponent
            key={group.title}
            group={group}
            enabled={enabled}
            toggleSwitch={toggleSwitch}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default NotificationOptions;

const NotificationGroupComponent = ({
  group,
  enabled,
  toggleSwitch,
}: {
  group: NotificationGroup;
  enabled: { [key: string]: boolean };
  toggleSwitch: (id: string) => void;
}) => {
  return (
    <View className={"flex-col gap-2"}>
      <Text className="font-semibold text-gray-400">{group.title}</Text>
      <View className="overflow-hidden rounded-lg bg-white">
        {group.items.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center justify-between p-2">
              <Text className="text-base text-gray-800">{item.label}</Text>
              <Switch
                value={enabled[item.id]}
                onValueChange={() => toggleSwitch(item.id)}
                trackColor={{ false: '#d1d5db', true: '#F5882B' }}
                thumbColor={enabled[item.id] ? '#ffffff' : '#f9fafb'}
              />
            </View>
            {index < group.items.length - 1 &&
              <View className="border-b border-gray-200" />
            }
          </View>
        ))}
      </View>
    </View>
  );
};
