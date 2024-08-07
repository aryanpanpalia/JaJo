import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import InputField from "../../../components/InputField";
import {router} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../../components/Button";

let name = "Teja Singh"

export default function UpdateName() {
    const [newName, setNewName] = useState(name)
    const [nameError, setNameError] = useState(null);

    function submit() {
        if (!newName) {
            setNameError("Must enter a name")
            return
        }

        name = newName

        router.back()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.chevron} onPress={router.back}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black"/>
                </Pressable>
                <Text style={styles.headerText}>Update Name</Text>
            </View>

            <InputField
                label={"Name"}
                placeholder={"Enter Name Here"}
                value={newName}
                onChangeText={setNewName}
                error={nameError}
            />

            <Button text={"Update Name"} dark={true} width={"100%"} height={50} onPress={submit}/>
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