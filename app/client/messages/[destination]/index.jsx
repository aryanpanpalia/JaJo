import {FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useRef, useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const data = {
    locations: [
        {
            message: "We have a really big sale coming up next Tuesday for our all of our dairy products: 25% off of all dairy products on any order of 40 MYR or more!!!",
            time: new Date('2024-05-29T12:00:00')
        },
        {
            message: "Make sure to take advantage of the sale!",
            time: new Date('2024-05-29T12:01:00')
        },
        {
            message: "Don't forget about the big sale tomorrow!",
            time: new Date('2024-06-03T10:00:00')
        },
        {
            message: "We are unfortunately out of bananas until Wednesday. We apologize for any inconvenience this may cause.",
            time: new Date('2024-06-09T18:00:00')
        }
    ],
    staff: [
        {
            message: "Be ready for the sale today.",
            time: new Date('2024-06-04T10:00:00')
        },
        {
            message: "Come in and be ready by 8am sharp.",
            time: new Date('2024-06-04T10:01:00')
        }
    ]
}

export default function Page() {
    const {destination} = useLocalSearchParams()

    const [messages, setMessages] = useState(data[destination])
    const [message, setMessage] = useState("")

    let messagesRef = useRef()

    const elements = []
    let prevDateString = "Wed Dec 31 1969"
    messages.forEach(({message, time}) => {
        const dateString = time.toDateString()
        if (dateString !== prevDateString) {
            elements.push({type: "timestamp", value: dateString})
            prevDateString = dateString
        }

        elements.push({type: "message", value: message})
    })

    function scrollToEnd() {
        messagesRef.scrollToOffset({offset: 999999999, animated: true})
    }

    function sendMessage() {
        const newMessage = {message: message, time: new Date()}
        setMessages([...messages, newMessage])
        setMessage("")

        data[destination].push(newMessage)
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.header}>
                <MaterialCommunityIcons name="chevron-left" size={30} color="black" style={styles.chevron}/>
                <Text style={styles.headerText}>All {destination === "locations" ? "Locations" : "Staff"}</Text>
            </View>

            <FlatList
                ref={(ref) => messagesRef = ref}
                contentContainerStyle={styles.messages}
                data={elements}
                renderItem={({item}) =>
                    item.type === "timestamp" ? (
                        <View style={styles.timestamp}>
                            <Text style={styles.timestampText}>{item.value}</Text>
                        </View>
                    ) : (
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageBubbleText}>{item.value}</Text>
                        </View>
                    )
                }
                onLayout={scrollToEnd}
                onContentSizeChange={scrollToEnd}
            />

            <View style={styles.messageRegion}>
                <TextInput
                    style={styles.messageField}
                    placeholder="Type your message..."
                    placeholderTextColor={"#898989"}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
                <Pressable style={styles.sendMessageButton} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color="black"/>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 60,
        gap: 20,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 335,
    },
    chevron: {
        position: "absolute",
        left: -10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "600"
    },
    messages: {
        width: 335,
        alignItems: "flex-end",
    },
    timestamp: {
        width: 335,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    timestampText: {
        color: "#666"
    },
    messageBubble: {
        maxWidth: 267,
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 1
    },
    messageBubbleText: {
        color: "white"
    },
    messageRegion: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
        paddingBottom: 40,
        paddingHorizontal: 20
    },
    messageField: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10
    },
    sendMessageButton: {
        marginBottom: 5
    }
})