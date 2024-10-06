import {Ionicons} from '@expo/vector-icons'
import React, {useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'
import BottomBar from "../../../components/rider/BottomBar";

const data = [
    {name: "Charan Kumar", phone: "+60 11 11381008"},
    {name: "Krishna Kumar", phone: "+60 11 11343221"},
    {name: "Rajeev Rai", phone: "+1 314 159 2653"},
    {name: "Aryan Panpalia", phone: "+1 271 828 1828"},
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
        const [nameError, setNameError] = useState(null);

        const [newPhone, setNewPhone] = useState("");
        const [phoneError, setPhoneError] = useState(null);

        function submit() {
            setNameError(!newName && "Must enter a name")
            setPhoneError(!newPhone && "Must enter a phone number")
            if (!newName || !newPhone) return

            const newValue = {name: newName, phone: newPhone}

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
                            label={"Phone Number"}
                            placeholder={"Enter Phone Number Here"}
                            onPress={slideUp}
                            keyboardType={"phone-pad"}
                            value={newPhone}
                            onChangeText={setNewPhone}
                            error={phoneError}
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

    function Customer({customer: {name, phone}}) {
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
            <View style={styles.customer}>
                <Text style={styles.name}>{name}</Text>
                <Text>{phone}</Text>
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
    customers: {
        alignItems: "center",
        paddingBottom: 10,
        gap: 10
    }
})
