import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'

export default function InputField({label, placeholder, secure, width, onChangeText}) {
    return (
        <View style={styles.inputField}>
            <Text style={styles.inputText}>{label}</Text>
            <TextInput style={[styles.input, {width: width}]} placeholder={placeholder} placeholderTextColor="#898989" secureTextEntry={secure} onChangeText={onChangeText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        gap: 8,
    },
    inputText: {
        fontWeight: "600",
        fontSize: 16
    },
    input: {
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 15,
        paddingVertical: 5
    }
})
