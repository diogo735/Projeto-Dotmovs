import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SlideScreen from '../Navigation/Fade_screen';

export default function ProfileScreen() {
    return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Home Scren</Text>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050713',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: "#FD44FF",
        fontWeight: 'bold',
    },
});