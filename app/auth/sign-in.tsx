import {Text, View} from 'react-native'
import ParallaxScrollView from "@/components/ui/ParallaxScrollView2";


const SignIn = () => {
    return (
        <ParallaxScrollView>
            <View className='flex flex-1 justify-center items-center'>
                <Text>Signin</Text>
            </View>
        </ParallaxScrollView>
    );
};

export default SignIn;