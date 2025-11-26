import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import CategoryItems from '@/features/marketplace/category-items';
import { StyleSheet } from 'react-native';

const CategoryScreen = () => {
  const { id , title } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : (id ?? '');
  const categoryTitle = Array.isArray(title) ? title[0] : (title ?? '');
  console.log(categoryTitle);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <CategoryItems id={categoryId} title={categoryTitle} />
    </SafeAreaView>
  );
};
export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
