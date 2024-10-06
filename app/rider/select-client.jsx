import {StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Dropdown} from "react-native-element-dropdown";
import Button from "../../components/Button";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../lib/supabase";


export default function SelectClient() {
    const [clients, setClients] = useState([])
    const [client, setClient] = useState()

    async function fetchClients() {
        const riderID = parseInt(await AsyncStorage.getItem("riderID"))

        const {data: clients, error} = await supabase
            .rpc('get_rider_clients', {p_rider_id: riderID})
            .order('client_id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            setClients(clients)
        }
    }

    async function submit() {
        await AsyncStorage.setItem("clientID", client["client_id"].toString())

        router.push("/rider/dashboard")
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Welcome to JaJo!</Text>
                <Text>Select the Client to deliver for here!</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.dropdownLabel}>Select Client</Text>
                <Dropdown style={styles.dropdown} data={clients} labelField={'client_name'} valueField={'client_id'} onChange={setClient}/>
            </View>
            <Button text={"Next"} dark={true} width={"100%"} height={50} onPress={submit}/>
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
