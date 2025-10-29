import React, {useMemo, useState} from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ProductCard from "@/features/marketplace/product-card";
import {MOCK_ITEMS, ProductCardInterface} from "@/features/marketplace/index";
import BackNavigationHeader from "@/features/marketplace/back-navigation-header";

const CategoryItems = ({id}: { id: string }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = ["All", "Popular", "New", "Price: Low", "Price: High"];

  const categoryItems = useMemo(
    () => MOCK_ITEMS.filter((item) => item.category === id),
    [id]
  );

  const filteredItems = useMemo(() => {
    let items = [...categoryItems];

    switch (selectedFilter) {
      case "popular":
        return items.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
      case "new":
        return items.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
      case "price: low":
        return items.sort((a, b) => a.price - b.price);
      case "price: high":
        return items.sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  }, [categoryItems, selectedFilter]);

  const renderItem = ({ item }: { item: ProductCardInterface }) => (
    <ProductCard
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      image={item.images[0]}
      rating={item.rating}
    />
  );

  return (
    <View className="flex-1">
      <BackNavigationHeader title={id} itemCount={filteredItems.length} />
      <View className="pb-4">
        <FlatList
          horizontal
          data={filters}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedFilter(item.toLowerCase())}
              className={`mr-2 rounded-full px-4 py-2 ${
                selectedFilter === item.toLowerCase() ? 'bg-[#FF8C42]' : 'bg-gray-100'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  selectedFilter === item.toLowerCase() ? 'text-white' : 'text-gray-600'
                }`}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            No products found in this category.
          </Text>
        }
      />
    </View>
  );
};
export default CategoryItems
