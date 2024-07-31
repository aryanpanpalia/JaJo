import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function Button({text, dark, style, ...restProps}) {
    return (
        <Pressable style={[dark ? styles.darkButton : styles.lightButton, style]} {...restProps}>
            <Text style={dark ? styles.darkButtonText : styles.lightButtonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    darkButton: {
        backgroundColor: "black",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
      },
    darkButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600"
    },
    lightButton: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    lightButtonText: {
        fontSize: 16,
        fontWeight: "600"
    }
})
