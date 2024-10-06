import {Ionicons} from '@expo/vector-icons'
import React, {useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'
import BottomBar from "../../../components/rider/BottomBar";

const data = [
    {name: "Charan Kumar", number: "+60 11 11381008"},
    {name: "Krishna Kumar", number: "+60 11 11343221"},
    {name: "Rajeev Rai", number: "+1 314 159 2653"},
    {name: "Aryan Panpalia", number: "+1 271 828 1828"},
]

export default function CustomerManagement() {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedID, setSelectedID] = useState();

    const backgroundColor = useRef(new Animated.Value(0)).current

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    function Menu() {
        const [newName, setNewName] = useState(data[selectedID]?.name ?? "");
        const [nameError, setNameError] = useState(null);

        const [newNumber, setNewNumber] = useState(data[selectedID]?.number ?? "");
        const [numberError, setNumberError] = useState(null);

        function submit() {
            setNameError(!newName && "Must enter a name")
            setNumberError(!newNumber && "Must enter a number")
            if (!newName || !newNumber) return

            const newValue = {name: newName, number: newNumber}

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
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 25,
                paddingVertical: 50,
                gap: 15,
            },
            buttons: {
                flexDirection: "row",
                gap: 10
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
                            onChangeText={setNewName}
                            error={nameError}
                        />
                        <InputField
                            label={"Number"}
                            placeholder={"Enter Phone Number Here"}
                            onPress={slideUp}
                            keyboardType={"phone-pad"}
                            value={newNumber}
                            onChangeText={setNewNumber}
                            error={numberError}
                        />

                        <View style={styles.buttons}>
                            <Button text={"Submit"} dark={true} width={100} height={50} onPress={submit}/>
                            <Button text={"Cancel"} dark={false} width={100} height={50} onPress={closeModal}/>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function Customer({customer: {name, number}, ...restProps}) {
        const styles = StyleSheet.create({
            customer: {
                width: "100%",
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                gap: 5
            },
            name: {
                fontSize: 18,
                fontWeight: "600"
            }
        })

        return (
            <Pressable style={styles.customer} {...restProps}>
                <Text style={styles.name}>{name}</Text>
                <Text>{number}</Text>
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
            <Header label={"Customers"}/>

            <ScrollView contentContainerStyle={styles.customers}>
                {data.map((item, index) =>
                    <Customer key={index} customer={item} onPress={() => openModal(index)}/>
                )}
                <Ionicons name="add-circle-outline" size={50} color="black" onPress={openModal}/>
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
    customers: {
        alignItems: "center",
        paddingBottom: 10,
        gap: 10
    }
})
