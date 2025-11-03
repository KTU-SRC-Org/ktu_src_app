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
    <Card className="mb-3 rounded-[5px] border-0 bg-[#F5E6D3] px-2 py-3">
      <CardContent className="px-2 ">
        <Text className="mb-1 text-[13px] font-semibold leading-tight text-black">{title}</Text>
        <Text className="mb-1 text-xs leading-relaxed text-gray-700">{description}</Text>
        <TouchableOpacity onPress={onReadMore}>
          <Text className="text-sm font-semibold text-[#984D29]">{readMoreLink}</Text>
        </TouchableOpacity>
      </CardContent>
    </Card>
  );
}
