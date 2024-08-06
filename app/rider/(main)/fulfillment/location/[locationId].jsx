import {Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useRef, useState} from 'react'
import Button from "../../../../../components/Button";
import BottomBar from "../../../../../components/rider/BottomBar";

const locations = ["Suasana Sentral", "The Sentral Residenses", "The Edge at Polaris", "Olentangy Falls"]
const locationOrders = {
    "Olentangy Falls": [
        {
            name: "Aryan Panpalia", items: [
                {name: "Banana", quantity: 2, price: 3, status: "Confirmed"},
                {name: "Apple", quantity: 7, price: 2, status: "Placed"},
                {name: "Milk", quantity: 1, price: 5, status: "Confirmed"},
            ]
        },
        {
            name: "Rajeev Rai", items: [
                {name: "Banana", quantity: 2, price: 3, status: "Confirmed"},
                {name: "Apple", quantity: 4, price: 2, status: "Placed"},
                {name: "Milk", quantity: 1, price: 5, status: "Confirmed"},
                {name: "Whole Wheat Flour", quantity: 1, price: 10, status: "Placed"},
            ]
        },
        {
            name: "George Washington", items: [
                {name: "Apple", quantity: 1000, price: 2, status: "Placed"},
            ]
        }
    ],
    "The Edge at Polaris": [
        {
            name: "Charan Kumar", items: [
                {name: "Banana", quantity: 2, price: 3, status: "Confirmed"},
                {name: "Apple", quantity: 4, price: 2, status: "Placed"},
                {name: "Milk", quantity: 1, price: 5, status: "Confirmed"},
            ]
        }
    ],
}
const riderStock = {
    "Banana": 50,
    "Apple": 6,
    "Milk": 5,
    "Whole Wheat Flour": 3
}

export default function Location() {
    const {locationId} = useLocalSearchParams()
    const locationName = locations[locationId]

    const [orderQueue, setOrderQueue] = useState(locationOrders[locationName])
    const [stock, setStock] = useState(riderStock)

    const [selectedID, setSelectedID] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

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

    function cancelOrder() {
        setOrderQueue(orderQueue.slice(1))
    }

    function completeOrder() {
        const order = orderQueue[0]

        const newStock = {...stock}
        order.items.forEach(item => newStock[item.name] -= item.quantity)
        setStock(newStock)

        setOrderQueue(orderQueue.slice(1))

        router.push("/rider/fulfillment/invoice/0")
    }

    function Menu() {
        if (selectedID === null) return

        const order = orderQueue[0]
        const item = order.items[selectedID]

        const [quantity, setQuantity] = useState(item.quantity)

        const insufficientStock = stock[item.name] < quantity

        function increaseQuantity() {
            if (stock[item.name] > quantity) {
                setQuantity(quantity + 1)
            }
        }

        function decreaseQuantity() {
            if (quantity > 0) {
                setQuantity(quantity - 1)
            }
        }

        function submit() {
            if (!insufficientStock) {
                const updatedOrderItems = order.items.map((item, index) =>
                    index === selectedID ? {...item, quantity: quantity} : item
                )
                const newOrder = {name: order.name, items: updatedOrderItems}
                const [_, ...rest] = orderQueue

                setOrderQueue([newOrder, ...rest])

                closeModal()
            }
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
                gap: 5,
                justifyContent: "space-between",
                alignItems: "center",
            },
            labelText: {
                fontSize: 16,
                fontWeight: "600"
            },
            text: {
                fontSize: 16
            },
            modifier: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: 100,
                height: 40,
                borderRadius: 25,
                borderWidth: 1
            },
            insufficientStock: {
                opacity: 0.25
            }
        })

        return (
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
                <Pressable style={{flex: 1}} onPress={closeModal} transparent={true}/>

                <View style={styles.modal}>
                    <Text style={styles.name}>{item.name}</Text>

                    <View style={styles.row}>
                        <Text style={styles.labelText}>Status</Text>
                        <Text style={styles.text}>{item.status}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.labelText}>Quantity</Text>

                        <View style={styles.modifier}>
                            <Pressable onPress={decreaseQuantity}>
                                <MaterialCommunityIcons name="minus" size={30} color="black"/>
                            </Pressable>

                            <Text style={insufficientStock && styles.insufficientStock}>{quantity}</Text>

                            <Pressable onPress={increaseQuantity} style={insufficientStock && styles.insufficientStock}>
                                <MaterialCommunityIcons name="plus" size={30} color="black"/>
                            </Pressable>
                        </View>

                    </View>

                    <View style={styles.row}>
                        <Text style={styles.labelText}>Cost</Text>
                        <Text style={styles.text}>{(item.price * quantity).toFixed(2)} MYR</Text>
                    </View>

                    <Button text={"Confirm Quantity Change"} dark={true} width={"100%"} height={50} onPress={submit}/>
                </View>
            </Modal>
        )
    }

    function OrderItem({itemID}) {
        const order = orderQueue[0]
        const item = order.items[itemID]
        const insufficientStock = stock[item.name] < item.quantity
        const cost = (item.price * item.quantity).toFixed(2)

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                gap: 5
            },
            fillWidth: {
                flex: 1
            },
            text: {
                fontSize: 16
            },
            insufficientStock: {
                opacity: 0.25
            }
        })

        return (
            <Pressable style={[styles.row, insufficientStock && styles.insufficientStock]} onPress={() => openModal(itemID)}>
                <View style={[styles.row, styles.fillWidth]}>
                    <Text style={styles.text}>{item.quantity}</Text>
                    <Text style={[styles.text, styles.fillWidth]}>{item.name}</Text>
                </View>
                <Text style={styles.text}>{cost} MYR</Text>
            </Pressable>
        )
    }

    function CurrentOrder() {
        const {name, items} = orderQueue[0]

        const styles = StyleSheet.create({
            currentOrder: {
                gap: 20,
                padding: 15,
                borderRadius: 10,
                borderWidth: 1
            },
            name: {
                fontSize: 18,
                fontWeight: "600"
            },
            orderItems: {
                gap: 5
            },
            row: {
                flexDirection: "row",
                gap: 5
            },
            button: {
                flex: 1,
                height: 40
            }
        })

        return (
            <View style={styles.currentOrder}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.orderItems}>
                    {items.map((item, index) => <OrderItem itemID={index} key={index}/>)}
                </View>
                <View style={styles.row}>
                    <Button text={"Complete"} dark={true} style={styles.button} onPress={completeOrder}/>
                    <Button text={"Cancel"} dark={false} style={styles.button} onPress={cancelOrder}/>
                </View>
            </View>
        )
    }

    function FutureOrder({order: {name, items}}) {
        const styles = StyleSheet.create({
            futureOrder: {
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                borderRadius: 10,
                borderWidth: 1
            },
            text: {
                fontSize: 16
            }
        })

        return (
            <View style={styles.futureOrder}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>{items.length}</Text>
            </View>
        )
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <View style={styles.header}>
                <Pressable style={styles.chevron} onPress={() => router.navigate("/rider/fulfillment")}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black"/>
                </Pressable>
                <Text style={styles.headerText}>{locationName}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.orders}>
                {orderQueue.length > 0 && <CurrentOrder/>}
                {orderQueue.slice(1).map((order, index) => <FutureOrder order={order} key={index}/>)}
            </ScrollView>

            <BottomBar selected={"fulfillment"}/>

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
    orders: {
        gap: 10
    }
})