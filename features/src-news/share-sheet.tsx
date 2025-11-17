import * as Clipboard from 'expo-clipboard';
import { Modal, View, Text, Pressable, ScrollView, Linking } from 'react-native';
import { X, Mail, Copy, Upload } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

interface ShareOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

interface ShareSheetProps {
  visible: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
  body?: string;
}

const ShareSheet: React.FC<ShareSheetProps> = ({ visible, onClose, shareUrl, title, body }) => {
  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(shareUrl);
    alert('Link copied to clipboard');
    onClose();
  };

  const shareOptions: ShareOption[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MaterialCommunityIcons name="whatsapp" size={30} color="#fff" />,
      color: '#25D366',
      onPress: () => {
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(title + ' ' + shareUrl)}`);
        onClose();
      },
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <MaterialCommunityIcons name="instagram" size={30} color="#fff" />,
      color: '#E4405F',
      onPress: async () => {
        const supported = await Linking.canOpenURL('instagram://app');
        if (supported) {
          Linking.openURL('instagram://app');
        } else {
          Linking.openURL('https://www.instagram.com/');
        }
        onClose();
      },
    },

    // {
    //   id: "telegram",
    //   name: "Telegram",
    //   icon: <MaterialCommunityIcons name="telegram" size={30} color="#fff" />,
    //   color: "#229ED9",
    //   onPress: () => {
    //     Linking.openURL(
    //       `https://t.me/share/url?url=${encodeURIComponent(
    //         shareUrl
    //       )}&text=${encodeURIComponent(title)}`
    //     );
    //     onClose();
    //   },
    // },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <MaterialCommunityIcons name="facebook" size={30} color="#fff" />,
      color: '#1877F2',
      onPress: () => {
        Linking.openURL(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        );
        onClose();
      },
    },
    {
      id: 'x',
      name: 'X',
      icon: <MaterialCommunityIcons name="twitter" size={30} color="#fff" />,
      color: '#000000',
      onPress: () => {
        Linking.openURL(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(shareUrl)}`
        );
        onClose();
      },
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <MaterialCommunityIcons name="linkedin" size={30} color="#fff" />,
      color: '#0A66C2',
      onPress: () => {
        Linking.openURL(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        );
        onClose();
      },
    },
    // {
    //   id: "tiktok",
    //   name: "TikTok",
    //   icon: <MaterialCommunityIcons name={"tiktok" as any} size={30} color="#fff" />,
    //   color: "#000000",
    //   onPress: () => {
    //     Linking.openURL("https://www.tiktok.com/upload?url=" + shareUrl);
    //     onClose();
    //   },
    // },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: <MaterialCommunityIcons name="snapchat" size={30} color="#fff" />,
      color: '#FFFC00',
      onPress: () => {
        Linking.openURL('https://www.snapchat.com/scan?attachmentUrl=' + shareUrl);
        onClose();
      },
    },
    {
      id: 'threads',
      name: 'Threads',
      icon: <MaterialCommunityIcons name="at" size={30} color="#fff" />,
      color: '#000000',
      onPress: () => {
        Linking.openURL('https://www.threads.net/intent/post?url=' + shareUrl);
        onClose();
      },
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail size={28} color="#fff" />,
      color: '#EA4335',
      onPress: () => {
        Linking.openURL(
          `mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(body + '\n\n' + shareUrl)}`
        );
        onClose();
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      allowSwipeDismissal={true}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
        <View className="flex-col gap-4 rounded-t-2xl bg-white">
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="relative flex-row items-center justify-center px-5 py-4">
              <View className={'flex-row items-center gap-1'}>
                <Upload color={'#000'} size={16} />
                <Text className="font-semibold">Share</Text>
              </View>
              <Pressable onPress={onClose} className="absolute right-5 p-1">
                <X size={24} color="#000" />
              </Pressable>
            </View>
            <View className="px-4 pb-4">
              <View className="rounded-lg bg-neutral-100 p-2">
                <Text className="mb-1 text-base font-semibold text-black" numberOfLines={1}>
                  {title}
                </Text>
                {body ? (
                  <Text className="text-sm text-neutral-700" numberOfLines={1}>
                    {body}
                  </Text>
                ) : null}
                <Text
                  className="mt-1 text-xs text-blue-600"
                  onPress={() => {
                    onClose();
                    Linking.openURL(shareUrl);
                  }}>
                  {shareUrl}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 14, gap: 20 }}>
              {shareOptions.map((option) => (
                <Pressable
                  key={option.id}
                  className="w-[70px] items-center"
                  onPress={option.onPress}>
                  <View
                    className="h-[60px] w-[60px] items-center justify-center rounded-xl"
                    style={{ backgroundColor: option.color }}>
                    {option.icon}
                  </View>
                  <Text className="text-center text-xs text-black">{option.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
          <View className={'flex-col gap-2 p-4'}>
            <Pressable
              className="flex-row items-center justify-between rounded-md border border-neutral-200 bg-neutral-100 p-2"
              onPress={handleCopyLink}>
              <View>
                <Text className="text-lg">Copy Link</Text>
              </View>
              <Copy size={20} color="#000" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ShareSheet;
