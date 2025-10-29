import { TouchableOpacity } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { NewsItemData } from '../home/CampusNewsSection';


interface NewsItemCardProps extends NewsItemData {
    onReadMore?: () => void;
  }

export function NewsItemCard({
  title,
  description,
  readMoreLink = 'Read more.',
  onReadMore,
}: NewsItemCardProps) {
  return (
    <Card className="bg-[#F5E6D3] border-0 rounded-[5px] mb-3 py-3 px-2">
      <CardContent className="px-2 ">
        <Text className="mb-1 text-[13px] font-semibold leading-tight text-black">
          {title}
        </Text>
        <Text className="mb-1 text-xs leading-relaxed text-gray-700">
          {description}
        </Text>
        <TouchableOpacity onPress={onReadMore}>
          <Text className="text-[#984D29] font-semibold text-sm">
            {readMoreLink}
          </Text>
        </TouchableOpacity>
      </CardContent>
    </Card>
  );
}