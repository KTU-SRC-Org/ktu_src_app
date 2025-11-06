import { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, View, RefreshControl } from 'react-native';
import { ProfileHeader } from '@/components/profile/profile-header';
import { InfoSection } from '@/components/profile/info-section';
import { InfoField } from '@/components/profile/info-field';
import { FieldSeparator } from '@/components/shared/field-seperator';
import { ProfileSkeleton } from '@/components/profile/profile-skeleton';
import { EditButton } from '@/components/profile/edit-button';
import { ProfileData } from '@/types/profile.types';
import { getProgramLabel, getLevelLabel, formatPhoneNumber } from '@/utils/profile.utils';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    imageUri: '',
    fullName: 'John Kwame Mensah',
    faculty: 'Faculty of Engineering',
    program: 'btech_cs',
    indexNumber: 'CS/BTech/22/001',
    phoneNumber: '0241234567',
    level: 'l300',
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  const handleEditProfile = () => {
    console.log('Navigate to edit profile');
    // router.push('/profile/edit');
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >

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

      <EditButton onPress={handleEditProfile} />

      <View className="h-6" />
    </ScrollView>
  );
};

export default ProfileScreen;