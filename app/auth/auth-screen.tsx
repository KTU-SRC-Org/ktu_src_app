import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View, TabController, Colors, TabControllerImperativeMethods } from 'react-native-ui-lib';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView2';
import SignUpForm from '@/features/Auth/sign-up-form';
import SignInForm from '@/features/Auth/sign-in-form';

const AuthScreen = () => {
  const tabController = useRef<TabControllerImperativeMethods>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    { label: 'Sign Up', key: 'signup' },
    { label: 'Sign In', key: 'signin' },
  ];

  return (
    <ParallaxScrollView>
      <View flex>
        <TabController
          items={items}
          initialIndex={selectedIndex}
          onChangeIndex={setSelectedIndex}
          asCarousel
          ref={tabController}>
          {/* Tab Bar */}
          <TabController.TabBar
            labelStyle={styles.labelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
            selectedLabelColor={Colors.orange30}
            indicatorStyle={styles.indicatorStyle}
            activeBackgroundColor="transparent"
            backgroundColor="transparent"
            spreadItems={false}
            containerStyle={{
              flex: 1,
              height: '100%',
            }}
          />

          {/* Tab Pages */}
          <TabController.PageCarousel>
            <TabController.TabPage index={0}>
              <View flex paddingV-30 paddingH-20>
                <SignUpForm />
              </View>
            </TabController.TabPage>

            <TabController.TabPage index={1}>
              <View flex paddingV-30 paddingH-20>
                <SignInForm />
              </View>
            </TabController.TabPage>
          </TabController.PageCarousel>
        </TabController>
      </View>
    </ParallaxScrollView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.grey30,
  },
  selectedLabelStyle: {
    fontSize: 16,
    color: Colors.orange30,
  },
  indicatorStyle: {
    backgroundColor: Colors.orange30,
    height: 3,
    width: 10,
  },
});
