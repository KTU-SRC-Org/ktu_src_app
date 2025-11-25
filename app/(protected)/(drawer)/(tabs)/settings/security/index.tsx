import { ScrollView} from 'react-native';
import {Href, useRouter} from 'expo-router';
import { SettingSection } from '@/features/settings/setting-section';
import {securityItems} from '@/config/settings.config';
import { SettingItem } from '@/types/settings.types';
import EditModal from "@/components/builders/edit-modal";
import {useRef, useState} from "react";
import ChangePasswordForm from "@/features/settings/security/change-password-form";

const PasswordAndSecurityScreen = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [canSave, setCanSave] = useState<boolean>(false);
  const formRef = useRef<any>(null);

  const router = useRouter();

  const handleItemPress = (item: SettingItem) => {
    if (item.disabled || item.comingSoon) return;

    if(item.id === "change-password"){
      setOpenChangePassword(true);
      return;
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
    <ScrollView
      className="flex-1"
      contentInsetAdjustmentBehavior={"automatic"}
      showsVerticalScrollIndicator={false}>
      {/* Security Sections */}
      { securityItems.map((section) => (
        <SettingSection
          key={section.id}
          section={section}
          onItemPress={handleItemPress}
        />
      ))}
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
    </ScrollView>
  );
};

export default PasswordAndSecurityScreen;
