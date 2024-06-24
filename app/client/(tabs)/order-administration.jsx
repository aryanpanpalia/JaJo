import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBar from '../../../components/BottomBar'

export default function OrderAdministration() {
  return (
	<View style={styles.container}>
	  <Text>Order Administration</Text>
	  <BottomBar selected={"order"} />
	</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})