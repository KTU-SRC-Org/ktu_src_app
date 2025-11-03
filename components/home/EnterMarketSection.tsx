import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

import { ArrowRight } from 'lucide-react-native';

const EnterMarketSection = () => {
  return (
    <View className="mb-10 px-2">
      <View className="relative">
        <Image
          source={require('@/assets/images/Enter-student-market-1.png')}
          style={styles.image}
        />

        <View className="absolute right-4 top-2 rounded-full">
          <Link className="" href={'/marketplace-screen'}>
            <View className="flex flex-row items-center justify-center rounded-full bg-gray-500/20 p-2 px-3">
              <Text className="text-[15px] text-white">Enter</Text>
              <ArrowRight size={17} color={'white'} />
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 4 / 3, borderRadius: 15 },
});

export default EnterMarketSection;
