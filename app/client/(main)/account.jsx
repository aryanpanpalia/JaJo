import {Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'
import {router} from "expo-router";

const data = {
    name: "Aryan Panpalia",
    clientName: "Panpalia Products",
    number: "+1 314 159 2653"
}

export default function Account() {
    return (
        <View style={styles.container}>
            <Header label={"Account"}/>

            <View>
                <Pressable style={styles.item} onPress={() => router.push("/client/update-account-info/name")}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{data.name}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/client/update-account-info/client-name")}>
                    <Text style={styles.label}>Client Name</Text>
                    <Text style={styles.value}>{data.clientName}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/client/update-account-info/number")}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{data.number}</Text>
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