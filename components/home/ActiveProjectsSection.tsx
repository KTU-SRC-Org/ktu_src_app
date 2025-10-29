import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import ProjectProgress from '../shared/project-progress';

const ActiveProjectsSection = () => {
  return (
    <View className="px-2">
      <View style={styles.container} className="px-3 pt-5 pb-10 mb-10 bg-white rounded-lg">
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className="text-lg font-bold ">ACTIVE PROJECTS</Text>
          <Link href="/">
            <Text className="text-sm text-blue-500">View All</Text>
          </Link>
        </View>

        <View className="gap-4">
          <ProjectProgress title="Bus shuttle agenda" progress={50} />
          <ProjectProgress title="BUS" progress={30} indicatorColor="bg-red-500" />
          <ProjectProgress
            title="Bus shuttle agenda"
            progress={50}
            gradientColors={['#FF6B6B', '#4ECDC4']}
          />

          <ProjectProgress
            title="Library Renovation"
            progress={75}
            gradientColors={['#667eea', '#764ba2', '#f093fb']}
          />

          <ProjectProgress
            title="Traditional Progress"
            progress={30}
            indicatorColor="bg-blue-500"
          />
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
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ActiveProjectsSection;
