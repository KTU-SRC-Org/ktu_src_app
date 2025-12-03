import {Stack} from "expo-router";
import NotificationOptions from "@/features/settings/notifications/notification-options";
import {View} from "react-native";

const NotificationsScreen = () => {
  return(
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Edit Notification"}}/>
      <NotificationOptions/>
    </View>
  )
}
export default NotificationsScreen;