import {Animated, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'
import Button from "../../../components/Button";
import {MaterialIcons} from "@expo/vector-icons";
import InputField from "../../../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "../../../lib/supabase";

export default function AssignRiders() {
    const [riders, setRiders] = useState([])
    const [locations, setLocations] = useState([])
    const [assignments, setAssignments] = useState([])

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

    async function openModal(ID) {
        await fetchRiders()
        await fetchLocations()
        await fetchAssignments()

        setSelectedID(ID)
        setModalVisible(true)
        darkenBackground()
    }

    async function closeModal() {
        setSelectedID(null)
        setModalVisible(false)
        lightenBackground()

        await fetchRiders()
        await fetchLocations()
        await fetchAssignments()
    }

    function Menu() {
        if (selectedID === null) return

        const location = locations.find(location => location.id === selectedID)
        const assignmentsAtLocation = assignments.filter(assignment => assignment["location_id"] === location.id)
        const assignedRiders = assignmentsAtLocation.map(assignment => riders.find(rider => rider.rider_id === assignment.rider_id))

        const [selectedRiders, setSelectedRiders] = useState(assignedRiders)
        const [searchText, setSearchText] = useState("")

        async function submit() {
            const ridersRemoved = assignedRiders.filter(rider => !selectedRiders.includes(rider))
            const ridersAdded = selectedRiders.filter(rider => !assignedRiders.includes(rider))

            const assignmentIDsToDelete = ridersRemoved.map(rider =>
                assignmentsAtLocation.find(assignment => assignment.rider_id === rider.rider_id).id
            )

            const assignmentsToInsert = ridersAdded.map(rider => (
                {rider_id: rider.rider_id, location_id: location.id}
            ))

            const {error: insertError} = await supabase
                .from('rider_assignments')
                .insert(assignmentsToInsert)

            const {error: deleteError} = await supabase
                .from('rider_assignments')
                .delete()
                .in('id', assignmentIDsToDelete)

            if (insertError) {
                console.log(insertError)
            }

            if (deleteError) {
                console.log(deleteError)
            }

            await closeModal()
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
                    <Text style={styles.searchResultNumber}>{rider.phone}</Text>
                </Pressable>
            )
        }

        return (
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
                <Pressable style={{flex: 1}} onPress={closeModal} transparent={true}/>

                <View style={styles.modal}>
                    <Text style={styles.name}>{location.name}</Text>

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

    function Location({location: {name, id}, ...restProps}) {
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

        const assignmentsAtLocation = assignments.filter(assignment => assignment["location_id"] === id)
        const assignedRiders = assignmentsAtLocation.map(assignment => riders.find(rider => rider.rider_id === assignment.rider_id))

        return (
            <Pressable style={styles.location} {...restProps}>
                <Text style={styles.name}>{name}</Text>

                <View style={styles.riders}>{
                    assignedRiders.length > 0 ? (
                        assignedRiders.map((rider, index) => (
                            <View style={styles.rider} key={index}>
                                <Text>{rider.name}</Text>
                                <Text>{rider.phone}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No Riders Assigned Yet</Text>
                    )
                }</View>
            </Pressable>
        )
    }

    async function fetchRiders() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: riders, error} = await supabase
            .rpc('get_client_riders', {p_client_id: clientID})
            .order('id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            setRiders(riders)
        }
    }

    async function fetchLocations() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: locations, error} = await supabase
            .from('locations')
            .select('id, name, home_delivery, availability')
            .eq('client_id', clientID)
            .order('id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            setLocations(locations)
        }
    }

    async function fetchAssignments() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: assignments, error} = await supabase
            .rpc('get_rider_assignments', {p_client_id: clientID})
            .order('id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            setAssignments(assignments)
        }
    }

    async function fetch() {
        await fetchRiders()
        await fetchLocations()
        await fetchAssignments()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Riders"}/>

            <ScrollView contentContainerStyle={styles.locations}>
                {locations.map((location, index) => (
                    <Location key={index} location={location} onPress={() => openModal(location.id)}/>
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