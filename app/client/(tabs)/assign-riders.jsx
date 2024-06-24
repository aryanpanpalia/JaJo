import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBar from '../../../components/BottomBar'

export default function AssignRiders() {
  return (
	<View style={styles.container}>
	  <Text>Assign Riders</Text>
	  <BottomBar selected={"rider"} />
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