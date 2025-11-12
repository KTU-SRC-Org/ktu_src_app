import {FlatList, Pressable, View, Text} from "react-native";
import BackNavigationHeader from "@/features/marketplace/back-navigation-header";
import {CategoryType, SrcNewsInterface} from "@/types/src-news.types";
import {srcNewsData} from "@/features/src-news/index";
import SrcNewsCard from "@/features/src-news/src-news-card";
import {useEffect, useState} from "react";
import FormModal from "@/components/builders/form.modal";
import * as Linking from 'expo-linking';
import SrcNewsDetails from "@/features/src-news/src-news-details";

type FilterType = CategoryType | "All";

const FILTERS: FilterType[] = ["All", "tech", "business"];

const SrcNewsList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // Helper to add src news to collection
  const handleSave = (newsId: string) => {
    console.log(newsId);
  }

  // Handle read more
  const handleReadMore = (newsId: string) => {
    setSelectedNews(newsId);
    setOpenModal(true);
  }

  // Filtering logic
  const filteredData = srcNewsData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.category.includes(activeFilter as CategoryType);
  });

  const renderNewsItem = ({ item }: {item: SrcNewsInterface }) => (
    <SrcNewsCard
      newsId={item.id}
      source={item.source}
      publisher={item.publisher}
      publishedAt={item.publishedAt}
      publisherImage={item.publisherImage}
      body={item.body}
      onSave={() => handleSave(item.id)}
      onReadMore={() => handleReadMore(item.id)}
    />
  );

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const { queryParams } = Linking.parse(url);
      if (queryParams?.newsId) {
        setSelectedNews(queryParams.newsId as string);
        setOpenModal(true);
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleDeepLink({ url: initialUrl });
    })();

    return () => subscription.remove();
  }, []);

  return(
   <>
     <View className="flex-1">
       <BackNavigationHeader title={"SRC News"}/>
       <View>

         <FlatList
           data={filteredData}
           keyExtractor={(item) => item.id}
           showsVerticalScrollIndicator={false}
           contentInsetAdjustmentBehavior={"automatic"}
           contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 14, paddingBottom: 30 }}
           renderItem={renderNewsItem}
           ItemSeparatorComponent={() => <View className="h-4" />}
           ListHeaderComponent={
             <View className="flex-row flex-wrap gap-4 py-4">
               {FILTERS.map((filter) => (
                 <Pressable
                   key={filter}
                   className={`px-6 py-2 rounded-2xl border border-neutral-400 ${
                     activeFilter === filter && "bg-neutral-800"
                   }`}
                   onPress={() => setActiveFilter(filter)}
                 >
                   <Text
                     className={`capitalize font-medium ${
                       activeFilter === filter ? "text-white" : "text-black"
                     }`}
                   >
                     {filter}
                   </Text>
                 </Pressable>
               ))}
             </View>
           }
         />
       </View>
     </View>
     {openModal && (
       <FormModal
         visible={openModal}
         onClose={() => setOpenModal(false)}
         heightRatio={0.8}
       >
         <SrcNewsDetails id={selectedNews}/>
       </FormModal>
     )}
   </>
  )
}
export default SrcNewsList;