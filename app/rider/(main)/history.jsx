import {ScrollView, StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import BottomBar from '../../../components/rider/BottomBar'
import Header from '../../../components/Header'
import NavigationButton from '../../../components/NavigationButton'

export default function History() {
    const [selectedStatistic, setSelectedStatistic] = useState("product");

    return (
        <View style={styles.container}>
            <Header label={"History"}/>

            <View style={styles.statisticSelector}>
                <NavigationButton
                    text="Product"
                    type="left"
                    style={styles.navigationButton}
                    selected={selectedStatistic === "product"}
                    onPress={() => setSelectedStatistic("product")}
                />
                <NavigationButton
                    text="Fulfillment"
                    type="center"
                    style={styles.navigationButton}
                    selected={selectedStatistic === "fulfillment"}
                    onPress={() => setSelectedStatistic("fulfillment")}
                />
                <NavigationButton
                    text="Customer"
                    type="right"
                    style={styles.navigationButton}
                    selected={selectedStatistic === "customer"}
                    onPress={() => setSelectedStatistic("customer")}
                />
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
        flexDirection: "row",
        gap: 5
    },
    navigationButton: {
        flex: 1,
        height: 30
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
