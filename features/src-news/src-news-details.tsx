import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { srcNewsData } from "@/features/src-news/index";
import {formatTime} from "@/lib/utils";
import RichTextEditor from "@/features/src-news/rich-text-editor";

const SrcNewsDetails = ({ id }: { id: string | null }) => {
  const news = srcNewsData.find((item) => item.id === id);

  if (!news) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">News not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      contentContainerClassName="flex-col gap-4"
    >
      <View className="flex-row items-center gap-2">
        <View className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            source={news.publisherImage}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              resizeMode: "cover",
            }}
          />
        </View>
        <View className="flex-col">
          <Text className="font-medium">{news.publisher}</Text>
          <Text className="font-semibold text-lg flex-shrink" style={{ flexWrap: "wrap" }}>
            {news.source}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4">
        <Text className="text-sm text-gray-500">
          Published: {news.publishedAt ? formatTime(news.publishedAt) : "N/A"}
        </Text>
        {news.isDraft && <Text className="text-sm text-yellow-600">Draft</Text>}
      </View>

      <View className={"flex-col gap-2"}>
        <RichTextEditor body={news.body}/>
      </View>
    </ScrollView>
  );
};

export default SrcNewsDetails;
