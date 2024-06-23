import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'

export default function InputField({label, error, ...restProps}) {
    return (
        <View style={styles.inputField}>
            <Text style={styles.inputText}>{label}</Text>
            <TextInput style={[styles.input, error && styles.errorInput]} placeholderTextColor="#898989" {...restProps}/>
            {error && <Text style={styles.errorText}>{error}</Text>}
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
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
})
