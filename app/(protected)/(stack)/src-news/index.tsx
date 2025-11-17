import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import SrcNewsList from '@/features/src-news/src-news-list';

const SrcNews = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <SrcNewsList />
    </SafeAreaView>
  );
};
export default SrcNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
