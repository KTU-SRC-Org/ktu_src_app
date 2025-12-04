import { DrawerToggleButton } from '@react-navigation/drawer';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { BellRing } from 'lucide-react-native';
import { View as UiView } from 'react-native-ui-lib';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'expo-router';

const example = {
  title: 'Image with fade in animation',
  size: 40,
  animate: true,
  imageProps: { animationDuration: 500 },
  source: { uri: 'https://i.pravatar.cc/150?img=1' },
};

const HomeCustomHeader = () => {
  const router = useRouter();
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <View className={'pl-1'}>
            <DrawerToggleButton />
          </View>

          <View>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1, borderRadius: 50, padding: 6 },
              ]}
              onPress={() =>
                router.push({
                  pathname: '/info-center',
                  params: { type: 'notifications' },
                })
              }>
              <BellRing color="blue" fill="blue" />
            </Pressable>
          </View>
        </View>

        <View className="flex flex-row items-start justify-between px-5">
          <View>
            <Text className="mb-1 text-xl font-normal text-black">Hello, John Doe</Text>
            <Text className="font-normal text-muted-foreground">Here&apos;s what happening</Text>
            <Text className="font-bold text-serene">on campus today</Text>
          </View>
          <UiView paddingL-15 className="">
            <Avatar alt={'avatar'}>
              <AvatarImage source={{ uri: example.source.uri }} />
              <AvatarFallback className="bg-gradient-to-br from-[#0536ff] to-[#6a71ea]">
                <Text className="font-semibold text-white">EX</Text>
              </AvatarFallback>
            </Avatar>
          </UiView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingRight: 24,
  },

  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 280,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
});

export default HomeCustomHeader;
