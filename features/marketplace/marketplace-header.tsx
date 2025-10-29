import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NewProductForms from "@/features/marketplace/new-product-forms";

const { height } = Dimensions.get("window");

const MarketplaceHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-2xl font-bold">Marketplace</Text>
        <TouchableOpacity
          className="bg-[#FF8C42] w-10 h-10 rounded-full justify-center items-center shadow-lg"
          style={{
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.bottomSheet}>
            <ScrollView
              showsVerticalScrollIndicator
              contentContainerStyle={{ padding: 16 }}
            >
              <NewProductForms/>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default MarketplaceHeader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    height: height * 0.7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
});
