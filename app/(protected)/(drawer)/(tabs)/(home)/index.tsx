import { StyleSheet, View, ScrollView } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

import { ScreenContent } from '@/components/ScreenContent';
import HomeCustomHeader from "@/components/home/HomeCustomHeader";
import HomeUpdatesCarousel from "@/components/builders/HomeUpdatesCarousel";
import HomeRepresentativeCarousel from "@/components/builders/HomeRepresentativeCarousel";
import {RepresentativeCard} from "@/components/cards/RepresentativeCard";

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.container}>
          <HomeCustomHeader />

        <ScrollView style={{flex: 1}} className='bg-red-500 pt-2'>
            <HomeUpdatesCarousel />
            <RepresentativeCard id={'dfdfd'} name={'dfdfd'} position={'dfdffd'} description={'dfdfdf'} imageUrl={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}/>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
});
