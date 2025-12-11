import { Text, View, Pressable } from 'react-native';
import { Link, LinkProps } from 'expo-router';
import { formatTime, cn } from '@/lib/utils';

interface InfoCardProps {
  href: LinkProps['href'];
  title: string;
  message: string;
  timestamp: string | Date;
  unread?: boolean;
  badge?: string;
  isImportant?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  href,
  title,
  message,
  timestamp,
  unread,
  badge,
  isImportant,
}) => {
  console.log("time ",timestamp)
  return (
    <Link href={href} asChild>
      <Pressable
        className={cn(
          'flex flex-col gap-1 rounded-xl border p-4 active:opacity-80',
          unread ? 'bg-blue-50/50' : 'bg-neutral-100',
          isImportant ? 'border-amber-400 bg-amber-50' : 'border-transparent'
        )}>
        <View className="flex-row items-start justify-between gap-2">
          <Text
            className={cn('flex-1 text-base', unread ? 'font-bold text-black' : 'font-semibold text-neutral-900')}
            numberOfLines={2}>
            {title}
          </Text>
          {unread && <View className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />}
        </View>

        <Text className="text-sm text-neutral-500" numberOfLines={3}>
          {message}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
            {badge ? (
                <View className="rounded-md bg-neutral-200 px-2 py-0.5">
                    <Text className="text-[10px] font-medium text-neutral-600">{badge}</Text>
                </View>
            ) : <View />}
          <Text className="text-xs text-neutral-400">{formatTime(timestamp)}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default InfoCard;
