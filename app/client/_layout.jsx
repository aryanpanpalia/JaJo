import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView style={styles.container} {...props}>
			<View style={styles.userInformation}>
				<View style={styles.placeholderImage} />
				<Text style={styles.name}>Placeholder Name</Text>
				<Text style={styles.number}>+99 999 999 9999</Text>
			</View>
			<DrawerItem 
				label={"Product Management"} 
				onPress={() => router.push("/client/product-management")} 
				icon={() => <MaterialIcons name="inventory" size={24} color="black" />} 
				labelStyle={styles.label} 
			/>
			<DrawerItem 
				label={"Staff Management"} 
				onPress={() => router.push("/client/staff-management")} 
				icon={() => <MaterialIcons name="people" size={24} color="black" />} 
				labelStyle={styles.label} 
			/>
			<DrawerItem 
				label={"Location Management"} 
				onPress={() => router.push("/client/location-management")} 
				icon={() => <MaterialIcons name="location-on" size={24} color="black" />} 
				labelStyle={styles.label} 
			/>
			<DrawerItem 
				label={"Customer Management"} 
				onPress={() => router.push("/client/customer-management")} 
				icon={() => <MaterialIcons name="account-circle" size={24} color="black" />} 
				labelStyle={styles.label} 
			/>
			<DrawerItem 
				label={"History"} 
				onPress={() => router.push("/client/history")} 
				icon={() => <MaterialIcons name="history" size={24} color="black" />} 
				labelStyle={styles.label} 
			/>
			<DrawerItem 
				label={"Invoice"} 
				onPress={() => router.push("/client/invoice")} 
				icon={() => <MaterialIcons name="receipt" size={24} color="black" />} 
				labelStyle={styles.label} 
			/>
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

const styles = StyleSheet.create({
	container: {
		padding: 10,
		width: 300
	},

	userInformation: {
		marginLeft: 18,
		marginBottom: 10,
		gap: 5
	},
	placeholderImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#CCCCCC',
  	},
	name: {
		fontSize: 14,
		fontWeight: "600"
	},
	number: {
		fontWeight: "600",
		color: "#666666",
		fontSize: 12
	},

	label: {
		marginLeft: -20,
		color: "black",
		fontWeight: "600"
	}
})
