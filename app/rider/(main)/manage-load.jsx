import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native'
import React, {useRef, useState} from 'react'
import Header from '../../../components/Header'
import BottomBar from "../../../components/rider/BottomBar";
import Button from "../../../components/Button";

const data = {
    numTrips: 1,
    products: [
        {
            name: "Milk", startingInventory: 80, currentInventory: 50, loadedQuantity: 80, confirmedQuantities: [
                {name: "Suasana Sentral", confirmedQuantity: 90},
                {name: "Olentangy Falls", confirmedQuantity: 50},
            ]
        },
        {
            name: "Apples", startingInventory: 10, currentInventory: 10, loadedQuantity: 10, confirmedQuantities: [
                {name: "Suasana Sentral", confirmedQuantity: 20},
                {name: "The Sentral Residenses", confirmedQuantity: 60},
                {name: "The Edge at Polaris", confirmedQuantity: 25},
                {name: "Olentangy Falls", confirmedQuantity: 15},
            ]
        },
        {
            name: "Paneer", startingInventory: 0, currentInventory: 0, loadedQuantity: 0, confirmedQuantities: [
                {name: "The Sentral Residenses", confirmedQuantity: 75},
            ]
        },
        {
            name: "Whole Wheat Flour", startingInventory: 40, currentInventory: 0, loadedQuantity: 40, confirmedQuantities: [
                {name: "Suasana Sentral", confirmedQuantity: 20},
                {name: "The Sentral Residenses", confirmedQuantity: 20},
                {name: "The Edge at Polaris", confirmedQuantity: 20},
            ]
        },
    ]
}

export default function ManageLoad() {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedID, setSelectedID] = useState(null);

    const [atStation, setAtStation] = useState(false)

    const backgroundColor = useRef(new Animated.Value(0)).current
    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    function darkenBackground() {
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    function lightenBackground() {
        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    function openModal(ID) {
        setSelectedID(ID)
        setModalVisible(true)
        darkenBackground()
    }

    function closeModal() {
        setSelectedID(null)
        setModalVisible(false)
        lightenBackground()
    }

    function Menu() {
        if (selectedID === null) return

        const product = data.products[selectedID]
        const totalConfirmedQuantity = product.confirmedQuantities.reduce((sum, item) => sum + item.confirmedQuantity, 0)
        const [loadedQuantity, setLoadedQuantity] = useState(product.loadedQuantity.toString())

        function submit() {
            data.products[selectedID].loadedQuantity = parseInt(loadedQuantity)
            data.products[selectedID].startingInventory = data.products[selectedID].currentInventory + data.products[selectedID].loadedQuantity
            closeModal()
        }

        const paddingBottom = useRef(new Animated.Value(50)).current
        const slideUp = () => {
            Animated.timing(paddingBottom, {
                toValue: 340,
                duration: 250,
                useNativeDriver: false
            }).start()
        }
        const slideDown = () => {
            Animated.timing(paddingBottom, {
                toValue: 50,
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
            name: {
                fontSize: 24,
                fontWeight: "600"
            },
            row: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            },
            section: {
                gap: 5
            },
            label: {
                fontWeight: "600",
                fontSize: 16
            },
            text: {
                fontSize: 16
            },
            horizontalLine: {
                height: 1,
                backgroundColor: "black"
            },
            textInput: {
                borderWidth: 1,
                padding: 5,
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
                        <Text style={styles.name}>{product.name}</Text>

                        <View style={styles.section}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Location</Text>
                                <Text style={styles.label}>Pending Confirmed Qty.</Text>
                            </View>

                            {
                                product.confirmedQuantities.map((item, index) =>
                                    <View style={styles.row} key={index}>
                                        <Text style={styles.text}>{item.name}</Text>
                                        <Text style={styles.text}>{item.confirmedQuantity}</Text>
                                    </View>
                                )
                            }

                            <View style={styles.row}>
                                <Text style={styles.text}>Total</Text>
                                <Text style={styles.text}>{totalConfirmedQuantity}</Text>
                            </View>
                        </View>

                        <View style={styles.horizontalLine}/>

                        <View style={styles.section}>
                            <View style={styles.row}>
                                <Text style={styles.text}>Current Inventory</Text>
                                <Text style={styles.text}>{product.currentInventory}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.text}>Loaded Qty.</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={loadedQuantity}
                                    onChangeText={setLoadedQuantity}
                                    keyboardType={"numeric"}
                                    onPress={slideUp}
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.text}>Starting Inventory</Text>
                                <Text style={styles.text}>{product.currentInventory + (parseInt(loadedQuantity) || 0)}</Text>
                            </View>
                        </View>

                        <Button text={"Confirm Load"} dark={true} width={"100%"} height={50} onPress={submit}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function ProductLoad({product: {name, startingInventory, currentInventory, loadedQuantity, confirmedQuantities}, onPress}) {
        const styles = StyleSheet.create({
            productLoad: {
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                gap: 5
            },
            name: {
                fontSize: 18,
                fontWeight: "600"
            },
            row: {
                flexDirection: "row",
                justifyContent: "space-between"
            }
        })

        const totalConfirmedQuantity = confirmedQuantities.reduce((sum, item) => sum + item.confirmedQuantity, 0)

        return (
            <Pressable style={styles.productLoad} onPress={onPress}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.row}>
                    <Text>Starting Inventory</Text>
                    <Text>{startingInventory}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Current Inventory</Text>
                    <Text>{currentInventory}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Loaded Qty.</Text>
                    <Text>{loadedQuantity}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Pending Confirmed Qty.</Text>
                    <Text>{totalConfirmedQuantity}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Manage Load"} style={styles.header}/>

            <View style={styles.row}>
                <Text style={styles.tripCounterLabel}>Trip Counter</Text>
                <Text style={styles.tripCounterValue}>{data.numTrips}</Text>
            </View>

            <View style={styles.row}>
                <Button text={atStation ? "Arrived" : "Arrive"} dark={atStation} style={styles.button} onPress={() => {
                    if (!atStation) {
                        setAtStation(true)
                        data.numTrips += 1

                        data.products.forEach(product => {
                            product.startingInventory = product.currentInventory
                            product.loadedQuantity = 0
                        })
                    }
                }}/>
                <Button text={atStation ? "Depart" : "Departed"} dark={!atStation} style={styles.button} onPress={() => setAtStation(false)}/>
            </View>

            <ScrollView contentContainerStyle={styles.products}>
                {
                    data.products.map((product, index) => <ProductLoad product={product} key={index} onPress={() => {
                        if (atStation) {
                            openModal(index)
                        }
                    }}/>)
                }
            </ScrollView>

            <BottomBar selected={"load"}/>

            <Menu/>
        </Animated.View>
    );
};

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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5
    },
    tripCounterLabel: {
        fontSize: 18,
        fontWeight: "600"
    },
    tripCounterValue: {
        fontSize: 18
    },
    button: {
        flex: 1,
        height: 40
    },
    products: {
        gap: 10,
        paddingBottom: 10
    }
});
