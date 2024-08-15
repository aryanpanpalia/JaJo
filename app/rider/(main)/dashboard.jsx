import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import NavigationButton from '../../../components/NavigationButton'
import Header from '../../../components/Header'
import BottomBar from "../../../components/rider/BottomBar";

const clientName = "Panpalia Products"

const data = {
    overall: {name: clientName, revenue: 1296.02, IFR: 82.245, duration: "7h"},
    locations: [
        {name: "Suasana Sentral", revenue: 482.85, IFR: 93.330, duration: "1h45"},
        {name: "The Sentral Residenses", revenue: 219.41, IFR: 62.589, duration: "1h45"},
        {name: "The Edge at Polaris", revenue: 398.57, IFR: 88.476, duration: "1h45"},
        {name: "Olentangy Falls", revenue: 195.19, IFR: 96.882, duration: "1h45"},
    ],
    products: [
        {name: "Apples", revenue: 482.85, IFR: 93.330},
        {name: "Bananas", revenue: 219.41, IFR: 62.589},
        {name: "Milk", revenue: 316.11, IFR: 88.476},
        {name: "Whole Wheat Flour", revenue: 82.46, IFR: 100},
        {name: "Paneer", revenue: 195.19, IFR: 96.882},
        {name: "Honey", revenue: 0, IFR: 0},
        {name: "Apricots", revenue: 0, IFR: 0},
        {name: "Papaya", revenue: 0, IFR: 0},
    ]
}

const dropdownData = [
    {label: 'Today', value: 'Today'},
    {label: 'Week', value: 'Week'},
    {label: 'Month', value: 'Month'},
]

export default function Dashboard() {
    const [timespan, setTimespan] = useState("Today");
    const [selectedStatistic, setSelectedStatistic] = useState("locations");

    function StatisticInformation({item: {name, revenue, duration, IFR}}) {
        const styles = StyleSheet.create({
            statisticInformation: {
                width: "100%",
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                gap: 5
            },
            row: {
                width: "100%",
                flexDirection: "row",
                gap: 10
            },
            topText: {
                fontSize: 16,
                fontWeight: "600"
            },
            fill: {
                flex: 1
            }
        })

        return (
            <View style={styles.statisticInformation}>
                <View style={styles.row}>
                    <Text style={[styles.topText, styles.fill]}>{name}</Text>
                    <Text style={styles.topText}>{revenue} MYR</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.fill}>{duration}</Text>
                    <Text>{IFR}% IFR</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                label={"Dashboard"}
                dropdownData={dropdownData}
                dropdownValue={timespan}
                onDropdownChange={item => setTimespan(item.value)}
            />

            <View style={styles.statisticSelector}>
                <NavigationButton
                    text="By Location"
                    type="left"
                    selected={selectedStatistic === "locations"}
                    onPress={() => setSelectedStatistic("locations")}
                    style={styles.navigationButton}
                />
                <NavigationButton
                    text="By Product"
                    type="right"
                    selected={selectedStatistic === "products"}
                    onPress={() => setSelectedStatistic("products")}
                    style={styles.navigationButton}
                />
            </View>

            <ScrollView contentContainerStyle={styles.statistics}>
                <StatisticInformation item={data.overall}/>
                <View style={styles.horizontalLine}/>
                {
                    data[selectedStatistic].map((item, index) => <StatisticInformation key={index} item={item}/>)
                }
            </ScrollView>

            <BottomBar selected={"dashboard"}/>
        </View>
    );
};

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
        width: "100%",
        gap: 5
    },
    navigationButton: {
        flex: 1,
        height: 30
    },
    horizontalLine: {
        width: "100%",
        height: 1,
        backgroundColor: "black"
    },
    statistics: {
        width: "100%",
        gap: 10,
        paddingBottom: 10
    }
});
