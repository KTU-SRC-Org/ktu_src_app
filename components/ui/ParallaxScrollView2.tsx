import {PropsWithChildren} from "react";
import { StyleSheet, View, Text} from "react-native";
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from "react-native-reanimated";
import {Image} from "expo-image";

export const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[" as string;

const HEADER_HEIGHT = 400

const ParallaxScrollView = ({children}: PropsWithChildren) => {

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)

    const headerAnimatedStyle = useAnimatedStyle(() => {

        const translateY = scrollOffset.value <= 0 ? interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0],
                [-HEADER_HEIGHT / 2, 0])
            : 0; //no transform when scrolling up  - let natural scroll handle

        const scale = scrollOffset.value <= 0 ? interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0], [2, 1])
            : 1; // no scaling when scrolling up

        return {
            transform: [
                {
                    translateY,
                },
                {
                    scale,
                },
            ],
        };
    });


    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={[headerAnimatedStyle, {height: HEADER_HEIGHT, overflow: "hidden"}]}>
                    <Image
                        source={require('@/assets/images/ktu-image.png')}
                        placeholder={blurhash}
                        style={{
                            width: "100%",
                            height: HEADER_HEIGHT
                        }}

                    />
                </Animated.View>

                <View style={styles.headerContainer}>
                    <View style={{flex: 1}}/>

                    <View style={styles.headerContent}>
                        {/*<Text style={styles.headerSubtitle}>Feature Session</Text>*/}
                        {/*<Text style={styles.headerTitle}>todaySession.title</Text>*/}
                        {/*<Text style={styles.headerDescription}>todaySession.description</Text>*/}
                        <View className='flex flex-row h-full w-full  relative pt-10'>
                            <Image
                                source={require('@/assets/images/sign-up-image.png')}
                                placeholder={blurhash}
                                style={{
                                    width: "45%",
                                    objectFit: 'contain'
                                }}

                            />

                            {/*<Image*/}
                            {/*    source={require('@/assets/images/auth-text.png')}*/}
                            {/*    placeholder={blurhash}*/}
                            {/*    style={{*/}
                            {/*        width: "50%",*/}

                            {/*        objectFit: 'contain'*/}
                            {/*    }}*/}

                            {/*/>*/}

                            <View className=' absolute w-[58%] right-0 bottom-0'>
                                <Text style={styles.headerTitle}>Welcome.</Text>
                                <Text style={styles.headerSubtitle}>To your S.R.C App</Text>
                                <Text style={styles.headerSubtitle}>Sign up to get</Text>
                                <Text style={styles.headerSubtitle}>started on your
                                    campus journey</Text>

                                <Text className=' text-lg font-medium text-white mt-5'>Your <Text className='text-[#F5882B]'>campus</Text>, your <Text className='text-[#F5882B]'>voice</Text></Text>
                            </View>

                        </View>
                    </View>

                </View>
                {children}
            </Animated.ScrollView>

        </View>
    );
};

export default ParallaxScrollView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerSubtitle: {
        fontSize: 20,
        fontWeight: "500",
        color: "white",
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: "500",
        color: "white",
    },
    headerDescription:{
        fontSize: 16,
        color: "white",
    },
    headerContainer: {
        position: "absolute",
        width: "100%",
        height: HEADER_HEIGHT,
        experimental_backgroundImage: "linear-gradient(to bottom, rgba(10, 76, 163, 0.7) 0%, rgba(10, 76, 163, 0.9) 100%)"
    },
    headerContent:{
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    }
})