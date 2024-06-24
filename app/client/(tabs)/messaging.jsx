import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBar from '../../../components/BottomBar'

export default function Messaging() {
  return (
	<View style={styles.container}>
	  <Text>Messaging</Text>
	  <BottomBar selected={"messaging"} />
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