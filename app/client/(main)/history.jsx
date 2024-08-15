import {ScrollView, StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'
import NavigationButton from '../../../components/NavigationButton'

export default function History() {
    const [selectedStatistic, setSelectedStatistic] = useState("orders");

    return (
        <View style={styles.container}>
            <Header label={"History"}/>

            <View>
                <ScrollView contentContainerStyle={styles.statisticSelector} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <NavigationButton
                        text="Orders"
                        type="left"
                        width={100}
                        height={30}
                        selected={selectedStatistic === "orders"}
                        onPress={() => setSelectedStatistic("orders")}
                    />
                    <NavigationButton
                        text="Products"
                        type="center"
                        width={100}
                        height={30}
                        selected={selectedStatistic === "products"}
                        onPress={() => setSelectedStatistic("products")}
                    />
                    <NavigationButton
                        text="Staff"
                        type="center"
                        width={100}
                        height={30}
                        selected={selectedStatistic === "staff"}
                        onPress={() => setSelectedStatistic("staff")}
                    />
                    <NavigationButton
                        text="Locations"
                        type="center"
                        width={100}
                        height={30}
                        selected={selectedStatistic === "locations"}
                        onPress={() => setSelectedStatistic("locations")}
                    />
                    <NavigationButton
                        text="Customers"
                        type="right"
                        width={100}
                        height={30}
                        selected={selectedStatistic === "customers"}
                        onPress={() => setSelectedStatistic("customers")}
                    />
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.history}>
                {Array.from({length: 10}).map((_, index) => <View key={index} style={styles.dummy}/>)}
            </ScrollView>

            <BottomBar/>
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
    statisticSelector: {
        height: 30,
        flexDirection: "row",
        gap: 5
    },
    history: {
        gap: 10
    },
    dummy: {
        height: 100,
        backgroundColor: "#d9d9d9",
        borderRadius: 5
    }
})
