import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'

import BottomBar from "../../../components/rider/BottomBar";
import Header from "../../../components/Header";
import {Link} from "expo-router";

const targets = ["Client", "Suasana Sentral", "The Sentral Residenses", "The Edge at Polaris", "Olentangy Falls"]

export default function Messaging() {
    function Item({name, href}) {
        return (
            <Link href={href} asChild>
                <Pressable style={styles.item}>
                    <Text style={styles.text}>{name}</Text>
                </Pressable>
            </Link>
        )
    }

    return (
        <View style={styles.container}>
            <Header label={"Messaging"}/>

            <ScrollView style={styles.items}>
                {targets.map((target, index) => <Item key={index} name={target} href={"/rider/messages/" + index}/>)}
            </ScrollView>

            <BottomBar selected={"messaging"}/>
        </View>
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
    item: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        padding: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
    }
})
