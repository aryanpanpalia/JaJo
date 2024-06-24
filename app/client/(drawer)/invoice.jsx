import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBar from '../../../components/BottomBar'
import Header from '../../../components/Header'

export default function Invoice() {
	return (
		<View style={styles.container}>
			<Header label={"Invoice"} />
			<BottomBar />
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
