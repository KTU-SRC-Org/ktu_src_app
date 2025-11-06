import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Ionicons } from '@expo/vector-icons';
import { getInitials } from '@/utils/profile.utils';

type ProfileHeaderProps = {
  imageUri?: string;
  fullName: string;
  indexNumber: string;
  level: string;
};

export const ProfileHeader = ({ 
  imageUri, 
  fullName, 
  indexNumber,
  level 
}: ProfileHeaderProps) => {
  return (
    <View className="mb-6">
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-8 pb-20 rounded-b-3xl"
      >
        <View className="items-center">
          <View className="mt-2 mb-3">
            <Avatar alt='avatar' className="border-4 h-28 w-28 border-white/30">
              {imageUri ? (
                <AvatarImage source={{ uri: imageUri }} />
              ) : null}
              <AvatarFallback className="bg-white/20">
                <Text className="text-2xl font-bold text-white">
                  {getInitials(fullName)}
                </Text>
              </AvatarFallback>
            </Avatar>
            <View className="absolute bottom-0 right-0 p-1.5 bg-green-500 border-3 border-white rounded-full">
              <View className="w-3 h-3" />
            </View>
          </View>
          
          {/* <Text className="text-2xl font-bold text-center text-white mb-0.5">
            {fullName || 'Student Name'}
          </Text> */}
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1">
              <Ionicons name="school" size={14} color="rgba(255,255,255,0.8)" />
              <Text className="text-sm text-white/80">
                {indexNumber || 'Index Number'}
              </Text>
            </View>
            <Text className="text-white/50">•</Text>
            <Text className="text-sm text-white/80">
              {level || 'Level'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};