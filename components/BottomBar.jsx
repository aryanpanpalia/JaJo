import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const dashboard = require('../assets/images/nav/DashboardLayout.png');
const dashboardFilled = require('../assets/images/nav/DashboardLayoutFilled.png');

const order = require('../assets/images/nav/OrderAdministration.png');
const orderFilled = require('../assets/images/nav/OrderAdministrationFilled.png');

const rider = require('../assets/images/nav/AssignRider.png');
const riderFilled = require('../assets/images/nav/AssignRiderFilled.png');

const messaging = require('../assets/images/nav/Messaging.png');
const messagingFilled = require('../assets/images/nav/MessagingFilled.png');

const account = require('../assets/images/nav/Account.png');
const accountFilled = require('../assets/images/nav/AccountFilled.png');

export default function BottomBar({selected}) {

	const dashboardImage = selected === "dashboard" ? dashboardFilled : dashboard
	const orderImage = selected === "order" ? orderFilled : order
	const riderImage = selected === "rider" ? riderFilled : rider
	const messagingImage = selected === "messaging" ? messagingFilled : messaging
	const accountImage = selected === "account" ? accountFilled : account

  	return (
		<View style={styles.container}>
			<Image source={dashboardImage} style={{width: 30, height: 30}} />
			<Image source={orderImage} style={{width: 30, height: 30}} />
			<Image source={riderImage} style={{width: 30, height: 30}} />
			<Image source={messagingImage} style={{width: 30, height: 30}} />
			<Image source={accountImage} style={{width: 30, height: 30}} />
		</View>
	)	
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 80,
		flexDirection: "row",
		justifyContent: "space-evenly",
		position: "absolute",
		bottom: 0,
		borderTopWidth: 2,
		padding: 10
	}
})
