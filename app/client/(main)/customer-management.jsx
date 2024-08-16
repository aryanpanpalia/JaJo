import {Ionicons} from '@expo/vector-icons'
import React, {useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import BottomBar from '../../../components/client/BottomBar'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'

const data = [
    {name: "Charan Kumar", number: "+60 11 11381008"},
    {name: "Krishna Kumar", number: "+60 11 11343221"},
    {name: "Rajeev Rai", number: "+1 314 159 2653"},
    {name: "Aryan Panpalia", number: "+1 271 828 1828"},
]

export default function CustomerManagement() {
    const [modalVisible, setModalVisible] = useState(false)

    const backgroundColor = useRef(new Animated.Value(0)).current

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    function Menu() {
        const [newName, setNewName] = useState("");
        const [nameError, setNameError] = useState("");

        const [newNumber, setNewNumber] = useState("");
        const [numberError, setNumberError] = useState("");

        function submit() {
            setNameError(!newName ? "Must enter a name" : "")
            setNumberError(!newNumber ? "Must enter a number" : "")
            if (!newName || !newNumber) return

            const newValue = {name: newName, number: newNumber}
            data.push(newValue)

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
                gap: 15
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
                            label={"Number"}
                            placeholder={"Enter Phone Number Here"}
                            onPress={slideUp}
                            keyboardType={"phone-pad"}
                            value={newNumber}
                            onChangeText={(text) => setNewNumber(text)}
                            error={numberError}
                        />

                        <Button text={"Submit"} dark={true} width={"100%"} height={50} onPress={submit}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function Customer({customer: {name, number}}) {
        const styles = StyleSheet.create({
            customer: {
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
        })

        return (
            <View style={styles.customer}>
                <Text style={styles.name}>{name}</Text>
                <Text>{number}</Text>
            </View>
        )
    }

    function openModal() {
        setModalVisible(true)

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    function closeModal() {
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
                    <Customer key={index} customer={item}/>
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
        paddingTop: 60,
        paddingBottom: 80,
        paddingHorizontal: 25,
        gap: 20,
        backgroundColor: "white"
    },
    customers: {
        gap: 10,
        alignItems: "center",
        paddingBottom: 10
    }
})
