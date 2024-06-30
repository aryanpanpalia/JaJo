import {Animated, Keyboard, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import React, {useRef, useState} from 'react'
import BottomBar from '../../../components/BottomBar'
import Header from '../../../components/Header'
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";

const data = {
    name: "Aryan Panpalia",
    clientName: "Aryan's Amazing Groceries",
    number: "+1 314 159 2653"
}

export default function Account() {
    const [modalVisible, setModalVisible] = useState(false)

    const backgroundColor = useRef(new Animated.Value(0)).current
    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

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

    function Menu() {
        const [newName, setNewName] = useState(data.name);
        const [nameError, setNameError] = useState();

        const [newClientName, setNewClientName] = useState(data.clientName);
        const [clientNameError, setClientNameError] = useState();

        function submit() {
            setNameError(!newName && "Must enter a name")
            setClientNameError(!newClientName && "Must enter a client name")

            if (!newName || !newClientName) return

            data.name = newName
            data.clientName = newClientName

            closeModal()
        }

        const paddingBottom = useRef(new Animated.Value(100)).current
        const slideUp = () => {
            Animated.timing(paddingBottom, {
                toValue: 340,
                duration: 250,
                useNativeDriver: false
            }).start()
        }
        const slideDown = () => {
            Animated.timing(paddingBottom, {
                toValue: 100,
                duration: 250,
                useNativeDriver: false
            }).start()
        }

        const styles = StyleSheet.create({
            modal: {
                width: "100%",
                gap: 15,
                padding: 40,
                backgroundColor: "white",
                borderRadius: 10,
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
                            label={"Client Name"}
                            placeholder={"Enter Client Name Here"}
                            onPress={slideUp}
                            value={newClientName}
                            onChangeText={setNewClientName}
                            error={clientNameError}
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

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Account"}/>

            <Pressable style={styles.information} onPress={openModal}>
                <View style={styles.item}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{data.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Client Name</Text>
                    <Text style={styles.value}>{data.clientName}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{data.number}</Text>
                </View>
            </Pressable>

            <BottomBar selected={"account"}/>
            <Menu/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 60,
        gap: 20,
        backgroundColor: "white"
    },
    information: {
        width: 335,
    },
    item: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 15
    },
    label: {
        width: 120,
        fontWeight: "600"
    },
    value: {
        flex: 1
    }
})