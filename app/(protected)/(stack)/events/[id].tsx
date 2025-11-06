import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import EventDetails from "@/features/events/event-details";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const eventId = Array.isArray(id) ? id[0] : (id ?? '');

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <EventDetails id={eventId}/>
    </SafeAreaView>
  );
};
export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
