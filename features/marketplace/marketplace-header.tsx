import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewProductForms from '@/features/marketplace/new-product-forms';
import FormModal from '@/components/builders/form.modal';

const MarketplaceHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-bold">Marketplace</Text>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-[#FF8C42] shadow-lg"
          style={{
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={30} color="#fff" />
        </Pressable>
      </View>
      <FormModal visible={modalVisible} onClose={() => setModalVisible(false)} fullScreen>
        <NewProductForms />
      </FormModal>
    </>
  );
};
export default MarketplaceHeader;
