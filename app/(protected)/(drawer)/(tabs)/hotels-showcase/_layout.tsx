import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const Layout = () => {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
