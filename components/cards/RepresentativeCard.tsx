import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface RepresentativeData {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
}

type RepresentativeCardProps = RepresentativeData;

// Representative Card Component
export function RepresentativeCard({
  name,
  position,
  description,
  imageUrl,
}: RepresentativeCardProps) {
  return (
    <View className="w-full px-4">
      <Card className="overflow-hidden rounded-2xl border-0 bg-[#3D2B28] p-2">
        <CardContent className="">
          <View className="flex flex-row items-center gap-2">
            {/* Image Section */}
            <View>
              <View className="relative h-[105px] w-[105px] !rounded-[10px]">
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  contentFit="contain"
                  transition={300}
                />
                {/* Yellow accent border */}
              </View>
              {/* Position Badge */}
              <View className="">
                <Text className="text-sm font-semibold text-[#FFEDAC]">{position}</Text>
              </View>
            </View>

            {/* Content Section */}
            <View className="flex-1 justify-between ">
              <View>
                <Text className="mb-2 text-xl font-bold text-[#FFEDAC]">{name}</Text>
                <Text className="text-xs leading-5 text-[#FFEDAC]/90">{description}</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
