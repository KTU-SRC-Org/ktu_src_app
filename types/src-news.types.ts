import { ImageSourcePropType } from 'react-native';

export type CategoryType = 'tech' | 'business';

export interface SrcNewsInterface {
  id: string;
  body: string;
  publisherImage: ImageSourcePropType;
  publishedAt: Date;
  publisher: string;
  category: CategoryType[];
  source: string;
  isDraft?: boolean;
  createAt?: string;
}
