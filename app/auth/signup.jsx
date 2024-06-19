import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { supabase } from "../../lib/supabase"
import { router } from "expo-router"

/*
    https://medium.com/@nickopops/keyboardavoidingview-not-working-properly-c413c0a200d4
    https://stackoverflow.com/questions/48420468/keyboardavoidingview-not-working-properly
*/

export default function SignUp() {
    const [role, setRole] = useState("Customer")
    const [name, setName] = useState();
    const [number, setNumber] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [loading, setLoading] = useState(false);
    const [waitingForOTP, setWaitingForOTP] = useState(false);
    const [OTP, setOTP] = useState();

    async function sendOTP() {
        if(password !== confirmPassword) {
            console.log("passwords do not match")
            return
        } else if(password.length < 6) {
            console.log("password too short")
            return
        }

        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            phone: number,
            password: password,
        })

        if(error) {
            console.log(error)
        } else {
            setWaitingForOTP(true)
        }
        
        setLoading(false)
    }

    async function verifyOTP() {
        if(OTP.length !== 6) return
        
        setLoading(true)

        const { data: { session }, error } = await supabase.auth.verifyOtp({
            phone: number,
            token: OTP,
            type: 'sms',
        })

        setLoading(false)

        if(error) {
            console.log(error)
        } else {
            router.replace("/dashboard")
        }
    }

    return !waitingForOTP ? (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.header}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black" style={styles.chevron} />
                    <Text style={styles.headerText}>JaJo</Text>
                </View>

                <View style={styles.information}>
                    <Text style={styles.mainInformationText}>Register New Account</Text>
                    <Text>Fill in the information below to register!</Text>
                </View>
                
                <View style={styles.registrationForm}>
                    <View style={styles.selectRole}>
                        <Text style={styles.selectRoleText}>Select Role</Text>
                        <View style={styles.buttonGroup}>
                            <Button text={"Customer"} width={"32%"} height={50} dark={role === "Customer"} onPress={() => setRole("Customer")}/>
                            <Button text={"Rider"} width={"32%"} height={50} dark={role === "Rider"} onPress={() => setRole("Rider")}/>
                            <Button text={"Client"} width={"32%"} height={50} dark={role === "Client"} onPress={() => setRole("Client")}/>
                        </View>
                    </View>

                    <InputField label={"Name"} placeholder={"Enter Name Here"} width={335} onChangeText={(text) => setName(text)}/>
                    <InputField label={"Phone Number"} placeholder={"Enter Phone Number Here"} width={335} onChangeText={(text) => setNumber(text)}/>
                    <InputField label={"Password"} placeholder={"Enter Password Here"} secureTextEntry width={335} onChangeText={(text) => setPassword(text)}/>
                    <InputField label={"Confirm Password"} placeholder={"Re-Enter Password Here"} secureTextEntry width={335} onChangeText={(text) => setConfirmPassword(text)}/>
                </View>

                <Button text={"Next"} width={335} height={50} dark={true} disabled={loading} onPress={sendOTP}/>

                <View style={{flex: 1}} />

			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
    ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black" style={styles.chevron} />
                    <Text style={styles.headerText}>JaJo</Text>
                </View>

                <View style={styles.information}>
                    <Text style={styles.mainInformationText}>Enter Confirmation Code</Text>
                    <Text>Enter the 6-digit code we just sent to you</Text>
                </View>

                <InputField label={"OTP"} placeholder={"Enter OTP Here"} width={335} keyboardType={"numeric"} maxLength={6} onChangeText={(text) => setOTP(text)} />
                
                <Button text={"Sign Up"} width={335} height={50} dark={true} disabled={loading} onPress={verifyOTP} />
                
                <View style={{flex: 1}} />

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 25,
        gap: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 335,
        height: 60
    },
    chevron: {
        position: "absolute",
        left: -10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "600"
    },
    information: {
        alignItems: "flex-start",
        width: 335
    },
    mainInformationText: {
        fontSize: 20,
        fontWeight: "600"
    },

    registrationForm: {
        width: 335,
        alignItems: "flex-start",
        gap: 10
    },
    selectRole: {
        width: "100%",
        alignItems: "flex-start",
        gap: 5
    },
    selectRoleText: {
        fontSize: 16,
        fontWeight: "600"
    },
    buttonGroup: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    }
})
