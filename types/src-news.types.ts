import {ImageSourcePropType} from "react-native";

export interface SrcNewsInterface {
  id: string;
  title: string;
  body: string;
  publisherImage: ImageSourcePropType;
  publishedAt: Date;
  publisher: string;
  source: string;
  isDraft?: boolean;
  createAt?: string;
}