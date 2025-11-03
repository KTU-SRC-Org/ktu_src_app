import { SafeAreaView } from "react-native-safe-area-context";
import InfoList, {InfoCenterType} from "@/features/info-center/info-list";
import {useLocalSearchParams} from "expo-router";

export default function InfoCenterScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <InfoList type={type as InfoCenterType}/>
    </SafeAreaView>
  );
}
