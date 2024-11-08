import {Ionicons} from '@expo/vector-icons'
import React, {useEffect, useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import BottomBar from '../../../components/client/BottomBar'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../../lib/supabase";

export default function StaffManagement() {
    const [riders, setRiders] = useState([])
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
        const selected = riders.find(rider => rider.id === selectedID)

        const [newPhone, setNewPhone] = useState(selected?.phone ?? "");
        const [phoneError, setPhoneError] = useState("");

        const [newAvailability, setNewAvailability] = useState(selected?.availability ?? {
            "Monday": false, "Tuesday": false, "Wednesday": false, "Thursday": false, "Friday": false, "Saturday": false, "Sunday": false
        });

        function toggleDayAvailability(day) {
            setNewAvailability({...newAvailability, [day]: !newAvailability[day]})
        }

        async function submit() {
            setPhoneError(!newPhone ? "Must enter a phone number" : "")
            if (!newPhone) return

            const clientID = parseInt(await AsyncStorage.getItem("clientID"))

            if (selectedID === null) {
                const {data: riderID, error: riderIDError} = await supabase
                    .rpc('get_rider_id_by_phone', {phone_number: newPhone})

                if (riderIDError) {
                    console.log("Client-staffManagement-submit: ", riderIDError)
                    return
                }
                if (riderID === null) {
                    setPhoneError("Phone number not associated to any Rider")
                    return
                }

                const {error: insertError} = await supabase
                    .from('client_riders')
                    .insert({client_id: clientID, rider_id: riderID, availability: newAvailability})

                if (insertError) {
                    console.log("Client-staffManagement-submit: ", insertError)
                }
            } else {
                const {error} = await supabase
                    .from('client_riders')
                    .update({availability: newAvailability})
                    .eq('id', selectedID)

                if (error) {
                    console.log("Client-staffManagement-submit: ", error)
                }
            }

            await closeModal()
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
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 25,
                paddingVertical: 50,
                gap: 15,
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
                        {
                            selected ? (
                                <>
                                    <InputField label={"Name"} value={selected.name} editable={false} opacity={0.5}/>
                                    <InputField label={"Phone Number"} value={selected.phone} editable={false} opacity={0.5}/>
                                </>
                            ) : (
                                <InputField
                                    label={"Phone Number"}
                                    placeholder={"Enter Phone Number Here"}
                                    onPress={slideUp}
                                    keyboardType={"phone-pad"}
                                    value={newPhone}
                                    onChangeText={setNewPhone}
                                    error={phoneError}
                                />
                            )
                        }

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

    function Rider({rider: {name, phone, availability}, ...restProps}) {
        const styles = StyleSheet.create({
            rider: {
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
            <Pressable style={styles.rider} {...restProps}>
                <Text style={styles.name}>{name}</Text>
                <Text>{phone}</Text>
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
        await fetchRiders()
        setSelectedID(ID)
        setModalVisible(true)

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function closeModal() {
        await fetchRiders()
        setSelectedID(null)
        setModalVisible(false)

        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function fetchRiders() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: riders, error} = await supabase
            .rpc('get_client_riders', {p_client_id: clientID})
            .order('id', {ascending: true})

        if (error) {
            console.log("Client-staffManagement-fetchRiders: ", error)
        } else {
            setRiders(riders)
        }
    }

    useEffect(() => {
        fetchRiders()
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Riders"}/>

            <ScrollView contentContainerStyle={styles.riders}>
                {riders.map((rider, index) =>
                    <Rider key={index} rider={rider} onPress={() => openModal(rider.id)}/>
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
    riders: {
        gap: 10,
        alignItems: "center",
        paddingBottom: 10
    }
})
