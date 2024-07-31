import {Image, Pressable, StyleSheet, View} from 'react-native'
import React from 'react'
import {router} from 'expo-router';

const dashboard = require('../../assets/images/nav/DashboardLayout.png');
const dashboardFilled = require('../../assets/images/nav/DashboardLayoutFilled.png');

const load = require('../../assets/images/nav/DeliveryHandcart.png');
const loadFilled = require('../../assets/images/nav/DeliveryHandcartFilled.png');

const fulfillment = require('../../assets/images/nav/TaskCompleted.png');
const fulfillmentFilled = require('../../assets/images/nav/TaskCompletedFilled.png');

const messaging = require('../../assets/images/nav/Messaging.png');
const messagingFilled = require('../../assets/images/nav/MessagingFilled.png');

const account = require('../../assets/images/nav/Account.png');
const accountFilled = require('../../assets/images/nav/AccountFilled.png');

export default function BottomBar({selected}) {
    const dashboardImage = selected === "dashboard" ? dashboardFilled : dashboard
    const loadImage = selected === "load" ? loadFilled : load
    const fulfillmentImage = selected === "fulfillment" ? fulfillmentFilled : fulfillment
    const messagingImage = selected === "messaging" ? messagingFilled : messaging
    const accountImage = selected === "account" ? accountFilled : account

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.navigate("/rider/dashboard")}>
                <Image source={dashboardImage} style={styles.image}/>
            </Pressable>

            <Pressable onPress={() => router.navigate("/rider/manage-load")}>
                <Image source={loadImage} style={styles.image}/>
            </Pressable>

            <Pressable onPress={() => router.navigate("/rider/fulfillment")}>
                <Image source={fulfillmentImage} style={styles.image}/>
            </Pressable>

            <Pressable onPress={() => router.navigate("/rider/messaging")}>
                <Image source={messagingImage} style={styles.image}/>
            </Pressable>

            <Pressable onPress={() => router.navigate("/rider/account")}>
                <Image source={accountImage} style={styles.image}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 2,
        padding: 10,
    },
    image: {
        width: 30,
        height: 30
    }
})
