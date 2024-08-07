import {Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import BottomBar from '../../../components/rider/BottomBar'
import Header from '../../../components/Header'
import {router} from "expo-router";

const data = {
    name: "Teja Singh",
    clientName: "Panpalia Products",
    number: "+1 314 159 2653",
    availability: ['M', 'W', 'Sa', 'Su']
}

export default function Account() {
    return (
        <View style={styles.container}>
            <Header label={"Account"} style={styles.header}/>

            <View style={styles.information}>
                <Pressable style={styles.item} onPress={() => router.push("/rider/update-account-info/name")}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{data.name}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/rider/select-client")}>
                    <Text style={styles.label}>Client Name</Text>
                    <Text style={styles.value}>{data.clientName}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/rider/update-account-info/number")}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{data.number}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/rider/update-account-info/availability")}>
                    <Text style={styles.label}>Availability</Text>
                    <View style={styles.circles}>
                        {data.availability.map(day => (
                            <View style={styles.circle} key={day}>
                                <Text>{day}</Text>
                            </View>
                        ))}
                    </View>
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
    header: {
        width: "100%"
    },
    item: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
        alignItems: "center"
    },
    label: {
        width: 120,
        fontWeight: "600"
    },
    value: {
        flex: 1
    },

    circles: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
