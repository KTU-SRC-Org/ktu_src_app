  import { useRef } from 'react';
  import { View, Text, Pressable, ScrollView } from 'react-native';
  import { Download, Share2 } from 'lucide-react-native';
  import FormModal from '@/components/builders/form.modal';
  import { BookingsInterface } from '@/types/events.types';
  import { captureRef } from 'react-native-view-shot';
  import * as MediaLibrary from 'expo-media-library';

  export default function ReceiptModal({
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
    const currentDate = new Date().toLocaleString(); //Hard coded

    const receiptRef = useRef<View>(null);

    const onSaveReceiptAsync = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));

        const uri = await captureRef(receiptRef, {
          format: 'png',
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(uri);
        alert('Receipt saved successfully!');
      } catch (e) {
        console.log('Error saving receipt:', e);
        alert('Failed to save receipt.');
      }
    };

    return (
      <FormModal visible={visible} onClose={onClose} fullScreen>
        <ScrollView contentContainerClassName={'flex flex-1 flex-col gap-8 bg-white'}>
          <View
            ref={receiptRef}
            collapsable={false}
            className="flex flex-1 bg-white rounded-xl shadow-sm flex-col gap-8 p-4">
            <View className="mb-4 items-center rounded-lg bg-gray-100 p-6">
              <Text className="mb-1 text-2xl font-bold">RECEIPT</Text>
              <Text className="mb-1 text-sm text-gray-600">Date: {currentDate}</Text>
              <Text className="mb-2 text-sm font-semibold text-gray-600">ID: {receiptId}</Text>
            </View>

            <View className="flex-col gap-3">
              {data?.selectedCanopies?.length ? (
                data.selectedCanopies.map((item) => (
                  <View
                    key={item.id}
                    className="flex-row items-center justify-between border-b border-gray-200 pb-2">
                    <View className="flex-col">
                      <Text className="text-sm font-semibold text-gray-800">{item.name}</Text>
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
                <Text className="text-center text-gray-500">No items found for this receipt.</Text>
              )}
            </View>

            <View className={'flex w-full flex-row items-center justify-between'}>
              <Text className="text-center text-2xl font-bold">Total:</Text>
              <Text className="text-center text-2xl font-bold">
                GHC {data?.totalAmount?.toFixed(2) || '0.00'}
              </Text>
            </View>

            <View className="flex-1 flex-row items-center justify-between">
              {Array.from({length: 50}).map((_, index) => (
                <Text key={index} className={"w-1 bg-black h-full rounded-full"}/>
              ))}
            </View>
          </View>

          <View className="flex-row justify-center gap-4 ">
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full bg-black active:opacity-80"
              onPress={onSaveReceiptAsync}>
              <Download size={18} color="#fff" />
            </Pressable>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-black active:opacity-80">
              <Share2 size={18} color="#fff" />
            </Pressable>
          </View>
        </ScrollView>
      </FormModal>
    );
  }
