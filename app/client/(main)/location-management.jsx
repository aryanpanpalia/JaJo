import {Ionicons} from '@expo/vector-icons'
import React, {useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import BottomBar from '../../../components/client/BottomBar'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'

const data = [
    {name: "Suasana Sentral", deliveryType: "Home Delivery", paymentFrequency: "Daily", availability: ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']},
    {name: "The Sentral Residenses", deliveryType: "Not Home Delivery", paymentFrequency: "Weekly", availability: ['M', 'W', 'F']},
    {name: "The Edge at Polaris", deliveryType: "Home Delivery", paymentFrequency: "Daily", availability: ['M']},
    {name: "Olentangy Falls", deliveryType: "Not Home Delivery", paymentFrequency: "Daily", availability: ['M', 'Tu', 'W', 'Th', 'F']}
]

export default function LocationManagement() {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedID, setSelectedID] = useState();

    const backgroundColor = useRef(new Animated.Value(0)).current

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    function Menu() {
        const [newName, setNewName] = useState(data[selectedID]?.name ?? "");
        const [nameError, setNameError] = useState();

        const [newDeliveryType, setNewDeliveryType] = useState(data[selectedID]?.deliveryType ?? "");
        const [deliveryTypeError, setDeliveryTypeError] = useState();

        const [newPaymentFrequency, setNewPaymentFrequency] = useState(data[selectedID]?.paymentFrequency ?? "");
        const [paymentFrequencyError, setPaymentFrequencyError] = useState();

        const [newAvailability, setNewAvailability] = useState(data[selectedID]?.availability ?? []);

        function toggleDayAvailability(day) {
            if (newAvailability.includes(day)) {
                setNewAvailability(newAvailability.filter((item) => item !== day))
            } else {
                setNewAvailability([...newAvailability, day])
            }
        }

        function submit() {
            setNameError(!newName && "Must enter a name")
            setDeliveryTypeError(!newDeliveryType && "Must enter a delivery type")
            setPaymentFrequencyError(!newPaymentFrequency && "Must enter a payment frequency")
            if (!newName || !newDeliveryType || !newPaymentFrequency) return

            const newValue = {name: newName, deliveryType: newDeliveryType, paymentFrequency: newPaymentFrequency, availability: newAvailability}

            if (selectedID === undefined) {
                data.push(newValue)
            } else {
                data[selectedID] = newValue
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
                        <InputField
                            label={"Delivery Type"}
                            placeholder={"Enter Delivery Type Here"}
                            onPress={slideUp}
                            value={newDeliveryType}
                            onChangeText={(text) => setNewDeliveryType(text)}
                            error={deliveryTypeError}
                        />
                        <InputField
                            label={"Payment Frequency"}
                            placeholder={"Enter Payment Frequency Here"}
                            onPress={slideUp}
                            value={newPaymentFrequency}
                            onChangeText={(text) => setNewPaymentFrequency(text)}
                            error={paymentFrequencyError}
                        />

                        <View style={styles.availability}>
                            <Text style={styles.availabilityText}>Availability</Text>
                            <View style={styles.availabilityCircles}>
                                {['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'].map(day => {
                                    const daySelected = newAvailability.includes(day)
                                    return (
                                        <Pressable style={[styles.availabilityCircle, daySelected && {backgroundColor: "black"}]} key={day}
                                                   onPress={() => toggleDayAvailability(day)}>
                                            <Text style={[styles.availabilityCircleText, daySelected && {color: "white"}]}>{day}</Text>
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

    function Location({location: {name, deliveryType, paymentFrequency, availability}, ...restProps}) {
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
                <Text>{deliveryType}</Text>
                <View style={styles.bottom}>
                    <View style={styles.circles}>
                        {availability.map(day => (
                            <View style={styles.circle} key={day}>
                                <Text>{day}</Text>
                            </View>
                        ))}
                    </View>
                    <Text>{paymentFrequency}</Text>
                </View>
            </Pressable>
        )
    }

    function openModal(ID) {
        setSelectedID(ID)
        setModalVisible(true)

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    function closeModal() {
        setSelectedID(null)
        setModalVisible(false)

        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Locations"} style={styles.header}/>

            <ScrollView contentContainerStyle={styles.locations}>
                {data.map((item, index) =>
                    <Location key={index} location={item} onPress={() => openModal(index)}/>
                )}
                <Ionicons name="add-circle-outline" size={50} color="black" onPress={() => openModal()}/>
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
    header: {
        width: "100%"
    },
    locations: {
        gap: 10,
        alignItems: "center",
        paddingBottom: 10
    }
})
