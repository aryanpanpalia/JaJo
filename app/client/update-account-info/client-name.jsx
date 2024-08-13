import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import InputField from "../../../components/InputField";
import {router} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../../components/Button";

let clientName = "Panpalia Products"

export default function UpdateClientName() {
    const [newClientName, setNewClientName] = useState(clientName)
    const [clientNameError, setClientNameError] = useState(null);

    function submit() {
        if (!newClientName) {
            setClientNameError("Must enter a name")
            return
        }

        clientName = newClientName

        router.back()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.chevron} onPress={router.back}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black"/>
                </Pressable>
                <Text style={styles.headerText}>Update Client Name</Text>
            </View>

            <InputField
                label={"Client Name"}
                placeholder={"Enter Client Name Here"}
                value={newClientName}
                onChangeText={setNewClientName}
                error={clientNameError}
            />

            <Button text={"Update Client Name"} dark={true} width={"100%"} height={50} onPress={submit}/>
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