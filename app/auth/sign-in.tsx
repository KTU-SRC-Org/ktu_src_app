import React, {useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
    View,
    Text,
    TabController,
    TabControllerItemProps,
    Colors,
    TabControllerImperativeMethods,
} from 'react-native-ui-lib';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView2';
import { Input } from '@/components/ui/input';

const SignIn = () => {
    const tabController = useRef<TabControllerImperativeMethods>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const items = [
        {label: 'Sign In', key: 'signin'},
        {label: 'Sign Up', key: 'signup'},
    ];

    return (
        <ParallaxScrollView>
            <View flex >
                <TabController
                    items={items}
                    initialIndex={selectedIndex}
                    onChangeIndex={setSelectedIndex}
                    asCarousel
                    ref={tabController}
                >
                    {/* Tab Bar */}
                    <TabController.TabBar
                        labelStyle={styles.labelStyle}
                        selectedLabelStyle={styles.selectedLabelStyle}
                        selectedLabelColor={Colors.orange30}
                        indicatorStyle={styles.indicatorStyle}
                        activeBackgroundColor='transparent'
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
                                <Text>Text inn</Text>
                                <Input
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    autoComplete="email"
                                    placeholder="Email"
                                />
                            </View>
                        </TabController.TabPage>

                        <TabController.TabPage index={1}>
                            <View flex center paddingV-30>
                                <Text>Signin</Text>
                            </View>
                        </TabController.TabPage>
                    </TabController.PageCarousel>
                </TabController>
            </View>
        </ParallaxScrollView>
    );
};

export default SignIn;

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
