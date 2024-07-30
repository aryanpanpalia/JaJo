import React from 'react'
import {useLocalSearchParams} from "expo-router";
import Chat from "../../../../components/client/Chat";

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

    function onMessageSend(newMessage) {
        data.messages[data[destination][id]].push(newMessage)
    }

    return (
        <Chat
            title={data[destination][id]}
            messageHistory={data.messages[data[destination][id]]}
            onMessageSend={onMessageSend}
        />
    )
}
