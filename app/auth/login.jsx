import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from 'react'
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link } from "expo-router";

export default function LogIn() {
  	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

				<View style={styles.logo}>
					<Image source={require("../../assets/images/bike.jpg")} style={styles.image}/>
					<Text style={styles.logoText}>JaJo</Text>
				</View>

				<InputField label={"Phone Number"} placeholder={"Enter Your Phone Number"} secure={false} width={295}/>
				<InputField label={"Password"} placeholder={"Enter Your Password"} secure={true} width={295}/>

				<Button text={"Sign In"} dark={true} width={295} height={50}/>

				<View style={styles.signUp}>
					<Text>Don't have an account?</Text>
					<Pressable>
						<Link href={"/auth/signup"} style={styles.signUpText}>Sign Up</Link>
					</Pressable>
				</View>

			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
  	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		gap: 10,
		paddingHorizontal: 50,
	},
	logo: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 15
	},
	image: {
		width: 250,
		height: 150
	},
	logoText: {
		fontWeight: "bold",
		fontSize: 40
	},
	signUp: {
		flexDirection: "row",
		gap: 5
	},
	signUpText: {
		fontWeight: "600"
	}
})
