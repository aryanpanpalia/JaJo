import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import BottomBar from '../../../components/client/BottomBar'
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
            <Header label={"Messaging"} style={styles.header}/>

            <View style={styles.selector}>
                <NavigationButton
                    text={"To Location"}
                    type={"left"}
                    style={styles.navigationButton}
                    selected={selected === "locations"}
                    onPress={() => setSelected("locations")}
                />
                <NavigationButton
                    text={"To Staff"}
                    type={"right"}
                    style={styles.navigationButton}
                    selected={selected === "staff"}
                    onPress={() => setSelected("staff")}
                />
            </View>

            <ScrollView>
                <Item name={"All"} href={"/client/messages/" + selected}/>
                {
                    selected === "locations" ? (
                        data.locations.map((location, index) => (
                            <Item key={index} name={location} href={"/client/messages/locations/" + index}/>
                        ))
                    ) : (
                        data.staff.map((worker, index) => (
                            <Item key={index} name={worker} href={"/client/messages/staff/" + index}/>
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
        gap: 20,
        paddingTop: 60,
        paddingBottom: 80,
        paddingHorizontal: 25,
        backgroundColor: "white"
    },
    header: {
        width: "100%"
    },
    selector: {
        flexDirection: "row",
        gap: 5
    },
    navigationButton: {
        flex: 1,
        height: 30
    },
    item: {
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