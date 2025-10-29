import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download, Share2, Copy, ExternalLink } from 'lucide-react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import MemoMicMegaphone from '@/components/icons/MicMegaphone'

interface NotificationCardProps {
    title: string;
    timestamp: string;
    description: string;
    gradientColors?: [string, string];
    readMoreLink?: string;
    avatarUrl?: string;
    iconUrl?: string;
    onDownload?: () => void;
    onShare?: () => void;
    onCopy?: () => void;
    onExternalLink?: () => void;
    onReadMore?: () => void;
}
export function SRCUpdateCard({
                                  title = "SRC Update – WiFi Expansion",
                                  timestamp = "2h ago",
                                  description = "The new Starlink-powered WiFi hotspots are now live at the Library and Engineering Block. Students can log in using their institutional email for unlimited access...",
                                  readMoreLink = "[Read More]",
                                  avatarUrl,
                                  iconUrl,
                                  onDownload,
                                  onShare,
                                  onCopy,
                                  onExternalLink,
                                  onReadMore,
                                  gradientColors = ['#FF2E4C', '#1E2A7B'],
                              }: NotificationCardProps) {
    return (
        <View className="w-full">
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="!rounded-xl overflow-hidden relative"
                style={{borderRadius: 10}}
            >
                <Card className="relative p-0 bg-transparent border-0 shadow-none">
                    <CardContent className="px-4 py-3">
                        {/* Header Section */}
                        <View className="flex flex-row items-start justify-between mb-1">
                            <View className="flex flex-row items-center flex-1 gap-3">
                                {/* Avatar */}
                                <Avatar alt='src' className="size-10">
                                    {avatarUrl ? (
                                        <AvatarImage source={{ uri: avatarUrl }} />
                                    ) : (
                                        <AvatarFallback className="bg-white">
                                            <Text className="text-sm font-semibold text-purple-600">SRC</Text>
                                        </AvatarFallback>
                                    )}
                                </Avatar>

                                {/* Title and Timestamp */}
                                <View className="flex-1">
                                    <Text className="text-white font-medium text-[13px] leading-tight">
                                        {title}
                                    </Text>
                                    <Text className="text-white/80 text-xs mt-0.5">
                                        {timestamp}
                                    </Text>
                                </View>
                            </View>

                            {/* Icon */}
                            {iconUrl && (
                                <View className="p-2 rounded-full bg-white/20">
                                    <View className="size-6" />
                                </View>
                            )}
                        </View>

                        {/* Description */}
                        <View className="px-8 mb-3">
                            <Text className="text-sm leading-relaxed text-white">
                                {description}
                            </Text>
                            {readMoreLink && (
                                <TouchableOpacity onPress={onReadMore} className="mt-1">
                                    <Text className="text-sm font-semibold text-white">
                                        {readMoreLink}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Action Buttons */}
                        <View className="flex flex-row items-center gap-5 pl-8">
                            <TouchableOpacity
                                onPress={onDownload}
                                className="flex flex-row items-center bg-white/10 py-[10px] px-[10px] rounded-full"
                                activeOpacity={0.7}
                            >
                                <Download color="white" size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onShare}
                                className="flex flex-row items-center bg-white/10 py-[10px] px-[10px] rounded-full"
                                activeOpacity={0.7}
                            >
                                <Share2 color="white" size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onCopy}
                                className="flex flex-row items-center bg-white/10 py-[10px] px-[10px] rounded-full"
                                activeOpacity={0.7}
                            >
                                <Copy color="white" size={20} />
                            </TouchableOpacity>

                            <View className="flex-1" />

                            <TouchableOpacity
                                onPress={onExternalLink}
                                className="flex flex-row items-center"
                                activeOpacity={0.7}
                            >
                                <ExternalLink color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                    </CardContent>

                </Card>
                {/*<View  className='absolute h-10 bg-red-400'>*/}
                {/*    <Image*/}
                {/*        style={styles.image}*/}
                {/*        className="w-full"*/}
                {/*        source={require('@/assets/images/blue-white-megaphone-announcement 1.png')}*/}
                {/*        placeholder={{ blurhash }}*/}
                {/*        contentFit="cover"*/}
                {/*        transition={1000}*/}
                {/*    />*/}
                {/*</View>*/}

                <View className='absolute -right-5 -top-4'>
                    <MemoMicMegaphone/>
                </View>
            </LinearGradient>
        </View>
    );
}

// Example Usage Component
export default function NotificationExample() {
    return (
        <View className="justify-center flex-1 p-4 bg-gray-100">
            <SRCUpdateCard
                title="SRC Update – WiFi Expansion"
                timestamp="2h ago"
                description="The new Starlink-powered WiFi hotspots are now live at the Library and Engineering Block. Students can log in using their institutional email for unlimited access..."
                onDownload={() => console.log('Download pressed')}
                onShare={() => console.log('Share pressed')}
                onCopy={() => console.log('Copy pressed')}
                onExternalLink={() => console.log('External link pressed')}
                onReadMore={() => console.log('Read more pressed')}
            />
        </View>
    );
}