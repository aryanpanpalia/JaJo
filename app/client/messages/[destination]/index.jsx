import React from 'react'
import {useLocalSearchParams} from "expo-router";
import Chat from "../../../../components/Chat";

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

    function onMessageSend(newMessage) {
        data[destination].push(newMessage)
    }

    return (
        <Chat
            title={"All " + (destination === "locations" ? "Locations" : "Staff")}
            messageHistory={data[destination]}
            onMessageSend={onMessageSend}
        />
    )
}
