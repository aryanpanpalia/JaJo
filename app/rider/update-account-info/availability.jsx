import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {router} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../../components/Button";

let availability = ['M', 'W', 'Sa', 'Su']

export default function UpdateAvailability() {
    const [newAvailability, setNewAvailability] = useState(availability);

    function toggleDayAvailability(day) {
        if (newAvailability.includes(day)) {
            setNewAvailability(newAvailability.filter((item) => item !== day))
        } else {
            setNewAvailability([...newAvailability, day])
        }
    }

    function submit() {
        availability = newAvailability

        router.back()
    }

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
                    {['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'].map(day => {
                        const daySelected = newAvailability.includes(day)
                        return (
                            <Pressable
                                style={[styles.availabilityCircle, daySelected && styles.selected]}
                                key={day}
                                onPress={() => toggleDayAvailability(day)}
                            >
                                <Text style={[styles.availabilityCircleText, daySelected && styles.selected]}>{day}</Text>
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
