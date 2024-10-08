import {Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useRef, useState} from 'react'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Button from '../../../components/Button'
import {Dropdown} from "react-native-element-dropdown";

const data = {
    cutoff: {time: "8:00", day: "Same Day"},
    orders: [
        {name: "Apples", price: 3.99, placed: 100, limit: 200, state: "Confirm?"},
        {name: "Milk", price: 9.99, placed: 150, limit: 100, state: "Confirm?"},
        {name: "Bananas", price: 2.99, placed: 150, limit: 200, state: "Canceled"},
        {name: "Whole Wheat Flour", price: 19.99, placed: 8, limit: 10, state: "Confirmed Placed"},
    ]
}

export default function OrderAdministration() {
    const [cutOffVisible, setCutOffVisible] = useState(false)
    const [confirmSelectionVisible, setConfirmSelectionVisible] = useState(false)
    const [selectedID, setSelectedID] = useState(null);

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

    function openCutOffModal() {
        setCutOffVisible(true)
        darkenBackground()
    }

    function closeCutOffModal() {
        setCutOffVisible(false)
        lightenBackground()
    }

    function CutOffMenu() {
        const [datePickerVisible, setDatePickerVisible] = useState(false)
        const [time, setTime] = useState(data.cutoff.time)
        const [day, setDay] = useState(data.cutoff.day)

        function submit() {
            data.cutoff = {time: time, day: day}
            closeCutOffModal()
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
            cutoffInput: {
                gap: 5
            },
            label: {
                fontWeight: "600",
                fontSize: 16
            },
            cutoffPrompt: {
                width: "100%",
                height: 50,
                borderWidth: 1,
                borderRadius: 8,
                paddingLeft: 15,
                justifyContent: "center",
            },
            value: {
                fontSize: 16
            },
            buttons: {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5
            },
            button: {
                flex: 1,
                height: 50
            },
        })

        return (
            <Modal animationType='slide' transparent={true} visible={cutOffVisible} onRequestClose={closeCutOffModal}>
                <Pressable style={{flex: 1}} onPress={closeCutOffModal} transparent={true}/>

                <View style={styles.modal}>
                    <View style={styles.cutoffInput}>
                        <Text style={styles.label}>Cut-Off Time</Text>
                        <Pressable style={styles.cutoffPrompt} onPress={() => setDatePickerVisible(true)}>
                            <Text style={styles.value}>{time}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.buttons}>
                        <Button text={"Same Day"} style={styles.button} dark={day === "Same Day"} onPress={() => setDay("Same Day")}/>
                        <Button text={"Next Day"} style={styles.button} dark={day === "Next Day"} onPress={() => setDay("Next Day")}/>
                    </View>

                    <Button text={"Submit"} dark={true} width={"100%"} height={50} onPress={submit}/>
                </View>

                <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode='time'
                    onConfirm={(time) => {
                        setTime(time.getHours() + ":" + time.getMinutes())
                        setDatePickerVisible(false)
                    }}
                    onCancel={() => setDatePickerVisible(false)}
                />
            </Modal>
        )
    }

    function openConfirmModal(ID) {
        setSelectedID(ID)
        setConfirmSelectionVisible(true)
        darkenBackground()
    }

    function closeConfirmModal() {
        setSelectedID(null)
        setConfirmSelectionVisible(false)
        lightenBackground()
    }

    function ConfirmSelectionModal() {
        if (selectedID === null) return

        const [action, setAction] = useState("")

        const {name, price, placed, limit} = data.orders[selectedID]
        const expectedRevenue = (price * placed).toFixed(2)
        const actions = placed <= limit ? [
            {value: "Confirm Placed"},
            {value: "Cancel Orders"}
        ] : [
            {value: "Confirm Placed"},
            {value: "Confirm Limit"},
            {value: "Cancel Orders"}
        ]

        function submit() {
            if (action === "Confirm Placed") {
                data.orders[selectedID].state = "Confirmed Placed"
            } else if (action === "Confirm Limit") {
                data.orders[selectedID].state = "Confirmed Limit"
            } else {
                data.orders[selectedID].state = "Canceled"
            }

            closeConfirmModal()
        }

        const styles = StyleSheet.create({
            modal: {
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 25,
                paddingVertical: 50,
                gap: 15,
                height: 500
            },
            name: {
                fontSize: 24,
                fontWeight: "600"
            },
            row: {
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                gap: 5
            },
            label: {
                fontWeight: "600",
                fontSize: 16
            },
            value: {
                fontSize: 16,
                color: "#666"
            },
            dropdown: {
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                padding: 10
            }
        })

        return (
            <Modal animationType='slide' transparent={true} visible={confirmSelectionVisible} onRequestClose={closeConfirmModal}>
                <Pressable style={{flex: 1}} onPress={closeConfirmModal} transparent={true}/>

                <View style={styles.modal}>
                    <Text style={styles.name}>{name}</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Expected Revenue:</Text>
                        <Text style={styles.value}>{expectedRevenue} MYR</Text>
                    </View>

                    <Dropdown
                        style={styles.dropdown}
                        data={actions}
                        labelField={'value'}
                        valueField={'value'}
                        value={action}
                        onChange={({value}) => setAction(value)}
                    />

                    <Button text={"Submit"} dark={true} width={"100%"} height={50} onPress={submit}/>
                </View>
            </Modal>
        )
    }

    function Order({order: {name, price, placed, limit, state}, ...restProps}) {
        const styles = StyleSheet.create({
            order: {
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
                alignItems: "center"
            },
        })

        return (
            <Pressable style={styles.order} {...restProps}>
                <Text style={styles.name}>{name}</Text>
                <Text>{price} MYR</Text>
                <View style={styles.bottom}>
                    <Text>Placed: {placed} / {limit}</Text>
                    <Text>{state}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Orders"}/>

            <View style={styles.cutoff}>
                <Text style={styles.cutoffLabel}>Cut-Off Time:</Text>
                <Pressable onPress={openCutOffModal}>
                    <Text style={styles.cutoffValue}>{data.cutoff.time} {data.cutoff.day}</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.orders}>
                {data.orders.map((item, index) => (
                    <Order key={index} order={item} onPress={() => {
                        if (item.state === "Confirm?") openConfirmModal(index)
                    }}/>
                ))}
            </ScrollView>

            <BottomBar selected={"order"}/>

            <CutOffMenu/>
            <ConfirmSelectionModal/>
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
    cutoff: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cutoffLabel: {
        fontSize: 18,
        fontWeight: "600"
    },
    cutoffValue: {
        fontSize: 18,
        color: "#666"
    },
    orders: {
        paddingBottom: 10,
        gap: 10
    }
})