import { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActionSheetIOS,
  Linking,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProductImageCarousel } from '@/features/marketplace/product-image-carousel';
import { useProductDetails} from '@/hooks/marketplace/use-product-details';
import { Skeleton } from '@/components/ui/skeleton';

const { width } = Dimensions.get('window');

const ProductDetails = ({ id, category }: { id: string; category?: string }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const { data: product, isLoading } = useProductDetails(id);

  const selectedVariant = useMemo(() => {
    if (!product || !selectedVariantId) return null;
    return product.variants.find((v) => v.id === selectedVariantId);
  }, [product, selectedVariantId]);

  const currentPrice = selectedVariant?.price ?? product?.price;
  const currentStock = selectedVariant?.stock_qty ?? product?.stock_qty;
  const isInStock = selectedVariant ? selectedVariant.is_in_stock : product?.is_in_stock;

  const phoneNumber = product?.call_contact;
  const whatsappNumber = product?.whatsapp_contact;
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const telLink = `tel:${phoneNumber}`;

  // Handle contact seller button click
  const handleContactPress = () => {
    const hasPhone = !!phoneNumber;
    const hasWhatsApp = !!whatsappNumber;

    // if user has neither contact method
    if (!hasPhone && !hasWhatsApp) return;

    // For iOS
    if (Platform.OS === 'ios') {
      const options = ['Cancel'];
      const actions: (() => void)[] = [() => {}];

      if (hasWhatsApp) {
        options.push('Chat on WhatsApp');
        actions.push(() => Linking.openURL(whatsappLink));
      }

      if (hasPhone) {
        options.push('Voice Call');
        actions.push(() => Linking.openURL(telLink));
      }

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          const action = actions[buttonIndex];
          if (action) action();
        }
      );
    } else {
      setShowModal(true);
    }
  };

  // For android user chat on whatsapp button click
  const handleChatOnWhatsApp = () => {
    setShowModal(false);
    Linking.openURL(whatsappLink);
  };

  // For android user chat on phone call button click
  const handlePhoneCall = () => {
    setShowModal(false);
    Linking.openURL(telLink);
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <Skeleton className="h-[375px] w-full" />
        <View className="gap-4 p-4">
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-full h-20" />
        </View>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-gray-500">Product not found.</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 bg-white">
        <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between p-4 pb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center w-10 h-10 rounded-full bg-white/90">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full bg-white/90">
            <Ionicons name="share-social-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80,
          }}>
          <View
            className="bg-gray-100"
            style={{
              width: width,
              height: width,
              overflow: 'hidden',
            }}>
            <ProductImageCarousel images={product.images.map((img) => ({ uri: img }))} />
            <TouchableOpacity
              className="absolute items-center justify-center w-12 h-12 bg-white rounded-full shadow-md bottom-5 right-5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}>
              <Ionicons name="heart-outline" size={24} color="#FF8C42" />
            </TouchableOpacity>
          </View>

          <View className="px-4 pt-4">
            <Text className="mb-2 text-3xl font-bold text-[#FF8C42]">
              {product.currency} {currentPrice?.toFixed(2)}
            </Text>
            <Text className="flex-row mb-3 text-lg font-semibold text-gray-800">
              {product.title}{' '}
              <Text
                className={`text-xs font-semibold ${
                  !isInStock
                    ? 'text-red-500'
                    : (currentStock ?? 0) <= 5
                      ? 'text-yellow-600'
                      : 'text-green-600'
                }`}>
                {!isInStock
                  ? '- [ Out of stock ]'
                  : (currentStock ?? 0) <= 5
                    ? `- [ ${currentStock} left ]`
                    : '- [ In stock ]'}
              </Text>
            </Text>
            <View className="flex-row items-center mb-4">
              <View className="flex-row mr-2">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <Ionicons
                    key={index}
                    name={star <= Math.floor(product.rating) ? 'star' : 'star-outline'}
                    size={18}
                    color="#FFD700"
                  />
                ))}
              </View>
              <Text className="text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.rating_count ?? 0} reviews)
              </Text>
            </View>

            {product.variants && product.variants.length > 0 && (
              <View className="mb-4">
                <Text className="mb-2 text-base font-semibold text-gray-800">
                  Available Options
                </Text>

                <View className="flex-row flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <TouchableOpacity
                      key={variant.id}
                      onPress={() =>
                        setSelectedVariantId(selectedVariantId === variant.id ? null : variant.id)
                      }
                      className={`rounded-full border px-4 py-2 ${
                        selectedVariantId === variant.id
                          ? 'border-[#FF8C42] bg-[#FF8C42]/10'
                          : 'border-gray-300 bg-gray-50'
                      }`}>
                      <Text
                        className={`text-sm font-medium ${
                          selectedVariantId === variant.id ? 'text-[#FF8C42]' : 'text-gray-700'
                        }`}>
                        {variant.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View className="mb-4">
              <Text className="mb-2 text-base font-semibold text-gray-800">Description</Text>
              <Text className="text-sm leading-6 text-gray-600">
                {product.description || 'No description available.'}
              </Text>
            </View>

            {product.seller && (
              <TouchableOpacity className="flex-row items-center p-4 mb-8 bg-gray-100 rounded-xl">
                <View className="items-center justify-center w-12 h-12 mr-3 bg-gray-200 rounded-full">
                  <Ionicons name="person" size={24} color="#666" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold">
                    {product.seller.full_name || 'Unknown Seller'}
                  </Text>
                  <Text className="flex text-sm text-gray-600">
                    <Ionicons name={'star'} size={18} color="#FFD700" />
                    4.5 • 100 sales
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 flex-row px-4 pt-4 pb-2">
          <TouchableOpacity
            className="flex-row items-center justify-center flex-1 py-4 bg-gray-800 rounded-xl"
            onPress={handleContactPress}>
            <Ionicons name="call-outline" size={20} color="#fff" />
            <Text className="ml-2 text-base font-semibold text-white">Contact Seller</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*contact seller modal for android users only*/}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View className="justify-end flex-1 bg-black/40">
          <View className="p-6 bg-white rounded-t-2xl">
            <Text className="mb-4 text-lg font-semibold text-center">Contact Seller</Text>

            {whatsappNumber && (
              <TouchableOpacity
                className="flex-row items-center justify-center py-3 mb-3 bg-green-600 rounded-xl"
                onPress={handleChatOnWhatsApp}>
                <Ionicons name="logo-whatsapp" size={22} color="#fff" />
                <Text className="ml-2 text-base font-semibold text-white">WhatsApp</Text>
              </TouchableOpacity>
            )}

            {phoneNumber && (
              <TouchableOpacity
                className="flex-row items-center justify-center py-3 mb-3 bg-blue-600 rounded-xl"
                onPress={handlePhoneCall}>
                <Ionicons name="call" size={22} color="#fff" />
                <Text className="ml-2 text-base font-semibold text-white">Voice Call</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity className="items-center mt-3" onPress={() => setShowModal(false)}>
              <Text className="font-medium text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProductDetails;
