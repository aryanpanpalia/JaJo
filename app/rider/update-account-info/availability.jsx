import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {router} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../../lib/supabase";

export default function UpdateAvailability() {
    const [availability, setAvailability] = useState({
        "Monday": false, "Tuesday": false, "Wednesday": false, "Thursday": false, "Friday": false, "Saturday": false, "Sunday": false
    })

    const dayLabels = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
    const dayLabelToDay = {"M": "Monday", "Tu": "Tuesday", "W": "Wednesday", "Th": "Thursday", "F": "Friday", "Sa": "Saturday", "Su": "Sunday"}

    function toggleDayAvailability(day) {
        setAvailability({...availability, [day]: !availability[day]})
    }

    async function submit() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))
        const riderID = parseInt(await AsyncStorage.getItem("riderID"))

        const {error} = await supabase
            .from("client_riders")
            .update({availability: availability})
            .eq('client_id', clientID)
            .eq('rider_id', riderID)

        if (error) {
            console.log("Rider-availability-submit: ", error)
        }

        router.back()
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
            console.log("Rider-availability-fetchAvailability: ", error)
        } else {
            setAvailability(availability)
        }
    }

    useEffect(() => {
        fetchAvailability()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.chevron} onPress={router.back}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black"/>
                </Pressable>
                <Text style={styles.headerText}>Update Availability</Text>
            </View>

            <View style={styles.availability}>
                <Text style={styles.availabilityText}>Availability</Text>
                <View style={styles.availabilityCircles}>
                    {dayLabels.map(dayLabel => {
                        const day = dayLabelToDay[dayLabel]
                        const daySelected = availability[day]

                        const circleStyle = [styles.availabilityCircle, daySelected && {backgroundColor: "black"}]
                        const textStyle = [styles.availabilityCircleText, daySelected && {color: "white"}]

                        return (
                            <Pressable
                                style={circleStyle}
                                key={day}
                                onPress={() => toggleDayAvailability(day)}
                            >
                                <Text style={textStyle}>{dayLabel}</Text>
                            </Pressable>
                        )
                    })}
                </View>
            </View>

            <Button text={"Update Availability"} dark={true} width={"100%"} height={50} onPress={submit}/>
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
    availability: {
        width: "100%",
        gap: 5
    },
    availabilityText: {
        fontWeight: "600",
        fontSize: 16
    },
    availabilityCircles: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5
    },
    availabilityCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    availabilityCircleText: {
        fontSize: 16
    },
    selected: {
        backgroundColor: "black",
        color: "white"
    }
})
