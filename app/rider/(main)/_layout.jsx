import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {router} from 'expo-router';
import {Drawer} from 'expo-router/drawer';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {supabase} from "../../../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CustomDrawerContent(props) {
    async function logout() {
        const {error} = await supabase.auth.signOut()

        await AsyncStorage.removeItem("riderID")
        await AsyncStorage.removeItem("clientID")

        if(error) {
            console.log(error)
        } else {
            router.replace("/auth/login")
        }
    }

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container} {...props}>
            <DrawerItem
                label={"Product Pricing"}
                onPress={() => router.push("/rider/product-pricing")}
                icon={() => <MaterialIcons name="inventory" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"Customer Management"}
                onPress={() => router.push("/rider/customer-management")}
                icon={() => <MaterialIcons name="account-circle" size={24} color="black"/>}
                labelStyle={styles.label}
            />
            <DrawerItem
                label={"History"}
                onPress={() => router.push("/rider/history")}
                icon={() => <MaterialIcons name="history" size={24} color="black"/>}
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
