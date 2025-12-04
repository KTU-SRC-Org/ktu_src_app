import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GallerySection from '@/features/hostelsShowcase/hostelDetails/GallerySection';
import HeaderSection from '@/features/hostelsShowcase/hostelDetails/HeaderSection';
import FacilitiesSection from '@/features/hostelsShowcase/hostelDetails/FacilitiesSection';
import { useHostel } from '@/hooks/hostel/use-hostel';

// const Comment = ({ item }: { item: any }) => (
//   <View className="p-4 rounded-xl bg-gray-50">
//     <View className="flex flex-row items-center justify-between">
//       <View className="flex flex-row items-center">
//         <Image source={{ uri: item.avatar }} className="rounded-full size-12" />
//         <View className="ml-3">
//           <Text className="text-base font-medium text-gray-900">{item.user}</Text>
//           <View className="flex flex-row items-center mt-1">
//             <Ionicons name="star" size={14} color="#FFD700" />
//             <Text className="ml-1 text-sm text-gray-600">{item.rating}</Text>
//             <Text className="ml-2 text-sm text-gray-400">{item.date}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//     <Text className="mt-3 text-sm text-gray-700">{item.comment}</Text>
//   </View>
// );

const HostelProperty = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: property, isLoading, isError, refetch } = useHostel(id!);

  if (!id) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-base font-medium text-gray-700">
          Invalid hostel ID. Please go back and try again.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0061FF" />
      </View>
    );
  }

  // Error State
  if (isError || !property) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text className="mt-4 text-center text-lg font-medium text-gray-900">
          Failed to load hostel details.
        </Text>
        <TouchableOpacity onPress={() => refetch()} className="mt-6">
          <Text className="text-base font-bold text-blue-600">Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-base text-gray-500">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const agentInitial = property.agent.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, backgroundColor: 'white' }}>
        <HeaderSection image={property.image || property.gallery[0]?.image} />

        <View className="mt-7 flex gap-2 px-5">
          <Text className="text-2xl font-bold text-gray-900">{property.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center rounded-full bg-blue-100 px-4 py-2">
              <Text className="text-xs font-bold text-blue-600">{property.type}</Text>
            </View>

            {property.rating != null && (
              <View className="flex flex-row items-center gap-2">
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text className="mt-1 text-sm font-medium text-gray-600">
                  {property.rating.toFixed(1)}
                </Text>
              </View>
            )}
          </View>

          <View className="mt-5 flex flex-row items-center">
            <View className="flex size-10 flex-row items-center justify-center rounded-full bg-blue-100">
              <Ionicons name="bed-outline" size={20} color="#0061FF" />
            </View>
            <Text className="ml-2 text-sm font-medium text-gray-700">
              {property.bedrooms ?? 0} Beds
            </Text>
            <View className="ml-7 flex size-10 flex-row items-center justify-center rounded-full bg-blue-100">
              <Ionicons name="water-outline" size={20} color="#0061FF" />
            </View>
            <Text className="ml-2 text-sm font-medium text-gray-700">
              {property.bathrooms ?? 0} Baths
            </Text>
          </View>

          <View className="mt-5 w-full border-t border-gray-200 pt-7">
            <Text className="text-xl font-bold text-gray-800">Agent</Text>

            <View className="mt-4 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Avatar alt="Agent">
                  <AvatarImage
                    source={{ uri: property.agent.avatar ?? 'https://github.com/mrzachnugent.png' }}
                  />
                  <AvatarFallback>
                    <Text>{agentInitial}</Text>
                  </AvatarFallback>
                </Avatar>

                <View className="ml-3 flex flex-col items-start justify-center">
                  <Text className="text-start text-lg font-bold text-gray-800">
                    {property.agent.name}
                  </Text>
                  <Text className="text-start text-sm font-medium text-gray-600">
                    {property.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-blue-100">
                  <Ionicons name="chatbubble-outline" size={20} color="#0061FF" />
                </TouchableOpacity>
                <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-blue-100">
                  <Ionicons name="call-outline" size={20} color="#0061FF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-bold text-gray-800">Overview</Text>
            <Text className="mt-2 text-base font-normal text-gray-600">
              {property.description || 'No description provided.'}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-bold text-gray-800">Facilities</Text>
            {property.facilities && property.facilities.length > 0 ? (
              <FacilitiesSection facilities={property.facilities} />
            ) : (
              <Text className="mt-2 text-gray-500">No facilities listed.</Text>
            )}
          </View>

          {property.gallery.length > 0 && <GallerySection gallery={property.gallery} />}

          <View className="mt-7">
            <Text className="text-xl font-bold text-gray-800">Location</Text>
            <View className="mt-4 flex flex-row items-center justify-start gap-2">
              <Ionicons name="location-outline" size={28} color="#0061FF" />
              <Text className="flex-1 text-sm font-medium text-gray-600">{property.address}</Text>
            </View>

            <View className="mt-5 h-52 w-full items-center justify-center rounded-xl bg-gray-200">
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

      <View className="absolute bottom-0 w-full rounded-t-2xl border-l border-r border-t border-gray-200 bg-white p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-xs font-medium text-gray-500">
              Price per{' '}
              {property.paymentTerm === 'academic_year'
                ? 'Aca year'
                : property.paymentTerm === 'yearly'
                  ? 'year'
                  : 'sem'}{' '}
            </Text>
            <Text numberOfLines={1} className="text-start text-2xl font-bold text-blue-600">
              ₵{property.price}
            </Text>
          </View>

          <TouchableOpacity className="flex flex-1 flex-row items-center justify-center rounded-full bg-blue-600 py-3 shadow-md shadow-zinc-400">
            <Text className="text-center text-lg font-bold text-white">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HostelProperty;
