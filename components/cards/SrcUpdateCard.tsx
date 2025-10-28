import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
    readMoreLink?: string;
    avatarUrl?: string;
    iconUrl?: string;
    onDownload?: () => void;
    onShare?: () => void;
    onCopy?: () => void;
    onExternalLink?: () => void;
    onReadMore?: () => void;
}

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
                              }: NotificationCardProps) {
    return (
        <View className="w-full">
            <LinearGradient
                colors={['#FF2E4C', '#1E2A7B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="!rounded-xl overflow-hidden relative"
                style={{borderRadius: 10}}
            >
                <Card className="bg-transparent border-0 shadow-none p-0 relative">
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
                                            <Text className="text-purple-600 font-semibold text-sm">SRC</Text>
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
                                <View className="bg-white/20 rounded-full p-2">
                                    <View className="size-6" />
                                </View>
                            )}
                        </View>

                        {/* Description */}
                        <View className="mb-3 px-8">
                            <Text className="text-white text-sm leading-relaxed">
                                {description}
                            </Text>
                            {readMoreLink && (
                                <TouchableOpacity onPress={onReadMore} className="mt-1">
                                    <Text className="text-white font-semibold text-sm">
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
                {/*<View  className='bg-red-400 h-10 absolute'>*/}
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
        <View className="flex-1 bg-gray-100 p-4 justify-center">
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

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
});