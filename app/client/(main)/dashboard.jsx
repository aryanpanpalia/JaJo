import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import NavigationButton from '../../../components/NavigationButton'
import BottomBar from '../../../components/client/BottomBar'
import Header from '../../../components/Header'

const data = {
    overall: {name: "Panpalia Products", revenue: 1296.02, IFR: 82.245},
    locations: [
        {name: "Suasana Sentral", revenue: 482.85, IFR: 93.330},
        {name: "The Sentral Residenses", revenue: 219.41, IFR: 62.589},
        {name: "The Edge at Polaris", revenue: 398.57, IFR: 88.476},
        {name: "Olentangy Falls", revenue: 195.19, IFR: 96.882},
    ],
    riders: [
        {name: "Teja Singh", revenue: 589.74, IFR: 95.219},
        {name: "Ramaswamy Pillai", revenue: 706.28, IFR: 86.375},
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

    function StatisticInformation({item}) {
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
                    <Text style={[styles.topText, styles.fill]}>{item.name}</Text>
                    <Text style={styles.topText}>{item.revenue} MYR</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.fill}/>
                    <Text>{item.IFR}% IFR</Text>
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
                style={styles.header}
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
                    text="By Rider"
                    type="center"
                    selected={selectedStatistic === "riders"}
                    onPress={() => setSelectedStatistic("riders")}
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
    header: {
        width: "100%"
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
