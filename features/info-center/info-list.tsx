import {FlatList, Pressable, Text, View} from "react-native";
import {useState} from "react";
import {InfoCardInterface, infoData} from "@/features/info-center/index";
import InfoCard from "@/features/info-center/info-card";

export type InfoCenterType = "notifications" | "announcements"

const InfoList = ({type} : {type: InfoCenterType}) => {
  const [activeTab, setActiveTab] = useState<InfoCenterType>(type);

  const notifications = infoData.filter(item => item.type === "notification");
  const announcements = infoData.filter(item => item.type === "announcement");

  const data = activeTab === "notifications" ? notifications : announcements;

  const renderList = ({item}: {item: InfoCardInterface}) => (
    <View className={"pb-4"}>
      <InfoCard
        key={item.id}
        href={{pathname: "/info-center/info/[id]", params: {id: item.id}}}
        title={item.title}
        message={item.message}
        timestamp={item.timestamp}
      />
    </View>
  );

  return(
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-start pb-4 gap-4 ">
        <Pressable
          onPress={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "notifications"
              ? "bg-neutral-300"
              : "bg-transparent border border-neutral-200"
          }`}
        >
          <Text
            className={`${
              activeTab === "notifications" ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Notification
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("announcements")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "announcements"
              ? "bg-neutral-300"
              : "bg-transparent border border-neutral-200"
          }`}
        >
          <Text
            className={`${
              activeTab === "announcements" ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Announcement
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 20 }}
        renderItem={renderList}
      />
    </View>
  )
}
export default InfoList