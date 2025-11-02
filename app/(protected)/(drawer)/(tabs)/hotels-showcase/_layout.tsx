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
        <Stack.Screen
          name="all-hostels-screen"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    );
}


export default Layout;
