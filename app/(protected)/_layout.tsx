import { Stack } from 'expo-router';

const ProtectedLayout = () => {
    return (
        <Stack>
          <Stack.Screen
            name="complete-profile-screen"
            options={{ headerShown: false }}
          />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="(stack)/marketplace/categories/index" options={{ headerShown: false }} />
            <Stack.Screen name="(stack)/marketplace/category/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="(stack)/marketplace/product/[id]" options={{ headerShown: false }} />
        </Stack>
    );
};

export default ProtectedLayout;
