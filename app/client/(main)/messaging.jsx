import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import BottomBar from '../../../components/BottomBar'
import Header from '../../../components/Header'
import NavigationButton from "../../../components/NavigationButton";
import {Link} from "expo-router";

const data = {
    locations: ["Suasana Sentral", "The Sentral Residenses", "The Edge at Polaris", "Olentangy Falls"],
    staff: ["Ramaswamy Pillai", "Teja Singh"]
}

export default function Messaging() {
    const [selected, setSelected] = useState("locations")

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

            <View style={styles.selector}>
                <NavigationButton text={"To Location"} type={"left"} width={"49%"} height={30} selected={selected === "locations"} onPress={() => setSelected("locations")}/>
                <NavigationButton text={"To Staff"} type={"right"} width={"49%"} height={30} selected={selected === "staff"} onPress={() => setSelected("staff")}/>
            </View>

            <ScrollView style={styles.items}>
                <Item name={"All"} href={"/client/messages/" + selected}/>
                {
                    selected === "locations" ? (
                        data.locations.map((location, index) => (
                            <Item key={index} name={location} href={"/client/messages/locations/" + index} />
                        ))
                    ) : (
                        data.staff.map((worker, index) => (
                            <Item key={index} name={worker} href={"/client/messages/staff/" + index} />
                        ))
                    )
                }
            </ScrollView>

            <BottomBar selected={"messaging"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 85,
        gap: 20,
        backgroundColor: "white"
    },
    selector: {
        width: 335,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    items: {
        width: 335
    },
    item: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        padding: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
    }
})