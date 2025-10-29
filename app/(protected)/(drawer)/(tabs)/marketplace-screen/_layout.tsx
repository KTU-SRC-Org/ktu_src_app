import { Stack } from 'expo-router';

export default function MarketplaceStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
        }}
      />
      {/*<Stack.Screen*/}
      {/*  name="categories/index"*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*    presentation: 'card',*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="category/[id]"*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*    presentation: 'card',*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="product/[id]"*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*    presentation: 'card',*/}
      {/*  }}*/}
      {/*/>*/}
    </Stack>
  );
}