import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ProductCard from "@/features/marketplace/product-card";
import {MOCK_ITEMS, ProductCardInterface} from "@/features/marketplace/index";

const CategoryItems = ({id}: { id: string }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = ['All', 'Popular', 'New', 'Price: Low', 'Price: High'];

  console.log(id);

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
        data={MOCK_ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default CategoryItems
