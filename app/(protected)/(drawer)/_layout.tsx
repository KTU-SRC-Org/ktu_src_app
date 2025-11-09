import { StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {usePathname, router, Href} from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Avatar, Text as UiText, View as UiView } from 'react-native-ui-lib';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import {DrawerItemProps, drawerItems} from "@/constants/drawer-items";
import {student} from "@/constants/dummy-data/student";

const CustomDrawerContent = (props: any) => {
  const path = usePathname();
  const { colorScheme } = useColorScheme();

  const getBackgroundColor = (target: string) =>
    path === target
      ? colorScheme === 'dark'
        ? '#333'
        : '#e6f0ff'
      : 'transparent';

  const getLabelColor = (target: string) =>
    path === target
      ? colorScheme === 'dark'
        ? '#fff'
        : '#000'
      : colorScheme === 'dark'
        ? '#ccc'
        : '#111';

  const handleDrawerItemPress = (item: DrawerItemProps) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.route) {
      router.push(item.route as Href);
    } else {
      console.log(`No action`);
    }
  };
  
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        flex: 1,
        paddingBottom: 40,
      }}
    >
      <UiView paddingH-14 paddingV-14 className="flex flex-row items-center gap-4">
        <Avatar
          size={65}
          backgroundColor="#e6e6e6"
          label={student.fullName
            .trim()
            .split(/\s+/)
            .map(word => word[0])
            .join('')
            .toUpperCase()}
          labelColor="#111"
          onPress={() => console.log('avatar')}
        />
        <UiView className={"flex flex-col justify-center"}>
          <UiView centerV marginT-8 className="flex flex-row items-center gap-2">
            <UiText text70 className="items-center font-bold truncate">
              {student.fullName}
            </UiText>
            {student.isVerified && (
              <MaterialIcons name="verified" size={20} color="#007AFF" />
            )}
          </UiView>
          <UiText className="items-center text-sm text-gray-500">
            {student.indexNumber}
          </UiText>
        </UiView>
      </UiView>

      <UiView paddingV-12 paddgingH-14>
        {drawerItems.map((item) => {
          if (item.position === 'bottom') return null;
          const IconSet = item.isFeather ? Feather : MaterialIcons;
          return (
            <DrawerItem
              key={item.label}
              icon={() => (
                <IconSet name={item.icon as any} size={22} color={getLabelColor(item.route || "")} />
              )}
              label={item.label}
              labelStyle={[styles.navItemLabel, { color: getLabelColor(item.route || "") }]}
              style={[{
                backgroundColor: getBackgroundColor(item.route || ""),
                borderRadius: 8
              }]}
              onPress={() => handleDrawerItemPress(item)}
            />
          );
        })}
      </UiView>

      <UiView paddingH-14 className={"absolute left-0 right-0 bottom-8 border-t border-gray-200"}>
        {drawerItems
          .filter((item) => item.position === 'bottom')
          .map((item) => {
            const IconSet = item.isFeather ? Feather : MaterialIcons;
            return (
              <DrawerItem
                key={`bottom-${item.label}`}
                icon={() => (
                  <IconSet name={item.icon as any} size={22} color={getLabelColor(item.route || "")} />
                )}
                label={item.label}
                labelStyle={[styles.navItemLabel, { color: getLabelColor(item.route || "") }]}
                style={[{
                  backgroundColor: getBackgroundColor(item.route || ''),
                  borderRadius: 8
                }]}
                onPress={() => handleDrawerItemPress(item)}
              />
            );
          })}
      </UiView>
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, swipeEdgeWidth: 0, drawerType: 'front' }}
    />
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    paddingLeft: -15,
    fontSize: 16,
  },
});
