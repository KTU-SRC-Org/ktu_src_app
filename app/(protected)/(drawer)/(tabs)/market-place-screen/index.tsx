import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet} from "react-native";
import MarketplaceHeader from "@/features/marketplace/marketplace-header";
import FeaturedList from "@/features/marketplace/featured-list";

const Index = () => {
    return (
      <SafeAreaView style={styles.container}>
        <MarketplaceHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FeaturedList/>
        </ScrollView>
      </SafeAreaView>
    );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
