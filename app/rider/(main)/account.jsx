import {Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import BottomBar from '../../../components/rider/BottomBar'
import Header from '../../../components/Header'
import {router, useFocusEffect} from "expo-router";
import {supabase} from "../../../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account() {
    const [name, setName] = useState("")
    const [clientName, setClientName] = useState("")
    const [phone, setPhone] = useState("")
    const [availability, setAvailability] = useState({
        "Monday": false, "Tuesday": false, "Wednesday": false, "Thursday": false, "Friday": false, "Saturday": false, "Sunday": false
    })

    const dayLabels = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
    const dayLabelToDay = {"M": "Monday", "Tu": "Tuesday", "W": "Wednesday", "Th": "Thursday", "F": "Friday", "Sa": "Saturday", "Su": "Sunday"}

    async function fetchName() {
        const {data, error} = await supabase.auth.getUser()

        if (error) {
            console.log(error)
        } else {
            setName(data.user.user_metadata.name)
        }
    }

    async function fetchPhone() {
        const {data, error} = await supabase.auth.getUser()

        if (error) {
            console.log(error)
        } else {
            setPhone(data.user.phone)
        }
    }

    async function fetchClientName() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: {client_name}, error} = await supabase
            .from('clients')
            .select('client_name')
            .eq('id', clientID)
            .single()

        if (error) {
            console.log(error)
        } else {
            setClientName(client_name)
        }
    }

    async function fetchAvailability() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))
        const riderID = parseInt(await AsyncStorage.getItem("riderID"))

        const {data: {availability}, error} = await supabase
            .from('client_riders')
            .select('availability')
            .eq('client_id', clientID)
            .eq('rider_id', riderID)
            .single()

        if (error) {
            console.log(error)
        } else {
            setAvailability(availability)
        }
    }

    useFocusEffect(() => {
        fetchName()
        fetchClientName()
        fetchPhone()
        fetchAvailability()
    })

    return (
        <View style={styles.container}>
            <Header label={"Account"}/>

            <View style={styles.information}>
                <Pressable style={styles.item} onPress={() => router.push("/rider/update-account-info/name")}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{name}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/rider/select-client")}>
                    <Text style={styles.label}>Client Name</Text>
                    <Text style={styles.value}>{clientName}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/rider/update-account-info/number")}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{phone}</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={() => router.push("/rider/update-account-info/availability")}>
                    <Text style={styles.label}>Availability</Text>
                    <View style={styles.circles}>
                        {dayLabels.map(dayLabel => {
                            const day = dayLabelToDay[dayLabel]
                            const daySelected = availability[day]

                            return daySelected && (
                                <View style={styles.circle} key={day}>
                                    <Text>{dayLabel}</Text>
                                </View>
                            )
                        })}
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
        width: 25,
        height: 25,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
