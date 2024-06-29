import {FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useRef, useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const data = {
    locations: ["Suasana Sentral", "The Sentral Residenses", "The Edge at Polaris", "Olentangy Falls"],
    staff: ["Ramaswamy Pillai", "Teja Singh"],
    messages: {
        "Suasana Sentral": [],
        "The Sentral Residenses": [],
        "The Edge at Polaris": [],
        "Olentangy Falls": [],
        "Ramaswamy Pillai": [],
        "Teja Singh": []
    }
}

export default function Page() {
    const {destination, id} = useLocalSearchParams()

    const [messages, setMessages] = useState(data.messages[data[destination][id]])
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

        data.messages[data[destination][id]].push(newMessage)
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.header}>
                <MaterialCommunityIcons name="chevron-left" size={30} color="black" style={styles.chevron}/>
                <Text style={styles.headerText}>{data[destination][id]}</Text>
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