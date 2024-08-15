import {Ionicons} from '@expo/vector-icons'
import React, {useEffect, useRef, useState} from 'react'
import {Animated, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import BottomBar from '../../../components/client/BottomBar'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputField from '../../../components/InputField'
import {supabase} from "../../../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductManagement() {
    const [products, setProducts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedID, setSelectedID] = useState(null);

    const backgroundColor = useRef(new Animated.Value(0)).current

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#cccccc'],
    })

    const dayLabels = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
    const dayLabelToDay = {"M": "Monday", "Tu": "Tuesday", "W": "Wednesday", "Th": "Thursday", "F": "Friday", "Sa": "Saturday", "Su": "Sunday"}

    function Menu() {
        const selected = products.find(product => product.id === selectedID)

        const [newName, setNewName] = useState(selected?.name ?? "");
        const [nameError, setNameError] = useState("");

        const [newPrice, setNewPrice] = useState(selected?.price?.toString() ?? "");
        const [priceError, setPriceError] = useState("");

        const [newLimit, setNewLimit] = useState(selected?.daily_limit?.toString() ?? "");
        const [limitError, setLimitError] = useState("");

        const [newAvailability, setNewAvailability] = useState(selected?.availability ?? {
            "Monday": false, "Tuesday": false, "Wednesday": false, "Thursday": false, "Friday": false, "Saturday": false, "Sunday": false
        });

        function toggleDayAvailability(day) {
            setNewAvailability({...newAvailability, [day]: !newAvailability[day]})
        }

        async function submit() {
            setNameError(!newName ? "Must enter a name" : "")
            setPriceError(!newPrice ? "Must enter a price" : "")
            setLimitError(!newLimit ? "Must enter a daily limit" : "")
            if (!newName || !newPrice || !newLimit) return

            const clientID = parseInt(await AsyncStorage.getItem("clientID"))
            const productValues = {
                client_id: clientID,
                name: newName,
                price: parseFloat(newPrice).toFixed(2),
                daily_limit: parseInt(newLimit),
                availability: newAvailability
            }

            if (selectedID === null) {
                const {error} = await supabase
                    .from('products')
                    .insert({...productValues})

                if (error) {
                    console.log(error)
                }
            } else {
                const {error} = await supabase
                    .from('products')
                    .update({id: selectedID, ...productValues})
                    .eq('id', selectedID)

                if (error) {
                    console.log(error)
                }
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
            availability: {
                width: "100%",
                gap: 5
            },
            availabilityText: {
                fontWeight: "600",
                fontSize: 16
            },
            availabilityCircles: {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5
            },
            availabilityCircle: {
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center"
            },
            availabilityCircleText: {
                fontSize: 16
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
                            onChangeText={(text) => setNewName(text)}
                            error={nameError}
                        />
                        <InputField
                            label={"Price"}
                            placeholder={"Enter Price Here"}
                            onPress={slideUp}
                            keyboardType={"numeric"}
                            value={newPrice}
                            onChangeText={(text) => setNewPrice(text)}
                            error={priceError}
                        />
                        <InputField
                            label={"Daily Limit"}
                            placeholder={"Enter Limit Here"}
                            onPress={slideUp}
                            keyboardType={"numeric"}
                            value={newLimit}
                            onChangeText={(text) => setNewLimit(text)}
                            error={limitError}
                        />

                        <View style={styles.availability}>
                            <Text style={styles.availabilityText}>Availability</Text>
                            <View style={styles.availabilityCircles}>
                                {dayLabels.map(dayLabel => {
                                    const day = dayLabelToDay[dayLabel]
                                    const daySelected = newAvailability[day]

                                    const circleStyle = [styles.availabilityCircle, daySelected && {backgroundColor: "black"}]
                                    const textStyle = [styles.availabilityCircleText, daySelected && {color: "white"}]

                                    return (
                                        <Pressable
                                            style={circleStyle}
                                            key={day}
                                            onPress={() => toggleDayAvailability(day)}
                                        >
                                            <Text style={textStyle}>{dayLabel}</Text>
                                        </Pressable>
                                    )
                                })}
                            </View>
                        </View>

                        <Button text={"Submit"} dark={true} width={"100%"} height={50} onPress={submit}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function Product({product: {name, price, daily_limit, availability}, ...restProps}) {
        const styles = StyleSheet.create({
            product: {
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
                alignItems: "center",
            },
            circles: {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5
            },
            circle: {
                width: 25,
                height: 25,
                borderRadius: 20,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center"
            }
        })

        return (
            <Pressable style={styles.product} {...restProps}>
                <Text style={styles.name}>{name}</Text>
                <Text>{price} MYR</Text>
                <View style={styles.bottom}>
                    <View style={styles.circles}>
                        {
                            dayLabels.map(label => {
                                const daySelected = availability[dayLabelToDay[label]]
                                return daySelected && (
                                    <View style={styles.circle} key={label}>
                                        <Text>{label}</Text>
                                    </View>)
                            })
                        }
                    </View>
                    <Text>{daily_limit}</Text>
                </View>
            </Pressable>
        )
    }

    async function openModal(ID) {
        await fetchProducts()
        setSelectedID(ID)
        setModalVisible(true)

        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function closeModal() {
        await fetchProducts()
        setSelectedID(null)
        setModalVisible(false)

        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    async function fetchProducts() {
        const clientID = parseInt(await AsyncStorage.getItem("clientID"))

        const {data: products, error} = await supabase
            .from('products')
            .select('id, name, price, daily_limit, availability')
            .eq("client_id", clientID)
            .order('id', {ascending: true})

        if (error) {
            console.log(error)
        } else {
            setProducts(products)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: interpolatedColor}]}>
            <Header label={"Products"}/>

            <ScrollView contentContainerStyle={styles.products}>
                {products.map((product, index) =>
                    <Product key={index} product={product} onPress={() => openModal(product.id)}/>
                )}
                <Ionicons name="add-circle-outline" size={50} color="black" onPress={() => openModal(null)}/>
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
    products: {
        gap: 10,
        alignItems: "center",
        paddingBottom: 10
    }
})
