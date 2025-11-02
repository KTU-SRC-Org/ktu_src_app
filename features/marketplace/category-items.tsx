import {useMemo, useState} from "react";
import { View, Text, FlatList } from "react-native";
import ProductCard from "@/features/marketplace/product-card";
import {MOCK_ITEMS, ProductCardInterface} from "@/features/marketplace/index";
import BackNavigationHeader from "@/features/marketplace/back-navigation-header";
import ProductSearchBar from "@/features/marketplace/product-search-bar";

const CategoryItems = ({id}: { id: string }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  //const filters = ["All", "Popular", "New", "Price: Low", "Price: High"];

  const categoryItems = useMemo(
    () => MOCK_ITEMS.filter((item) => item.category === id),
    [id]
  );

  const filteredItems = useMemo(() => {
    let items = [...categoryItems];

    switch (selectedFilter) {
      case "popular":
        items.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
        break;
      case "new":
       items.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
        break;
      case "price: low":
       items.sort((a, b) => a.price - b.price);
        break;
      case "price: high":
        items.sort((a, b) => b.price - a.price);
        break;
    }

    if (searchQuery.trim().length > 0) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items
  }, [categoryItems, searchQuery, selectedFilter]);

  const renderItem = ({ item }: { item: ProductCardInterface }) => (
    <View className="pt-4">
      <ProductCard
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        image={item.images[0]}
        rating={item.rating}
        category={id}
      />
    </View>
  );

  return (
    <View className="flex-1">
      <BackNavigationHeader title={id} itemCount={filteredItems.length} />
      {/*<View className="pb-4">*/}
      {/*  <FlatList*/}
      {/*    horizontal*/}
      {/*    data={filters}*/}
      {/*    showsHorizontalScrollIndicator={false}*/}
      {/*    contentContainerStyle={{ paddingHorizontal: 20 }}*/}
      {/*    renderItem={({ item }) => (*/}
      {/*      <TouchableOpacity*/}
      {/*        onPress={() => setSelectedFilter(item.toLowerCase())}*/}
      {/*        className={`mr-2 rounded-full px-4 py-2 bg-gray-100 ${*/}
      {/*          selectedFilter === item.toLowerCase() && 'border border-[#FF8C42]'*/}
      {/*        }`}>*/}
      {/*        <Text className={`text-sm font-medium text-gray-600`}>*/}
      {/*          {item}*/}
      {/*        </Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*    )}*/}
      {/*    keyExtractor={(item) => item}*/}
      {/*  />*/}
      {/*</View>*/}

      <FlatList
        style={{flex: 1}}
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
        <ProductSearchBar
          editable
          placeholder="Search for product..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-400">
            {searchQuery ? "No product found in this search"
              : "No product found in this category."
            }
          </Text>
        }
      />
    </View>
  );
};
export default CategoryItems;
