import {Animated, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useRef, useState} from 'react'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'
import Button from "../../../components/Button";
import {MaterialIcons} from "@expo/vector-icons";
import InputField from "../../../components/InputField";

const riders = [
    {name: "Teja Singh", number: "+60 11 11343221"},
    {name: "Ramaswamy Pillai", number: "+60 11 11381008"},
    {name: "Aryan Panpalia", number: "+1 314 159 2653"},
    {name: "Rajeev Rai", number: "+59 979 323 8462"},
    {name: "Sneh Rai", number: "+59 979 323 8462"},
    {name: "Rajnish Rai", number: "+59 979 323 8462"},
    {name: "Seema Rai", number: "+59 979 323 8462"},
]

const data = [
    {name: "Suasana Sentral", riderIDs: [0, 1]},
    {name: "The Sentral Residenses", riderIDs: [1]},
    {name: "The Edge at Polaris", riderIDs: [1]},
    {name: "Olentangy Falls", riderIDs: []},
]

export default function AssignRiders() {
    const [modalVisible, setModalVisible] = useState(false)
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

        const [selectedRiders, setSelectedRiders] = useState(data[selectedID].riderIDs.map(riderID => riders[riderID]))
        const [searchText, setSearchText] = useState("")

        function submit() {
            data[selectedID].riderIDs = selectedRiders.map(rider => riders.indexOf(rider))
            closeModal()
        }

        const styles = StyleSheet.create({
            modal: {
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 25,
                paddingVertical: 50,
                gap: 15,
                height: 750
            },
            name: {
                fontSize: 24,
                fontWeight: "600"
            },
            selectedRiders: {
                gap: 5
            },
            selectedRider: {
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
            },
            selectedRiderName: {
                fontSize: 18
            },
            searchResult: {
                marginBottom: 5
            },
            searchResultName: {
                fontWeight: "600",
                fontSize: 16
            },
            searchResultNumber: {
                color: "#666",
                fontSize: 16
            }
        })

        function SelectedRider({rider}) {
            return (
                <View style={styles.selectedRider}>
                    <Pressable onPress={() => setSelectedRiders(selectedRiders.filter(item => item !== rider))}>
                        <MaterialIcons name="remove-circle-outline" size={24} color="black"/>
                    </Pressable>
                    <Text style={styles.selectedRiderName}>{rider.name}</Text>
                </View>
            )
        }

        function SearchResult({rider}) {
            return (
                <Pressable style={styles.searchResult} onPress={() => {
                    setSelectedRiders([...selectedRiders, rider])
                    setSearchText("")
                }}>
                    <Text style={styles.searchResultName}>{rider.name}</Text>
                    <Text style={styles.searchResultNumber}>{rider.number}</Text>
                </Pressable>
            )
        }

        return (
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
                <Pressable style={{flex: 1}} onPress={closeModal} transparent={true}/>

                <View style={styles.modal}>
                    <Text style={styles.name}>{data[selectedID].name}</Text>

                    <View style={styles.selectedRiders}>
                        {selectedRiders.map((rider, index) => <SelectedRider rider={rider} key={index}/>)}
                    </View>

                    <InputField label={"Add Rider"} placeholder={"Enter Rider Name"} value={searchText} onChangeText={text => setSearchText(text)}/>

                    {
                        searchText && <View style={{flexShrink: 999}}>
                            <FlatList
                                data={
                                    riders.filter(rider =>
                                        rider.name.toLowerCase().includes(searchText.toLowerCase()) &&
                                        !selectedRiders.includes(rider)
                                    )
                                }
                                renderItem={({item: rider}) => <SearchResult rider={rider}/>}
                                maxHeight={500}
                                keyboardShouldPersistTaps={'always'}
                            />
                        </View>
                    }

                    <Button text={"Submit"} dark={true} width={"100%"} height={50} onPress={submit}/>
                </View>
            </Modal>
        )
    }

    function Location({location: {name, riderIDs}, ...restProps}) {
        const styles = StyleSheet.create({
            location: {
                width: "100%",
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                gap: 5,
                marginBottom: 10,
            },
            name: {
                fontSize: 18,
                fontWeight: "600"
            },
            rider: {
                flexDirection: "row",
                justifyContent: "space-between",
            },
        })

        return (
            <Pressable style={styles.location} {...restProps}>
                <Text style={styles.name}>{name}</Text>

                <View style={styles.riders}>{
                    riderIDs.length > 0 ? (
                        riderIDs.map((riderID, index) => (
                            <View style={styles.rider} key={index}>
                                <Text>{riders[riderID].name}</Text>
                                <Text>{riders[riderID].number}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No Riders Assigned Yet</Text>
                    )
                }</View>
            </Pressable>
        )
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Riders"}/>

            <ScrollView contentContainerStyle={styles.locations}>
                {data.map((item, index) => (
                    <Location key={index} location={item} onPress={() => openModal(index)}/>
                ))}
            </ScrollView>

            <BottomBar selected={"rider"}/>

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
    locations: {
        alignItems: "center",
        paddingBottom: 10
    }
})