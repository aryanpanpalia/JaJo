import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {router} from 'expo-router';
import {Drawer} from 'expo-router/drawer';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {supabase} from "../../../lib/supabase";

function CustomDrawerContent(props) {
    async function logout() {
        const {error} = await supabase.auth.signOut()

        if(error) {
            console.log(error)
        } else {
            router.replace("/auth/login")
        }
    }

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container} {...props}>
            <DrawerItem
                label={"Product Management"}
                onPress={() => router.push("/client/product-management")}
                icon={() => <MaterialIcons name="inventory" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"Staff Management"}
                onPress={() => router.push("/client/staff-management")}
                icon={() => <MaterialIcons name="people" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"Location Management"}
                onPress={() => router.push("/client/location-management")}
                icon={() => <MaterialIcons name="location-on" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"Customer Management"}
                onPress={() => router.push("/client/customer-management")}
                icon={() => <MaterialIcons name="account-circle" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"History"}
                onPress={() => router.push("/client/history")}
                icon={() => <MaterialIcons name="history" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"Invoice"}
                onPress={() => router.push("/client/invoice")}
                icon={() => <MaterialIcons name="receipt" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"Log Out"}
                onPress={logout}
                icon={() => <MaterialIcons name="logout" size={24} color="black"/>}
                labelStyle={styles.label}
            />
        </DrawerContentScrollView>
    )
}

export default function Layout() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer screenOptions={{headerShown: false}} drawerContent={CustomDrawerContent} backBehavior="history"/>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: 300
    },
    label: {
        marginLeft: -20,
        color: "black",
        fontWeight: "600"
    }
})
