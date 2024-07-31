import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import {Dropdown} from "react-native-element-dropdown";
import Button from "../../components/Button";
import {router} from "expo-router";

const data = [
    {value: "Panpalia Products"},
    {value: "Garcia Groceries"}
]

export default function SelectClient() {
    const [client, setClient] = useState()

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Welcome to JaJo!</Text>
                <Text>Select the Client to deliver for here!</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.dropdownLabel}>Select Client</Text>
                <Dropdown style={styles.dropdown} data={data} labelField={'value'} valueField={'value'} onChange={setClient}/>
            </View>
            <Button text={"Next"} dark={true} width={"100%"} height={50} onPress={() => router.push("/rider/dashboard")} />
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
    headerText: {
        fontSize: 24,
        fontWeight: "600"
    },
    form: {
        gap: 10
    },
    dropdownLabel: {
        fontWeight: "600"
    },
    dropdown: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10
    }
});
