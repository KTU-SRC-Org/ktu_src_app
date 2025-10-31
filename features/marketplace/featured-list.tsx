import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProductCard from "@/features/marketplace/product-card";
import CategoryCard from "@/features/marketplace/category-card";
import {ALL_CATEGORIES, MOCK_ITEMS, ProductCardInterface} from "@/features/marketplace/index";
import ProductSearchBar from "@/features/marketplace/product-search-bar";

// This component contains ALL the content that appears ABOVE the product list
const MarketplaceListHeader = () => {
    const router = useRouter();

    return (
        // This View replaces the original root View and provides spacing
        <View className="flex-col gap-8">
           <ProductSearchBar/>
            {/* Banner */}
            <View className="relative">
                <LinearGradient
                    colors={['#F5882B', '#8A3324']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        borderRadius: 16,
                        padding: 16,
                        flexDirection: 'row',
                        overflow: 'hidden',
                    }}
                >
                    <View className="flex-1 flex flex-col gap-4 justify-center">
                        <Text className="text-white text-3xl font-bold">
                            Shop Smarter,{'\n'}Save More!
                        </Text>
                        <TouchableOpacity
                            className="flex-row items-center bg-transparent border border-white self-start px-4 py-2 rounded-full space-x-2">
                            <Ionicons name="pricetag-outline" size={16} color="#fff" />
                            <Text className="ml-2 text-white font-semibold text-sm">
                                Get 40% OFF!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <Image
                    source={require('@/assets/images/marketplace/woman.png')}
                    className="w-[140px] h-[120px] rounded-xl absolute right-8 top-2"
                />
            </View>

            {/* Categories */}
            <View className="flex flex-col gap-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold">Categories</Text>
                    <TouchableOpacity
                        className="flex-row items-center space-x-1"
                        onPress={() => router.push({
                          pathname: '/marketplace/categories'
                        })}
                    >
                        <Text className="font-semibold text-base text-[#FF8C42]">
                            See all
                        </Text>
                        <Ionicons name="chevron-forward" size={18} color="#FF8C42" />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
                    {ALL_CATEGORIES.slice(0,5).map((category) => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            icon={category.icon}
                            color={category.color}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Gadget Image */}
            <View className="rounded-2xl overflow-hidden">
                <Image
                    source={require('@/assets/images/marketplace/gadget.png')}
                    className="w-full h-[150px]"
                />
            </View>

            {/* Featured Items Title */}
            <Text className="text-lg font-bold mb-2">
                Featured Items
            </Text>
        </View>
    );
}

export default function FeaturedList() {
    const renderProduct = ({ item }: { item: ProductCardInterface }) => (
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
        // The root component is now the FlatList
        <FlatList
            style={{flex: 1}} // Ensures the list fills the available space
            // Pass all the header content here
            ListHeaderComponent={MarketplaceListHeader}

            // List data and props remain the same
            data={MOCK_ITEMS.slice(0, 3)}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
            showsVerticalScrollIndicator={false}

            // Apply horizontal padding to the list content to match the header
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        />
    );
}