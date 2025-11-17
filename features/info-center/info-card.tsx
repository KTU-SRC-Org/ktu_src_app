import { Text, View, Pressable } from 'react-native';
import { Link, LinkProps } from 'expo-router';
import { formatTime } from '@/lib/utils';

interface InfoCardProps {
  href: LinkProps['href'];
  title: string;
  message: string;
  timestamp: string | Date;
}

const InfoCard: React.FC<InfoCardProps> = ({ href, title, message, timestamp }) => {
  return (
    <Link href={href} asChild>
      <Pressable className="flex flex-col gap-1 rounded-xl bg-neutral-100 p-4 active:opacity-80">
        <Text className="font-semibold text-black">{title}</Text>
        <Text className="text-neutral-500">{message}</Text>

        <View className="mt-2 flex-row justify-end">
          <Text className="text-xs text-neutral-400">{formatTime(timestamp)}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default InfoCard;
