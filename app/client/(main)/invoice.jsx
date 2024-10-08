import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'

export default function Invoice() {
    return (
        <View style={styles.container}>
            <Header label={"Invoice"}/>

            <Text style={styles.label}>Current Invoice</Text>
            <View style={styles.dummy}/>

            <Text style={styles.label}>Past Invoices</Text>
            <ScrollView contentContainerStyle={styles.invoices}>
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
    label: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "left"
    },
    invoices: {
        gap: 10
    },
    dummy: {
        height: 100,
        backgroundColor: "#d9d9d9",
        borderRadius: 5
    }
})
