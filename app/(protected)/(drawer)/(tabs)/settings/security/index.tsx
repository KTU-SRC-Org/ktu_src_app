import { ScrollView} from 'react-native';
import {Href, Stack, useRouter} from 'expo-router';
import { SettingSection } from '@/features/settings/setting-section';
import {securityItems} from '@/config/settings.config';
import { SettingItem } from '@/types/settings.types';
import EditModal from "@/components/builders/edit-modal";
import {useRef, useState} from "react";
import ChangePasswordForm from "@/features/settings/security/change-password-form";
import FormModal from "@/components/builders/form.modal";
import DeleteAccount from "@/features/settings/security/delete-account";

const PasswordAndSecurityScreen = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);
  const formRef = useRef<any>(null);

  const router = useRouter();

  const handleItemPress = (item: SettingItem) => {
    if (item.disabled || item.comingSoon) return;

    if(item.id === "change-password"){
      setOpenChangePassword(true);
      return;
    }
    if(item.id === "delete-account") {
      setOpenDeleteAccount(true);
      return
    }

    if (item.onPress) {
      item.onPress();
    } else if (item.link) {
      console.log('Navigate to:', item.link);
      router.push(item.link as Href);
    }
  };

  // Helper for save change password
  const handleSubmit = () => {
    alert("Password change successfully");
    setOpenChangePassword(false);
  }

  return (
   <>
     <ScrollView
       className="flex-1"
       contentInsetAdjustmentBehavior={"automatic"}
       showsVerticalScrollIndicator={false}>
       <Stack.Screen
         options={{
           title: "Password & Security",
         }}
       />
       {/* Security Sections */}
       { securityItems.map((section) => (
         <SettingSection
           key={section.id}
           section={section}
           onItemPress={handleItemPress}
         />
       ))}
     </ScrollView>
     {openChangePassword && (
       <EditModal
         visible={openChangePassword}
         title={"Change Password"}
         disabledSave={!canSave}
         onClose={() => setOpenChangePassword(false)}
         onSave={() => formRef.current?.submitForm()}
       >
         <ChangePasswordForm
           ref={formRef}
           setCanSave={() => setCanSave}
           onSubmit={handleSubmit}
         />
       </EditModal>
     )}
     {openDeleteAccount && (
       <FormModal
         visible={openDeleteAccount}
         onClose={() => setOpenDeleteAccount(false)}
       >
         <DeleteAccount
           visible={openDeleteAccount}
           email={"emmsom506@gmail.com"} //account email
         />
       </FormModal>
     )}
   </>
  );
};

export default PasswordAndSecurityScreen;
