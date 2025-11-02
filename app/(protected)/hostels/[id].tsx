import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GallerySection from '@/features/hostelsShowcase/hostelDetails/GallerySection';
import HeaderSection from '@/features/hostelsShowcase/hostelDetails/HeaderSection';
import FacilitiesSection from '@/features/hostelsShowcase/hostelDetails/FacilitiesSection';

// Dummy hostel data
const dummyHostel = {
  id: '1',
  name: 'Sunset Vista Hostels',
  image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
  type: 'Hostel',
  rating: 4.8,
  bedrooms: 12,
  bathrooms: 8,
  price: 25,
  description:
    'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.',
  address: '123 Hostel Street, Downtown District, Accra',
  agent: {
    name: 'John Mensah',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'john.mensah@hostels.com',
  },
  facilities: ['WiFi', 'Parking', 'Kitchen', 'Laundry', 'Lounge', '24/7 Security'],
  gallery: [
    { id: '1', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400' },
    { id: '2', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400' },
    { id: '3', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400' },
    { id: '4', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400' },
  ],
  reviews: [
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      comment:
        'Amazing hostel! The staff was incredibly friendly and the facilities were top-notch. Highly recommended!',
      date: '2 weeks ago',
    },
    {
      id: '2',
      user: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4.5,
      comment: 'Great location and clean rooms. Perfect for solo travelers!',
      date: '1 month ago',
    },
  ],
};

// Facility icons mapping
const facilityIcons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  WiFi: 'wifi',
  Parking: 'car',
  Kitchen: 'restaurant',
  Laundry: 'shirt',
  Lounge: 'people',
  '24/7 Security': 'shield-checkmark',
};

const Comment = ({ item }: { item: any }) => (
  <View className="p-4 rounded-xl bg-gray-50">
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <Image source={{ uri: item.avatar }} className="rounded-full size-12" />
        <View className="ml-3">
          <Text className="text-base font-medium text-gray-900">{item.user}</Text>
          <View className="flex flex-row items-center mt-1">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="ml-1 text-sm text-gray-600">{item.rating}</Text>
            <Text className="ml-2 text-sm text-gray-400">{item.date}</Text>
          </View>
        </View>
      </View>
    </View>
    <Text className="mt-3 text-sm text-gray-700">{item.comment}</Text>
  </View>
);

const HostelProperty = () => {
  //const { id } = useLocalSearchParams<{ id?: string }>();
  const property = dummyHostel;

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, backgroundColor: 'white' }}>
        <HeaderSection image={property.image} />

        <View className="flex gap-2 px-5 mt-7">
          <Text className="text-2xl font-bold text-gray-900">{property.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-blue-100 rounded-full">
              <Text className="text-xs font-bold text-blue-600">{property.type}</Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text className="mt-1 text-sm font-medium text-gray-600">
                {property.rating} ({property.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-blue-100 rounded-full size-10">
              <Ionicons name="bed-outline" size={20} color="#0061FF" />
            </View>
            <Text className="ml-2 text-sm font-medium text-gray-700">{property.bedrooms} Beds</Text>
            <View className="flex flex-row items-center justify-center bg-blue-100 rounded-full ml-7 size-10">
              <Ionicons name="water-outline" size={20} color="#0061FF" />
            </View>
            <Text className="ml-2 text-sm font-medium text-gray-700">
              {property.bathrooms} Baths
            </Text>
          </View>

          <View className="w-full mt-5 border-t border-gray-200 pt-7">
            <Text className="text-xl font-bold text-gray-800">Agent</Text>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center">
                <Avatar alt='Agent'>
                  <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
                  <AvatarFallback>
                    <Text>{property.agent.name.charAt(0)}</Text>
                  </AvatarFallback>
                </Avatar>

                <View className="flex flex-col items-start justify-center ml-3">
                  <Text className="text-lg font-bold text-gray-800 text-start">
                    {property.agent.name}
                  </Text>
                  <Text className="text-sm font-medium text-gray-600 text-start">
                    {property.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity className="items-center justify-center bg-blue-100 rounded-full size-10">
                  <Ionicons name="chatbubble-outline" size={20} color="#0061FF" />
                </TouchableOpacity>
                <TouchableOpacity className="items-center justify-center bg-blue-100 rounded-full size-10">
                  <Ionicons name="call-outline" size={20} color="#0061FF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-bold text-gray-800">Overview</Text>
            <Text className="mt-2 text-base font-normal text-gray-600">{property.description}</Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-bold text-gray-800">Facilities</Text>
            {property.facilities.length > 0 && (
              <FacilitiesSection facilities={property.facilities} />
            )}
          </View>

          {property.gallery.length > 0 && (
           <GallerySection gallery={property.gallery} />
          )}

          <View className="mt-7">
            <Text className="text-xl font-bold text-gray-800">Location</Text>
            <View className="flex flex-row items-center justify-start gap-2 mt-4">
              <Ionicons name="location-outline" size={28} color="#0061FF" />
              <Text className="flex-1 text-sm font-medium text-gray-600">{property.address}</Text>
            </View>

            <View className="items-center justify-center w-full mt-5 bg-gray-200 h-52 rounded-xl">
              <Ionicons name="map-outline" size={48} color="#9CA3AF" />
              <Text className="mt-2 text-gray-500">Map view</Text>
            </View>
          </View>

          {/* {property.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Ionicons name="star" size={24} color="#FFD700" />
                  <Text className="ml-2 text-xl font-bold text-gray-800">
                    {property.rating} ({property.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-base font-bold text-blue-600">View All</Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property.reviews[0]} />
              </View>
            </View>
          )} */}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full bg-white border-t border-l border-r border-gray-200 rounded-t-2xl p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-xs font-medium text-gray-500">Price per night</Text>
            <Text numberOfLines={1} className="text-2xl font-bold text-blue-600 text-start">
              ${property.price}
            </Text>
          </View>

          <TouchableOpacity className="flex flex-row items-center justify-center flex-1 py-3 bg-blue-600 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-lg font-bold text-center text-white">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HostelProperty;
