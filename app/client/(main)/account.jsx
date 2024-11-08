import {Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'
import {router, useFocusEffect} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../../lib/supabase";

export default function Account() {
    const [name, setName] = useState("")
    const [clientName, setClientName] = useState("")
    const [phone, setPhone] = useState("")

    async function fetchName() {
        const {data, error} = await supabase.auth.getUser()

        if (error) {
            console.log("Client-account-fetchName: ", error)
        } else {
            setName(data.user.user_metadata.name)
        }
    }

    async function fetchPhone() {
        const {data, error} = await supabase.auth.getUser()

        if (error) {
            console.log("Client-account-fetchPhone: ", error)
        } else {
            setPhone(data.user.phone)
        }
    }

    async function fetchClientName() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data, error} = await supabase
            .from('clients')
            .select('client_name')
            .eq('id', clientID)
            .single()

        if (error) {
            console.log("Client-account-fetchClientName: ", error)
        } else {
            const {client_name} = data
            setClientName(client_name)
        }
    }

    useFocusEffect(() => {
        fetchName()
        fetchClientName()
        fetchPhone()
    })

    return (
        <View style={styles.container}>
            <Header label={"Account"}/>

            <View>
                <Pressable style={styles.item} onPress={() => router.push("/client/update-account-info/name")}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{name}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/client/update-account-info/client-name")}>
                    <Text style={styles.label}>Client Name</Text>
                    <Text style={styles.value}>{clientName}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/client/update-account-info/number")}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{phone}</Text>
                </Pressable>
            </View>

            <BottomBar selected={"account"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingTop: 60,
        paddingBottom: 80,
        paddingHorizontal: 25,
        backgroundColor: "white"
    },
    item: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 15
    },
    label: {
        width: 120,
        fontWeight: "600"
    },
    value: {
        flex: 1
    }
})