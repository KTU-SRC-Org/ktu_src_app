import { View, Text, Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native';

const DeleteAccount = ({ visible, email }: { visible: boolean; email: string }) => {
  const handleDelete = () => {
    console.log('Account deleted');
  };

  if (!visible) return null;

  const consequences = [
    'All your session history will be removed.',
    'You will lose access to any forms or submissions.',
    'All devices will be logged out automatically.',
  ];

  return (
    <View className="flex-col items-center gap-4">
      <View className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <Trash2 size={28} color="#DC2626" />
      </View>

      <View className="items-center space-y-1">
        <Text className="text-center text-lg font-bold text-red-600">
          Are you sure you want to delete your account?
        </Text>
        <Text className="text-sm text-gray-500">{email}</Text>
      </View>

      <View className="w-full space-y-2 border-t border-gray-200 pt-4">
        <Text className="mb-2 text-sm text-gray-700">
          Deleting your account is permanent. Once deleted:
        </Text>
        {consequences.map((item, index) => (
          <Text key={index} className="text-sm text-gray-700">
            {'\u2022'} {item}
          </Text>
        ))}
      </View>

      <Pressable
        onPress={handleDelete}
        className="mt-4 w-full rounded-lg bg-red-600 p-4"
        android_ripple={{ color: '#b91c1c' }}>
        <Text className="text-center text-base font-semibold text-white">Delete Account</Text>
      </Pressable>
    </View>
  );
};

export default DeleteAccount;
