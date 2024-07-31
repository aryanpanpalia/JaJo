import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-element-dropdown'
import { useNavigation } from 'expo-router'

export default function Header({label, dropdownData, dropdownValue, onDropdownChange, style}) {
	const navigation = useNavigation()

	return (
		<View style={[styles.header, style]}>
			<Pressable style={styles.menu} onPress={() => navigation.openDrawer()}>
				<MaterialCommunityIcons name='menu' size={30} color="black" />
			</Pressable>
			<Text style={styles.headerText}>{label}</Text>
			
			{dropdownData && (
				<Dropdown
					style={styles.dropdown}
					data={dropdownData}
					maxHeight={300}
					labelField="label"
					valueField="value"
					value={dropdownValue}
					onChange={onDropdownChange}
				/>
			)}
			
		</View>			
	)
}

const styles = StyleSheet.create({
	header: {
		width: 335,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	menu: {
		position: "absolute",
		left: 0,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "700",
	},
	dropdown: {
		position: "absolute",
		right: 0,
		width: 85,
		height: 30,
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	}
})
