import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem label={"Dashboard"} onPress={() => router.push("/client/dashboard")} />
		</DrawerContentScrollView>
	)
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{headerShown: false}} drawerContent={CustomDrawerContent} />
    </GestureHandlerRootView>
  );
}
