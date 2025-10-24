import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";

const SignUp = () => {
    return (
        <SafeAreaView>
        <View>
            <Text>Sign up</Text>
            <Link href='/auth/sign-in'>Signin</Link>
        </View>
        </SafeAreaView>
    );
};

export default SignUp;