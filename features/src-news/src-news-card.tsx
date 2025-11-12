import {ImageSourcePropType, Pressable, Text, View} from "react-native";
import {Image} from "expo-image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {ArrowRightIcon, Heart,Upload} from "lucide-react-native";
import {useState} from "react";
import ShareSheet from "@/features/src-news/share-sheet";
import * as Linking from "expo-linking";

export interface Props{
  newsId: string;
  source: string
  title: string
  publisher: string;
  publishedAt: Date;
  publisherImage: ImageSourcePropType;
  body: string;
  onSave: () => void
  onReadMore: () => void
}

const SrcNewsCard = ({newsId, publisher,publishedAt, source,title, body, publisherImage, onSave, onReadMore}: Props) => {
  const [showShareSheet, setShowShareSheet] = useState(false);

  const handleShare = (id: string) => {
    setShowShareSheet(true);
  };

  const shareUrl = Linking.createURL(`/src-news`, {
    queryParams: {
      newsId: newsId,
      title: title,
      publisher: publisher,
      publishedAt: new Date(publishedAt).toISOString(),
    }
  })
  return(
   <>
     <Card className={"flex-col gap-4"}>
       <CardHeader className={"items-start flex-row gap-2"}>
         <View className={"w-12 h-12 rounded-full items-center"}>
           <Image
             source={publisherImage}
             style={{
               width: 48,
               height: 48,
               borderRadius: 24,
               resizeMode: "cover",
             }}
           />
         </View>
         <View className="flex-1 flex-col">
           <Text>{publisher}</Text>
           <CardTitle
             className="font-semibold text-lg flex-shrink" style={{ flexWrap: 'wrap' }}
             numberOfLines={1}
           >
             {source}
           </CardTitle>
         </View>

       </CardHeader>
       <CardContent className={"flex-col gap-2"}>
         <View>
           <Text className={"font-semibold capitalize text-lg"} numberOfLines={1}>
             {title}
           </Text>
         </View>
         <CardDescription numberOfLines={2}>
           {body}
         </CardDescription>
       </CardContent>
       <CardFooter className={"w-full flex items-center justify-between"}>
         <View className={"items-start flex-row gap-2"}>
           <Pressable
             className={"w-10 h-10 p-1 rounded-full flex items-center justify-center bg-neutral-200"}
             onPress={() => onSave() }
           >
             <Heart color={"#000"} size={20} />
           </Pressable>
           <Pressable
             className={"w-10 h-10 p-1 rounded-full flex items-center justify-center bg-neutral-200"}
             onPress={() => handleShare(newsId) }
           >
             <Upload  color={"#000"} size={20}/>
           </Pressable>
         </View>
         <Pressable className="flex-row items-center gap-1" onPress={onReadMore}>
           <Text className="text-blue-700 text-sm">Read more</Text>
           <ArrowRightIcon color="#1D4ED8" size={12} />
         </Pressable>
       </CardFooter>
     </Card>
     <ShareSheet
       visible={showShareSheet}
       onClose={() => setShowShareSheet(false)}
       shareUrl={shareUrl}
       title={title}
       body={body}
     />
   </>
  )
}
export default SrcNewsCard;