import {SafeAreaView} from "react-native-safe-area-context";
import BackNavigationHeader from "@/features/marketplace/back-navigation-header";
import {useLocalSearchParams} from "expo-router";
import CategoryItems from "@/features/marketplace/category-items";
import {StyleSheet} from "react-native";

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id ?? "";

  return(
    <SafeAreaView style={styles.container}>
      <BackNavigationHeader title={categoryId}/>
      <CategoryItems id={categoryId}/>
    </SafeAreaView>
  )
}
export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});