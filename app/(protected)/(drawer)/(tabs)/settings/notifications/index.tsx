import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import NotificationOptions from "@/features/settings/notifications/notification-options";

const NotificationsScreen = () => {
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Edit Notification"}}/>
      <NotificationOptions/>
    </SafeAreaView>
  )
}
export default NotificationsScreen;