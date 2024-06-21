import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function NavigationButton({text, selected, type, ...restProps}) {

	const styles = StyleSheet.create({
		button: {
			justifyContent: "center",
			alignSelf: "center",
			backgroundColor: selected ? "black" : "white",
			borderTopLeftRadius: type === "left" ? 10 : 0,
			borderBottomLeftRadius: type === "left" ? 10 : 0,
			borderTopRightRadius: type === "right" ? 10 : 0,
			borderBottomRightRadius: type === "right" ? 10 : 0,
			borderWidth: 1
		},
		text: {
			color: selected ? "white" : "black",
			textAlign: "center",
			fontSize: 16,
			fontWeight: "600"
		}
	})
	
	return (
		<Pressable style={styles.button} {...restProps}>
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	)
}
