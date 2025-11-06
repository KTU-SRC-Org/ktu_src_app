import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import FormModal from "@/components/builders/form.modal";
import PaymentSuccessModal from "@/features/events/payment-success-modal";
import {CanopyModalProps, ShowSuccessData} from "@/types/events.types";
import {canopyOptions} from "@/features/events/index";

const BookCanopyModal = ({ visible, onClose, event }: CanopyModalProps) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showSuccess, setShowSuccess] = useState<ShowSuccessData>({visible: false,});

  // Helper for quantity changes and selections
  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  //Calculate selected total canopies
  const total = canopyOptions.reduce(
    (sum, item) =>
      sum + (quantities[item.id] || 0) * item.price, 0);

  // Helper for Pay For Canopy button click
  const handlePayForCanopy = () => {
    const selectedCanopies = canopyOptions
      .map((item) => ({
        ...item, selectedQty: quantities[item.id] || 0}))
      .filter((item) => item.selectedQty > 0);

    const totalAmount = selectedCanopies.reduce(
      (sum, item) =>
        sum + item.price * item.selectedQty, 0);

    console.log({ selectedCanopies, totalAmount });

    setShowSuccess({
      visible: true,
      data: { selectedCanopies, totalAmount },
    });
  };

  // Show success modal after successful payment
  if (showSuccess.visible)
    return (
      <PaymentSuccessModal
        visible={showSuccess.visible}
        onClose={() => {
          setShowSuccess({ visible: false });
          onClose();
        }}
        data={showSuccess.data}
      />
    );

  return (
    <FormModal visible={visible} onClose={onClose}>
      <View className="flex flex-col gap-4">
        {canopyOptions.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between bg-gray-50 rounded-xl p-3"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-white p-3 rounded-xl">
                <Image
                  source={{uri: event.image}}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <View>
                <Text className="font-bold text-base">{item.name}</Text>
                <Text className="text-gray-600 text-sm">GHC {item.price}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => updateQuantity(item.id, -1)}
                className="border rounded-md px-2 py-1"
              >
                <Minus size={16} color="#000" />
              </Pressable>
              <Text className="text-base font-semibold w-4 text-center">
                {quantities[item.id] || 0}
              </Text>
              <Pressable
                onPress={() => updateQuantity(item.id, 1)}
                className="border rounded-md px-2 py-1"
              >
                <Plus size={16} color="#000" />
              </Pressable>
            </View>
          </View>
        ))}

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-2xl font-bold text-neutral-900">
            GHC {total}
          </Text>
          <Pressable
            disabled={total === 0}
            onPress={handlePayForCanopy}
            className={`${
              total === 0 ? "bg-gray-300" : "bg-black"
            } rounded-md py-3 px-5`}
          >
            <Text className="text-white font-semibold text-base">
              Pay for Canopy
            </Text>
          </Pressable>
        </View>
      </View>
    </FormModal>
  );
};

export default BookCanopyModal;
