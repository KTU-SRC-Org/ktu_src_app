import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { getInitials } from '@/utils/profile.utils';

type ProfileHeaderProps = {
  imageUri?: string;
  fullName: string;
  indexNumber: string;
  level: string;
  verified: boolean;
};

export const ProfileHeader = ({ imageUri, fullName, indexNumber, level, verified }: ProfileHeaderProps) => {
  return (
    <View className="mb-6">
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-b-3xl px-6 pb-20 pt-8">
        <View className="items-center">
          <View className="mb-3 mt-2">
            <Avatar alt="avatar" className="h-28 w-28 border-4 border-white/30">
              {imageUri ? <AvatarImage source={{ uri: imageUri }} /> : null}
              <AvatarFallback className="bg-white/20">
                <Text className="text-2xl font-bold text-white">{getInitials(fullName)}</Text>
              </AvatarFallback>
            </Avatar>
            <View className="absolute bottom-1 right-3">
              {verified ? (
                <MaterialIcons name="verified" size={20} color="#FFFFFF" />
              ): (
                <MaterialIcons name="info-outline" size={20} color="#FFFFFF" />
              )}
            </View>
          </View>

          {/* <Text className="text-2xl font-bold text-center text-white mb-0.5">
            {fullName || 'Student Name'}
          </Text> */}
          {/*<View className="flex-row items-center gap-2">*/}
          {/*  <View className="flex-row items-center gap-1">*/}
          {/*    <Ionicons name="school" size={14} color="rgba(255,255,255,0.8)" />*/}
          {/*    <Text className="text-sm text-white/80">{indexNumber || 'Index Number'}</Text>*/}
          {/*  </View>*/}
          {/*  <Text className="text-white/50">•</Text>*/}
          {/*  <Text className="text-sm text-white/80">{level || 'Level'}</Text>*/}
          {/*</View>*/}
        </View>
      </LinearGradient>
    </View>
  );
};
