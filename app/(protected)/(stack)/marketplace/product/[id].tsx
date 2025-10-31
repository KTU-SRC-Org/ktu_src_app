import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {StyleSheet} from "react-native";
import ProductDetails from "@/features/marketplace/product-detials";

const ProductDetailScreen = () => {
  const { id , category } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id ?? "";
  const categoryId = Array.isArray(category) ? category[0] : category ?? "";

  return(
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ProductDetails
        id={productId}
        category={categoryId}
      />
    </SafeAreaView>
  )
}
export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});