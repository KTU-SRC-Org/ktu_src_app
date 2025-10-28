import { View, Text, StyleSheet } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';

const UpcomingEventCard = () => {
  return (
    <View style={styles.container} className="flex flex-row items-center justify-between gap-3 px-3 py-2 rounded-sm bg-slate-200">
      <View className="px-2 bg-blue-400 rounded-md ">
        <Text className='text-lg font-bold text-center'>OCT</Text>
        <Text className='text-3xl font-extrabold text-center'>O3</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text className='mb-2 font-semibold'>Monthly Town Hall</Text>
        <View className="flex flex-row items-center gap-5">
          <View className="flex flex-row items-center gap-1">
            <Calendar size={12} />
            <Text className="">07:30pm</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <MapPin size={12} />
            <Text>Abba Bentil</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 5,
        },
    }
})

export default UpcomingEventCard;
