import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from 'react'
import BottomBar from "../../../../../components/rider/BottomBar";
import {useNavigation} from "@react-navigation/native";
import Button from "../../../../../components/Button";

const invoiceData = {
    invoiceNumber: "3489",
    orderNumber: 1112,
    customerName: "Aryan Panpalia",
    location: "Olentangy Falls",
    date: "7/26/2024",
    order: {
        name: "Aryan Panpalia", items: [
            {name: "Banana", quantity: 2, price: 3, status: "Completed"},
            {name: "Apple", quantity: 7, price: 2, status: "Completed"},
            {name: "Milk", quantity: 1, price: 5, status: "Completed"},
        ]
    }
}

export default function Location() {
    const {invoiceId} = useLocalSearchParams()
    const navigation = useNavigation()

    function goBack() {
        const routes = navigation.getState().routes
        const lastRoute = routes[routes.length - 1]
        const backRoute = lastRoute.name.replace('[locationId]', lastRoute.params["locationId"])
        router.navigate("/rider/" + backRoute)
    }

    function InvoiceDetail({label, value}) {
        const styles = StyleSheet.create({
            invoiceDetail: {
                flexDirection: "row",
                gap: 5,
            },
            label: {
                fontSize: 16,
                fontWeight: "600"
            },
            value: {
                fontSize: 16,
                textAlign: "right",
                flex: 1
            }
        })

        return (
            <View style={styles.invoiceDetail}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        )
    }

    function OrderItem({item}) {
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
        })

        return (
            <View style={styles.row}>
                <View style={[styles.row, styles.fillWidth]}>
                    <Text style={styles.text}>{item.quantity}</Text>
                    <Text style={[styles.text, styles.fillWidth]}>{item.name}</Text>
                </View>
                <Text style={styles.text}>{cost} MYR</Text>
            </View>
        )
    }

    function Order({order}) {
        const {items} = order

        const totalCost = items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)

        const styles = StyleSheet.create({
            currentOrder: {
                gap: 20,
                padding: 15,
                borderRadius: 10,
                borderWidth: 1
            },
            orderItems: {
                gap: 5
            },
            horizontalLine: {
                height: 1,
                backgroundColor: "black"
            },
            row: {
                flexDirection: "row",
                gap: 5
            },
            totalLabel: {
                fontSize: 16,
                fontWeight: "600"
            },
            totalCost: {
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
                textAlign: "right"
            }
        })

        return (
            <View style={styles.currentOrder}>
                <View style={styles.orderItems}>
                    {items.map((item, index) => <OrderItem item={item} key={index}/>)}
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.row}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalCost}>{totalCost} MYR</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.header}>
                <Pressable style={styles.chevron} onPress={goBack}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="black"/>
                </Pressable>
                <Text style={styles.headerText}>Invoice Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.section}>
                    <InvoiceDetail label={"Invoice Number"} value={invoiceData.invoiceNumber}/>
                    <InvoiceDetail label={"Order Number"} value={invoiceData.orderNumber}/>
                    <InvoiceDetail label={"Customer Name"} value={invoiceData.customerName}/>
                    <InvoiceDetail label={"Location"} value={invoiceData.location}/>
                    <InvoiceDetail label={"Date"} value={invoiceData.date}/>
                </View>

                <Order order={invoiceData.order}/>

                <View style={styles.section}>
                    <Button text={"Pay with Credit/Debit Card"} dark={true} width={"100%"} height={50} onPress={() => console.log("Payment not implemented")}/>
                    <Button text={"Pay with FPX"} dark={true} width={"100%"} height={50} onPress={() => console.log("Payment not implemented")}/>
                    <Button text={"Pay with Cash"} dark={true} width={"100%"} height={50} onPress={() => console.log("Payment not implemented")}/>
                </View>
            </ScrollView>

            <BottomBar selected={"fulfillment"}/>
        </View>
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
    main: {
        gap: 20
    },
    section: {
        gap: 10
    }

})