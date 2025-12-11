import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import InfoDetails from '@/features/info-center/info-details';

const InfoScreen = () => {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
  const infoId = Array.isArray(id) ? id[0] : (id ?? '');
  const infoType = Array.isArray(type) ? type[0] : (type ?? 'announcement'); // Default to announcement if missing

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <InfoDetails id={infoId} type={infoType as 'notification' | 'announcement'} />
    </SafeAreaView>
  );
};
export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
