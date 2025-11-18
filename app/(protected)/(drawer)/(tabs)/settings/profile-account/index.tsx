import { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import {ScrollView, View, RefreshControl, TextInput, Text} from 'react-native';
import { ProfileHeader } from '@/components/profile/profile-header';
import { InfoSection } from '@/components/profile/info-section';
import { InfoField } from '@/components/profile/info-field';
import { FieldSeparator } from '@/components/shared/field-seperator';
import { ProfileSkeleton } from '@/components/profile/profile-skeleton';
import { ProfileData } from '@/types/profile.types';
import { getProgramLabel, getLevelLabel, formatPhoneNumber } from '@/utils/profile.utils';
import EditModal from "@/components/builders/edit-modal";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditPhoneNumberFormType, EditPhoneNumberSchema} from "@/lib/schemas/settings";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    imageUri: '',
    fullName: 'John Kwame Mensah',
    faculty: 'Faculty of Engineering',
    program: 'btech_cs',
    indexNumber: 'CS/BTech/22/001',
    phoneNumber: '0241234567',
    level: 'l300',
  });

  const loadProfileData = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Fetch profile data from API
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProfileData();
    setRefreshing(false);
  };

  // const handleEditProfile = () => {
  //   console.log('Navigate to edit profile');
  //   // router.push('/profile/edit');
  // };

  const { control, handleSubmit, reset,watch, formState: { errors, isValid },
  } = useForm<EditPhoneNumberFormType>({
    resolver: zodResolver(EditPhoneNumberSchema),
    defaultValues: { phoneNumber: profileData.phoneNumber,},
    mode: 'onChange',
  });

  // Helper for saving edited phone number
  const onEditSave = (data: EditPhoneNumberFormType) => {
   setProfileData(prev => ({
     ...prev,
     phoneNumber: data.phoneNumber,
   }));
   setOpenEditModal(false);
  }

  useEffect(() => {
    loadProfileData();
    if (openEditModal) {
      reset({ phoneNumber: profileData.phoneNumber });
    }
  }, [openEditModal, profileData.phoneNumber, reset]);

  // Check input field is valid before enabling save button
  const phoneInput = watch("phoneNumber") as unknown as string;
  const hasChanged = phoneInput !== profileData.phoneNumber;
  const canSave = isValid && hasChanged;


  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior={"automatic"}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <Stack.Screen
        options={{
          title: profileData.fullName,
        }}
      />

      <ProfileHeader
        imageUri={profileData.imageUri}
        fullName={profileData.fullName}
        indexNumber={profileData.indexNumber}
        level={getLevelLabel(profileData.level)}
        verified={true} //Need verified field
      />

      <InfoSection title="Personal Information">
        <View className="px-2">
          <InfoField
            icon="person"
            label="Full Name"
            value={profileData.fullName}
            iconColor="#6366F1"
          />
          <FieldSeparator />
          <InfoField
            icon="call"
            label="Phone Number"
            value={formatPhoneNumber(profileData.phoneNumber)}
            iconColor="#10B981"
            editable={true}
            onEditPress={() => setOpenEditModal(true)}
          />
          <FieldSeparator />
          <InfoField
            icon="card"
            label="Index Number"
            value={profileData.indexNumber}
            iconColor="#F59E0B"
          />
        </View>
      </InfoSection>

      <InfoSection title="Academic Information">
        <View className="px-2">
          <InfoField
            icon="school"
            label="Faculty"
            value={profileData.faculty}
            iconColor="#8B5CF6"
          />
          <FieldSeparator />
          <InfoField
            icon="book"
            label="Program"
            value={getProgramLabel(profileData.program)}
            iconColor="#06B6D4"
          />
          <FieldSeparator />
          <InfoField
            icon="trending-up"
            label="Current Level"
            value={getLevelLabel(profileData.level)}
            iconColor="#EF4444"
          />
        </View>
      </InfoSection>

      {/*<EditButton onPress={handleEditProfile} />*/}

      <View className="h-6" />
      <EditModal
        visible={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleSubmit(onEditSave)}
        title={"Phone Number"}
        disabledSave={!canSave}
      >
        <View>
          <Controller
            control={control}
            name={"phoneNumber"}
            render={({ field: { onChange, onBlur, value } }) => (
              <View >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  textAlignVertical="top"
                  className="p-2 bg-gray-50 rounded-md border border-gray-100 h-40"
                />
                {errors.phoneNumber?.message && (
                  <Text className="text-rose-500">{errors.phoneNumber.message}</Text>
                )}
              </View>
            )}
          />
        </View>
      </EditModal>
    </ScrollView>
  );
};

export default ProfileScreen;
