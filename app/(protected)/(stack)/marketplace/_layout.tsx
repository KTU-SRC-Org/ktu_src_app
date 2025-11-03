
import { Stack } from 'expo-router';

const MarketplaceLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="categories/index" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MarketplaceLayout;
