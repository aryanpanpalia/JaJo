import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBar from '../../../components/BottomBar'

export default function Account() {
  return (
	<View style={styles.container}>
	  <Text>Account</Text>
	  <BottomBar selected={"account"} />
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