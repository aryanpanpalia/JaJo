import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import InputField from "../../../components/InputField";
import {router} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../../components/Button";

let number = "+13141592653"

export default function UpdateNumber() {
    const [newNumber, setNewNumber] = useState(number)
    const [numberError, setNumberError] = useState(null);

    function submit() {
        if (!newNumber) {
            setNumberError("Must enter a number")
            return
        }

        number = newNumber

        router.back()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.chevron} onPress={router.back}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black"/>
                </Pressable>
                <Text style={styles.headerText}>Update Number</Text>
            </View>

            <InputField
                label={"Number"}
                placeholder={"Enter Phone Number Here"}
                keyboardType={"phone-pad"}
                value={newNumber}
                onChangeText={setNewNumber}
                error={numberError}
            />

            <Button text={"Update Number"} dark={true} width={"100%"} height={50} onPress={submit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 25,
        paddingVertical: 60,
        backgroundColor: "white"
    },
    header: {
        paddingLeft: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    chevron: {
        position: "absolute",
        left: -10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "600"
    },
})
