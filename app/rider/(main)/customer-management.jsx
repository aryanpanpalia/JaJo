import {Ionicons} from '@expo/vector-icons'
import React, {useEffect, useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'
import BottomBar from "../../../components/rider/BottomBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../../lib/supabase";

export default function CustomerManagement() {
    const [customers, setCustomers] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    const backgroundColor = useRef(new Animated.Value(0)).current

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    function Menu() {
        const [newPhone, setNewPhone] = useState("");
        const [phoneError, setPhoneError] = useState("");

        async function submit() {
            setPhoneError(!newPhone ? "Must enter a phone number" : "")
            if (!newPhone) return

            const clientID = parseInt(await AsyncStorage.getItem("clientID"))

            const {data: customerID, error: customerIDError} = await supabase
                .rpc('get_customer_id_by_phone', {phone_number: newPhone})

            if (customerIDError) {
                console.log(customerIDError)
                return
            }
            if (customerID === null) {
                setPhoneError("Phone number not associated to any Customer")
                return
            }

            const {error: insertError} = await supabase
                .from('client_customers')
                .insert({client_id: clientID, customer_id: customerID})

            if (insertError) {
                console.log(insertError)
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

    async function openModal() {
        await fetchCustomers()
        setModalVisible(true)

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function closeModal() {
        await fetchCustomers()
        setModalVisible(false)

        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function fetchCustomers() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: customers, error} = await supabase
            .rpc('get_client_customers', {p_client_id: clientID})
            .order('id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            setCustomers(customers)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Customers"}/>

            <ScrollView contentContainerStyle={styles.customers}>
                {customers.map((customer, index) => <Customer key={index} customer={customer}/>)}
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
