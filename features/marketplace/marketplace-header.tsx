import { useState } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewProductForms from '@/features/marketplace/new-product-forms';
import FormModal from '@/components/builders/form.modal';
import TabsTopNav from "@/components/shared/tabs-top-nav";

const MarketplaceHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TabsTopNav
        id={"marketplace-header"}
        title={"Marketplace"}
        rightContent={
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
        }
        />
      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        fullScreen
      >
        <NewProductForms />
      </FormModal>
    </>
  );
};
export default MarketplaceHeader;
