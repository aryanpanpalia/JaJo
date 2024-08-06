import {useLocalSearchParams} from "expo-router";
import React, {useState} from 'react'
import Chat from "../../../components/client/Chat";

const messageHistory = [
    {name: "Client", messages: []},
    {name: "Suasana Sentral", messages: []},
    {name: "The Sentral Residenses", messages: []},
    {name: "The Edge at Polaris", messages: []},
    {name: "Olentangy Falls", messages: []},
]

export default function Page() {
    const {chatId} = useLocalSearchParams()

    const [name, setName] = useState(messageHistory[chatId].name)
    const [messages, setMessages] = useState(messageHistory[chatId].messages)

    function onMessageSend(newMessage) {
        setMessages([...messages, newMessage])
        messageHistory[chatId].messages.push(newMessage)
    }

    return (
        <Chat
            title={name}
            messageHistory={messages}
            onMessageSend={onMessageSend}
        />
    )
}
