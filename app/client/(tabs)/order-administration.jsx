import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBar from '../../../components/BottomBar'
import Header from '../../../components/Header'

export default function OrderAdministration() {
	return (
		<View style={styles.container}>
			<Header label={"Orders"} />
			<BottomBar selected={"order"} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 60,
		gap: 20,
		backgroundColor: "white"
	},
})