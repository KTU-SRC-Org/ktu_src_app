import { View, Pressable, Text } from "react-native";
import {TabKeys} from "@/types/events.types";

const eventTabOptions: {key: TabKeys, label: string}[] = [
  {key: "featured", label: "Featured"},
  {key: "popular", label: "Popular"},
  {key: "upcoming", label: "Upcoming"},
]
const EventsTabs = ({ selected,setSelected}: {selected: string, setSelected: (tab: TabKeys) => void}) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 gap-4">
      {eventTabOptions.map((option) => {
        const active = selected === option.key;
        return(
          <Pressable
            key={option.key}
            onPress={() => setSelected(option.key)}
            className={`flex-1 py-3 rounded-md items-center ${active ? "bg-neutral-800" : "bg-neutral-200"}`}
          >
            <Text className={`font-semibold ${active && "text-white"}`}>
              {option.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  );
};

export default EventsTabs;
