import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {StyleSheet} from "react-native";
import ProductDetails from "@/features/marketplace/product-detials";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id ?? "";

  return(
    <SafeAreaView style={styles.container}>
      <ProductDetails id={productId}/>
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