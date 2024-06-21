import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-element-dropdown'
import NavigationButton from '../components/NavigationButton'
import BottomBar from '../components/BottomBar'

const data = {
	overall: [
		{label: "Total Revenue", value: "1296.02 MYR"},
		{label: "Total IFR", value: "82.245%"}
	],
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

export default function Dashboard() {
    const [timespan, setTimespan] = useState("Today");
	const [selectedStatistic, setSelectedStatistic] = useState("locations");

	function Header() {
		
		const styles = StyleSheet.create({
			header: {
				width: 335,
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
			},
			menu: {
				position: "absolute",
				left: 0,
			},
			headerText: {
				fontSize: 24,
				fontWeight: "700",
			},
			dropdown: {
				position: "absolute",
				right: 0,
				width: 85,
				height: 30,
				borderColor: 'gray',
				borderWidth: 0.5,
				borderRadius: 8,
				paddingHorizontal: 8,
			}
		})

		const dropdownData = [
			{label: 'Today', value: 'Today'},
			{label: 'Week', value: 'Week'},
			{label: 'Month', value: 'Month'},
		]

		return (
			<View style={styles.header}>
				<MaterialCommunityIcons name='menu' size={30} color="black" style={styles.menu} />
 				<Text style={styles.headerText}>Dashboard</Text>
				<Dropdown
					style={styles.dropdown}
					data={dropdownData}
					maxHeight={300}
					labelField="label"
					valueField="value"
					value={timespan}
					onChange={item => setTimespan(item.value)}
				/>
			</View>			
		)
	}

	function OverallStatistic(item, index) {

		const styles = StyleSheet.create({
			overallStatistic: {
				width: 150,
				height: 100,
				borderWidth: 1,
				borderRadius: 10,
			},
			overallStatisticLabel: {
				width: "100%",
				textAlign: "center",
				fontWeight: "600",
				position: "absolute",
				top: 15
			}, 
			overallStatisticValue: {
				width: "100%",
				textAlign: "center",
				fontSize: 18,
				fontWeight: "800",
				position: "absolute",
				top: 45
			},
		})

		return (
			<View style={styles.overallStatistic} key={index}>
				<Text style={styles.overallStatisticLabel}>{item.label}</Text>
				<Text style={styles.overallStatisticValue}>{item.value}</Text>
			</View>
		)
	}

	function StatisticInformation({item}) {

		const styles = StyleSheet.create({
			statisticInformation: {
				width: "100%",
				height: 80,
				borderWidth: 1,
				borderRadius: 10,
				marginBottom: 10
			},
			name: {
				position: "absolute",
				left: 25,
				top: 30,
				fontSize: 15
			},
			revenue: {
				position: "absolute",
				right: 25,
				top: 30,
				fontSize: 15,
				fontWeight: "600"
			},
			ifr: {
				position: "absolute",
				right: 25,
				top: 50,
				fontSize: 10,
			}
		})

		return (
			<View style={styles.statisticInformation}> 
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.revenue}>{item.revenue} MYR</Text>
				<Text style={styles.ifr}>{item.IFR}% IFR</Text>
			</View>
		)
	}

    return (
		<View style={styles.container}>
			<Header />

			<View style={styles.overallStatistics}>
				{ data.overall.map(OverallStatistic) }
			</View>

			<View style={styles.statisticSelector}>
				<NavigationButton text="By Location" type="left" width={110} height={30} selected={selectedStatistic === "locations"} onPress={() => setSelectedStatistic("locations")} />
				<NavigationButton text="By Rider" type="center" width={110} height={30} selected={selectedStatistic === "riders"} onPress={() => setSelectedStatistic("riders")} />
				<NavigationButton text="By Product" type="right" width={110} height={30} selected={selectedStatistic === "products"} onPress={() => setSelectedStatistic("products")} />
			</View>

			<FlatList 
				style={styles.statistics}
				data={data[selectedStatistic]}
				renderItem={StatisticInformation}
				keyExtractor={item => item.name}
				snapToAlignment="start"
				snapToInterval={90} 
				maxHeight={450}
			/>

			<BottomBar selected={"dashboard"} />

		</View>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 60,
		gap: 20,
		backgroundColor: "white"
	},
	overallStatistics: {
		width: 335,
		flexDirection: "row",
		gap: 20,
		paddingTop: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	statisticSelector: {
		width: 335,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statistics: {
		width: 335,
		maxHeight: 450
	}
});
