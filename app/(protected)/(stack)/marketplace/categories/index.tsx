import AllCategories from '@/features/marketplace/all-categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import BackNavigationHeader from '@/features/marketplace/back-navigation-header';

const CategoriesScreen = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <BackNavigationHeader title={'All Categories'} />
      <AllCategories />
    </SafeAreaView>
  );
};
export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
