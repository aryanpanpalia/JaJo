import {Ionicons} from '@expo/vector-icons'
import React, {useEffect, useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableWithoutFeedback, View} from 'react-native'
import BottomBar from '../../../components/client/BottomBar'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../../lib/supabase";

export default function LocationManagement() {
    const [locations, setLocations] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedID, setSelectedID] = useState(null);

    const backgroundColor = useRef(new Animated.Value(0)).current

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    const dayLabels = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
    const dayLabelToDay = {"M": "Monday", "Tu": "Tuesday", "W": "Wednesday", "Th": "Thursday", "F": "Friday", "Sa": "Saturday", "Su": "Sunday"}

    function Menu() {
        const selected = locations.find(location => location.id === selectedID)

        const [newName, setNewName] = useState(selected?.name ?? "");
        const [nameError, setNameError] = useState("");

        const [newHomeDelivery, setNewHomeDelivery] = useState(selected?.home_delivery ?? false);

        const [newAvailability, setNewAvailability] = useState(selected?.availability ?? {
            "Monday": false, "Tuesday": false, "Wednesday": false, "Thursday": false, "Friday": false, "Saturday": false, "Sunday": false
        });

        function toggleDayAvailability(day) {
            setNewAvailability({...newAvailability, [day]: !newAvailability[day]})
        }

        async function submit() {
            setNameError(!newName ? "Must enter a name" : "")
            if (!newName) return

            const clientID = parseInt(await AsyncStorage.getItem("clientID"))
            const locationValues = {
                client_id: clientID,
                name: newName,
                home_delivery: newHomeDelivery,
                availability: newAvailability
            }

            if (selectedID === null) {
                const {error} = await supabase
                    .from('locations')
                    .insert(locationValues)

                if (error) {
                    console.log("Client-locationManagement-submit: ", error)
                }
            } else {
                const {error} = await supabase
                    .from('locations')
                    .update(locationValues)
                    .eq('id', selectedID)

                if (error) {
                    console.log("Client-locationManagement-submit: ", error)
                }
            }

            closeModal()
        }

        const paddingBottom = useRef(new Animated.Value(40)).current
        const slideUp = () => {
            Animated.timing(paddingBottom, {
                toValue: 340,
                duration: 250,
                useNativeDriver: false
            }).start()
        }
        const slideDown = () => {
            Animated.timing(paddingBottom, {
                toValue: 40,
                duration: 250,
                useNativeDriver: false
            }).start()
        }

        const styles = StyleSheet.create({
            modal: {
                width: "100%",
                gap: 15,
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 25,
                paddingVertical: 50
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
            homeDelivery: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            homeDeliveryText: {
                fontWeight: "600",
                fontSize: 16
            }
        })

        return (
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
                <Pressable style={{flex: 1}} onPress={closeModal} transparent={true}/>

                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                    slideDown()
                }}>

                    <Animated.View style={[styles.modal, {paddingBottom: paddingBottom}]}>
                        <InputField
                            label={"Name"}
                            placeholder={"Enter Name Here"}
                            onPress={slideUp}
                            value={newName}
                            onChangeText={(text) => setNewName(text)}
                            error={nameError}
                        />

                        <View style={styles.homeDelivery}>
                            <Text style={styles.homeDeliveryText}>Home Delivery</Text>
                            <Switch value={newHomeDelivery} onValueChange={setNewHomeDelivery} trackColor={{true: "#000000"}}/>
                        </View>

                        <View style={styles.availability}>
                            <Text style={styles.availabilityText}>Availability</Text>
                            <View style={styles.availabilityCircles}>
                                {dayLabels.map(dayLabel => {
                                    const day = dayLabelToDay[dayLabel]
                                    const daySelected = newAvailability[day]

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

                        <Button text={"Submit"} dark={true} width={"100%"} height={50} onPress={submit}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function Location({location: {name, home_delivery, availability}, ...restProps}) {
        const styles = StyleSheet.create({
            location: {
                width: "100%",
                padding: 15,
                borderWidth: 1,
                borderRadius: 10,
                gap: 5
            },
            name: {
                fontSize: 18,
                fontWeight: "600"
            },
            bottom: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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

        return (
            <Pressable style={styles.location} {...restProps}>
                <Text style={styles.name}>{name}</Text>
                <Text>{home_delivery ? "Home Delivery" : "Not Home Delivery"}</Text>
                <View style={styles.bottom}>
                    <View style={styles.circles}>
                        {
                            dayLabels.map(label => {
                                const daySelected = availability[dayLabelToDay[label]]
                                return daySelected && (
                                    <View style={styles.circle} key={label}>
                                        <Text>{label}</Text>
                                    </View>)
                            })
                        }
                    </View>
                </View>
            </Pressable>
        )
    }

    async function openModal(ID) {
        await fetchLocations()
        setSelectedID(ID)
        setModalVisible(true)

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function closeModal() {
        await fetchLocations()
        setSelectedID(null)
        setModalVisible(false)

        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function fetchLocations() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: locations, error} = await supabase
            .from('locations')
            .select('id, name, home_delivery, availability')
            .eq('client_id', clientID)
            .order('id', {ascending: true})

        if (error) {
            console.log("Client-locationManagement-fetchLocations: ", error)
        } else {
            setLocations(locations)
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Locations"}/>

            <ScrollView contentContainerStyle={styles.locations}>
                {locations.map((location, index) =>
                    <Location key={index} location={location} onPress={() => openModal(location.id)}/>
                )}
                <Ionicons name="add-circle-outline" size={50} color="black" onPress={() => openModal(null)}/>
            </ScrollView>

            <BottomBar/>
            <Menu/>
        </Animated.View>
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
    locations: {
        gap: 10,
        alignItems: "center",
        paddingBottom: 10
    }
})
