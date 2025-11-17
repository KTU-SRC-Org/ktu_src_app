import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import FormModal from '@/components/builders/form.modal';
import ReceiptModal from '@/features/events/reciept-modal';
import { BookingsInterface } from '@/types/events.types';

export default function PaymentSuccessModal({
  visible,
  onClose,
  data,
  receiptId,
}: {
  visible: boolean;
  onClose: () => void;
  data?: BookingsInterface;
  receiptId: string;
}) {
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  if (showReceipt)
    return (
      <ReceiptModal
        visible={showReceipt}
        onClose={() => {
          setShowReceipt(false);
          onClose();
        }}
        data={data}
        receiptId={receiptId}
      />
    );

  return (
    <FormModal visible={visible} onClose={onClose}>
      <View className="items-center justify-center py-8">
        <View className="mb-4 rounded-full bg-gray-100 p-4">
          <CheckCircle2 size={60} color="#22C55E" />
        </View>
        <Text className="mb-3 text-xl font-semibold">Payment Successful</Text>
        <Text className="mb-6 px-8 text-center text-gray-500">
          Your payment has been received successfully. You can now view your receipt.
        </Text>

        <Pressable onPress={() => setShowReceipt(true)} className="rounded-md bg-black px-6 py-3">
          <Text className="font-semibold text-white">View Payment Receipt</Text>
        </Pressable>
      </View>
    </FormModal>
  );
}
