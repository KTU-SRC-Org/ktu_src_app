import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import InfoDetails from '@/features/info-center/info-details';

const InfoScreen = () => {
  const { id } = useLocalSearchParams();
  const infoId = Array.isArray(id) ? id[0] : (id ?? '');

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <InfoDetails id={infoId} />
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
