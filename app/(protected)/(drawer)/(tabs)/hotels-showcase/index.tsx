import { useNavigation, router } from 'expo-router';
import { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { Card } from '@/components/cards/hostels-showcase/Card';
import { FeaturedCard } from '@/components/cards/hostels-showcase/FeaturedCard';
import { DrawerToggleButton } from '@react-navigation/drawer';

import {
  useFeaturedHostels,
  useRecommendedHostels,
  HostelCard as Property,
} from '@/hooks/hostel/use-hostel';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

// Animated FlashList
const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList
) as unknown as React.ComponentType<FlashListProps<Property>>;

const HostelsShowcase = () => {
  const navigation = useNavigation();

  // Fetch data
  const {
    data: featuredHostels = [],
    isLoading: featuredLoading,
    isError: featuredError,
  } = useFeaturedHostels();

  const {
    data: recommendedHostels = [],
    isLoading: recommendedLoading,
    isError: recommendedError,
  } = useRecommendedHostels();

  // scroll animation
  const scrollOffset = useSharedValue(0);

  const handleCardPress = (id: string) => {
    // navigate to details (use id instead of hard-coded '1')
    router.push(`/hostels/${id}`);
  };

  const shareListing = async () => {
    try {
      console.log('Share listing');
    } catch (err) {
      console.log(err);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
      },
    ],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      headerBackground: () => <Animated.View style={[headerAnimatedStyle, styles.header]} />,
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => <DrawerToggleButton />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }: { item: Property }) => (
    <View style={styles.gridItem}>
      <Card item={item} onPress={() => handleCardPress(item.id)} />
    </View>
  );

  const renderListHeader = () => (
    <>
      {/* Animated header image */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={require('@/assets/images/hostels-showcase/House-For-Rent1.png')}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
      </View>

      {/* Featured Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
        </View>

        {featuredLoading ? (
          <ActivityIndicator size="large" color="#0061FF" style={{ marginTop: 20 }} />
        ) : featuredError ? (
          <Text style={{ color: 'red' }}>Could not load featured hostels.</Text>
        ) : !featuredHostels || featuredHostels.length === 0 ? (
          <View>
            <Text>No featured hostels available.</Text>
          </View>
        ) : (
          <FlatList
            data={featuredHostels}
            renderItem={({ item }) => (
              <FeaturedCard item={item} onPress={() => handleCardPress(item.id)} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
          />
        )}
      </View>

      {/* Our Recommendation Section */}
      <View style={styles.sectionContainer}>
        <View className="mb-2 mt-3 flex flex-row items-center justify-between">
          <Text style={styles.sectionTitle}>Our Recommendation</Text>
          <Pressable onPress={() => router.push('/hotels-showcase/all-hostels-screen')}>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>
      </View>
    </>
  );

  const renderListEmpty = () => {
    if (recommendedLoading) {
      return <ActivityIndicator size="large" color="#0061FF" style={{ marginTop: 20 }} />;
    }
    if (recommendedError) {
      return <Text style={{ color: 'red' }}>Could not load recommended hostels.</Text>;
    }
    return (
      <View>
        <Text>No recommended hostels available.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlashList
        data={recommendedHostels || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // @ts-ignore
        estimatedItemSize={200}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: IMG_HEIGHT,
    width: width,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  listContent: {
    paddingBottom: 50,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'white',
    zIndex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0061FF',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 150,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default HostelsShowcase;
