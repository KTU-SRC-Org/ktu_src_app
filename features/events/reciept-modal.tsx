import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Download, Share2 } from "lucide-react-native";
import FormModal from "@/components/builders/form.modal";
import {BookingsInterface} from "@/types/events.types";

export default function ReceiptModal({visible, onClose, data,}: {
  visible: boolean;
  onClose: () => void;
  data?: BookingsInterface;
}) {
  const currentDate = new Date().toLocaleString(); //Hard coded

  return (
    <FormModal visible={visible} onClose={onClose} fullScreen>
      <ScrollView contentContainerClassName={"bg-white flex-1 flex-col gap-4 p-4"}>
        <View className="bg-gray-100 rounded-lg p-6 items-center mb-4">
          <Text className="text-2xl font-bold mb-1">RECEIPT</Text>
          <Text className="text-gray-600 text-sm mb-3">
            Date: {currentDate}
          </Text>
        </View>

        <View className="flex-col gap-3">
          {data?.selectedCanopies?.length ? (
            data.selectedCanopies.map((item) => (
              <View
                key={item.id}
                className="flex-row justify-between items-center border-b border-gray-200 pb-2"
              >
                <View className="flex-col">
                  <Text className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Qty: {`${item.selectedQty} * GHC ${item.price}`}
                  </Text>
                </View>
                <Text className="text-sm font-semibold text-gray-800">
                  GHC {item.price * item.selectedQty}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center">
              No items found for this receipt.
            </Text>
          )}
        </View>

        <View className={"flex items-center justify-between"}>
          <Text className="text-2xl font-bold text-center">
            Total:
          </Text>
          <Text className="text-2xl font-bold text-center">
            GHC {data?.totalAmount?.toFixed(2) || "0.00"}
          </Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          {Array.from({length: 10}).map((_, index) => (
            <Text key={index} className={"w-1 bg-black h-full rounded-full"}/>
          ))}
        </View>

        <View className="flex-row justify-center gap-4 ">
          <Pressable className="bg-black w-10 h-10 rounded-full items-center justify-center active:opacity-80">
            <Download size={18} color="#fff" />
          </Pressable>
          <Pressable className="bg-black w-10 h-10 rounded-full items-center justify-center active:opacity-80">
            <Share2 size={18} color="#fff" />
          </Pressable>
        </View>
      </ScrollView>
    </FormModal>
  );
}
