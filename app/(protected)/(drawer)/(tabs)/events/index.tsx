import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import EventsDisplay from "@/features/events/events-display";

const Index = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <EventsDisplay/>
    </SafeAreaView>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
