import { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import FormModal from '@/components/builders/form.modal';
import PaymentSuccessModal from '@/features/events/payment-success-modal';
import { CanopyModalProps, ShowSuccessData } from '@/types/events.types';
import { canopyOptions } from '@/features/events/index';

const BookCanopyModal = ({ visible, onClose, event }: CanopyModalProps) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showSuccess, setShowSuccess] = useState<ShowSuccessData>({ visible: false });
  const [receipt, setReceipt] = useState<string>('');

  // Helper for quantity changes and selections
  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  //Calculate selected total canopies
  const total = canopyOptions.reduce(
    (sum, item) => sum + (quantities[item.id] || 0) * item.price,
    0
  );

  // Helper for Pay For Canopy button click
  const handlePayForCanopy = () => {
    const selectedCanopies = canopyOptions
      .map((item) => ({
        ...item,
        selectedQty: quantities[item.id] || 0,
      }))
      .filter((item) => item.selectedQty > 0);

    const totalAmount = selectedCanopies.reduce(
      (sum, item) => sum + item.price * item.selectedQty,
      0
    );

    const receiptId = generateReceipt();
    setReceipt(receiptId);
    setShowSuccess({
      visible: true,
      data: { selectedCanopies, totalAmount },
    });

    console.log({ selectedCanopies, totalAmount });
  };

  //Generate receipt
  const generateReceipt = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
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
        receiptId={receipt}
      />
    );

  return (
    <FormModal visible={visible} onClose={onClose}>
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName={'flex-1 pb-12'}>
          <View className="flex flex-col gap-4">
            {canopyOptions.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between rounded-xl bg-gray-50 p-3">
                <View className="flex-row items-center gap-3">
                  <View className="rounded-xl bg-white p-3">
                    <Image source={{ uri: event.image }} style={{ width: 40, height: 40 }} />
                  </View>
                  <View>
                    <Text className="text-base font-bold">{item.name}</Text>
                    <Text className="text-sm text-gray-600">GHC {item.price}</Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-2">
                  <Pressable
                    onPress={() => updateQuantity(item.id, -1)}
                    className="rounded-md border px-2 py-1">
                    <Minus size={16} color="#000" />
                  </Pressable>
                  <Text className="w-4 text-center text-base font-semibold">
                    {quantities[item.id] || 0}
                  </Text>
                  <Pressable
                    onPress={() => updateQuantity(item.id, 1)}
                    className="rounded-md border px-2 py-1">
                    <Plus size={16} color="#000" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t border-gray-100 bg-white px-4 py-2">
          <Text className="text-2xl font-bold text-neutral-900">GHC {total}</Text>
          <Pressable
            disabled={total === 0}
            onPress={handlePayForCanopy}
            className={`${total === 0 ? 'bg-gray-300' : 'bg-black'} rounded-md px-5 py-3`}>
            <Text className="text-base font-semibold text-white">Pay for Canopy</Text>
          </Pressable>
        </View>
      </View>
    </FormModal>
  );
};

export default BookCanopyModal;
