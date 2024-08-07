import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import BottomBar from '../../../components/rider/BottomBar'
import Header from '../../../components/Header'

export default function ProductPricing() {

    return (
        <View style={styles.container}>
            <Header label={"Product Pricing"} style={styles.header}/>

            <Text>Rider Markup is currently not enabled.</Text>

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
    header: {
        width: "100%"
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
