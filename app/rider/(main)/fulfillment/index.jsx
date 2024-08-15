import {Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useRef, useState} from 'react'
import Header from '../../../../components/Header'
import BottomBar from "../../../../components/rider/BottomBar";
import Button from "../../../../components/Button";
import {Dropdown} from "react-native-element-dropdown";
import {router} from "expo-router";

const locations = ["Suasana Sentral", "The Sentral Residenses", "The Edge at Polaris", "Olentangy Falls"]
const data = [
    {
        name: "Suasana Sentral",
        startTime: new Date(new Date().setHours(8, 0)),
        endTime: new Date(new Date().setHours(8, 54))
    },
    {
        name: "The Sentral Residenses",
        startTime: new Date(new Date().setHours(9, 6)),
        endTime: new Date(new Date().setHours(9, 36))
    },
    {
        name: "Olentangy Falls",
        startTime: new Date(new Date().setHours(10, 5)),
        endTime: null
    },
]

export default function Fulfillment() {
    const [modalVisible, setModalVisible] = useState(false)

    const [riderHistory, setRiderHistory] = useState(data)
    const [workingLocation, setWorkingLocation] = useState(riderHistory.some(location => location.endTime === null))

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

    function openModal() {
        setModalVisible(true)
        darkenBackground()
    }

    function closeModal() {
        setModalVisible(false)
        lightenBackground()
    }

    function Menu() {
        const [location, setLocation] = useState("")

        const dropdownData = locations.map(location => ({value: location}))

        function submit() {
            if (location) {
                const now = new Date()
                const newElement = {name: location, startTime: now, endTime: null}

                setRiderHistory([...riderHistory, newElement])
                data.push(newElement)

                setWorkingLocation(true)
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
                height: 500
            },
            main: {
                fontSize: 18,
                fontWeight: "600"
            },
            dropdown: {
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                padding: 10
            }
        })

        return (
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
                <Pressable style={{flex: 1}} onPress={closeModal} transparent={true}/>

                <View style={styles.modal}>
                    <Text style={styles.main}>Select Location</Text>

                    <Dropdown
                        style={styles.dropdown}
                        data={dropdownData}
                        labelField={'value'}
                        valueField={'value'}
                        value={location}
                        onChange={({value}) => setLocation(value)}
                        maxHeight={300}
                    />

                    <Button text={"Start Working"} dark={true} width={"100%"} height={50} onPress={submit}/>
                </View>
            </Modal>
        )
    }

    function LocationInformation({location: {name, startTime, endTime}, onPress}) {
        const startTimeString = startTime.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
        const endTimeString = endTime ? endTime.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'}) : "----------"

        const durationMS = (endTime ?? new Date()) - startTime
        const durationMinutesTotal = durationMS / 1000 / 60
        const durationHours = Math.floor(durationMinutesTotal / 60)
        const durationMinutes = Math.floor(durationMinutesTotal % 60)
        const durationString = `${String(durationHours).padStart(2, '0')}:${String(durationMinutes).padStart(2, '0')}`;

        const styles = StyleSheet.create({
            locationInformation: {
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                gap: 5
            },
            row: {
                flexDirection: "row",
                justifyContent: "space-between"
            },
            main: {
                fontSize: 18,
                fontWeight: "600"
            }
        })

        return (
            <Pressable style={styles.locationInformation} onPress={onPress}>
                <View style={styles.row}>
                    <Text style={styles.main}>{name}</Text>
                    <Text style={styles.main}>{durationString}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Start</Text>
                    <Text>{startTimeString}</Text>
                </View>
                <View style={styles.row}>
                    <Text>End</Text>
                    <Text>{endTimeString}</Text>
                </View>
            </Pressable>
        )
    }

    function startNew() {
        if (!workingLocation) {
            openModal()
        }
    }

    function endCurrent() {
        if (workingLocation) {
            const now = new Date()

            const updatedRiderHistory = [...riderHistory]
            updatedRiderHistory[updatedRiderHistory.length - 1] = {
                ...updatedRiderHistory[updatedRiderHistory.length - 1],
                endTime: now
            }

            setRiderHistory(updatedRiderHistory)
            data[data.length - 1].endTime = now

            setWorkingLocation(false)
        }
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Fulfillment"}/>

            <View style={styles.row}>
                <Button text={workingLocation ? "Started" : "Start New"} dark={!workingLocation} style={styles.button} onPress={startNew}/>
                <Button text={workingLocation ? "End Current" : "Ended"} dark={workingLocation} style={styles.button} onPress={endCurrent}/>
            </View>

            <ScrollView contentContainerStyle={styles.locations}>
                {
                    data.map((location, index) => <LocationInformation location={location} key={index} onPress={() => {
                        if (location.endTime === null) {
                            router.push("/rider/fulfillment/location/" + locations.indexOf(location.name))
                        }
                    }}/>)
                }
            </ScrollView>

            <BottomBar selected={"fulfillment"}/>

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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5
    },
    button: {
        flex: 1,
        height: 40
    },
    locations: {
        gap: 10
    }
});
