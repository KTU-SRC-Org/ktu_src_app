import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { interpolate } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface RepresentativeData {
    id: string;
    name: string;
    position: string;
    description: string;
    imageUrl: string;
}

interface RepresentativeCardProps extends RepresentativeData {}

// Representative Card Component
export function RepresentativeCard({
                                name,
                                position,
                                description,
                                imageUrl,
                            }: RepresentativeCardProps) {
    return (
        <View className="w-full px-4">
            <Card className="bg-[#3D2B28] border-0 rounded-2xl overflow-hidden p-2">
                <CardContent className="">
                    <View className="flex flex-row">
                        {/* Image Section */}
                        <View className="w-[140px] h-[180px] relative">
                            <Image
                                source={{ uri: imageUrl }}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="contain"
                                transition={300}
                            />
                            {/* Yellow accent border */}

                        </View>

                        {/* Content Section */}
                        <View className="flex-1 p-4 justify-between">
                            <View>
                                <Text className="text-white font-bold text-xl mb-2">
                                    {name}
                                </Text>
                                <Text className="text-gray-300 text-xs leading-5">
                                    {description}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Position Badge */}
                    <View className="">
                        <Text className="text-white font-semibold text-sm">
                            {position}
                        </Text>
                    </View>
                </CardContent>
            </Card>
        </View>
    );
}


