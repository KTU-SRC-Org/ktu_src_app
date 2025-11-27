import {SafeAreaView} from "react-native-safe-area-context";
import AccountVerification from "@/features/settings/security/account-verification";
import {Stack} from "expo-router";

const AccountVerificationScreen = () => {
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Account Verification",
        }}
      />
      <AccountVerification/>
    </SafeAreaView>
  )
}
export default AccountVerificationScreen;