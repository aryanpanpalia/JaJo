import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from 'react'
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase"

export default function LogIn() {
	const [number, setNumber] = useState()
	const [numberError, setNumberError] = useState()

	const [password, setPassword] = useState()
	const [passwordError, setPasswordError] = useState();

	const [loading, setLoading] = useState(false);

	async function signIn() {
		setNumberError(!number ? "Please enter your phone number" : null)
		setPasswordError(!password ? "Please enter your password" : null)	

		if(!number || !password) return

		setLoading(true)

		const { user, error } = await supabase.auth.signInWithPassword({
			phone: number,
			password: password,
		})

		setLoading(false)

		if(error) {
			setNumberError("Invalid Login Credentials")
			setPasswordError("Invalid Login Credentials")
			console.log(error)
		} else {
			const { data: { user } } = await supabase.auth.getUser()
			const role = user.user_metadata.role

			if(role === "Client") {
				router.replace("/client/dashboard")
			} else if(role === "Rider") {
				router.replace("/rider/select-client")
			} else {
				console.log("Attempting to login Customer. Functionality not implemented yet.")
			}
		}
	}

  	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

				<View style={styles.logo}>
					<Image source={require("../../assets/images/bike.jpg")} style={styles.image}/>
					<Text style={styles.logoText}>JaJo</Text>
				</View>

				<InputField label={"Phone Number"} placeholder={"Enter Your Phone Number"} width={295} onChangeText={(text) => setNumber(text)} error={numberError} keyboardType="phone-pad" />
				<InputField label={"Password"} secureTextEntry placeholder={"Enter Your Password"} width={295} onChangeText={(text) => setPassword(text)} error={passwordError} />

				<Button text={"Sign In"} dark={true} width={295} height={50} disabled={loading} onPress={signIn}/>

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
