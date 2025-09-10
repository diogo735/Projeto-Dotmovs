import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    Dimensions,
    View,
    Text,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Botoon_profile from "../Components/Profile/Boton";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                horizontal={false}
            >
                <View style={styles.header}>
                    <Ionicons
                        name="person-circle-outline"
                        size={width * 0.3}
                        color="#FD44FF"
                    />
                    <Text style={styles.username}>Default User</Text>
                </View>

                <View style={styles.optionsContainer}>
                    <Text style={styles.sectionTitle}>My Account</Text>
                    <Botoon_profile
                        icon="❤️"
                        label="Wishlist"
                        onPress={() => navigation.navigate("Wishlist")}
                    />
                    <Botoon_profile
                        icon="✅"
                        label="Completed Games"
                        onPress={() => navigation.navigate("FinishedGames")}
                    />
                    <Botoon_profile
                        icon="🎮"
                        label="Currently Playing"
                        onPress={() => navigation.navigate("PlayingNow")}
                    />
                </View>

                <View style={styles.optionsContainer}>
                    <Text style={styles.sectionTitle}>App Settings</Text>
                    <Botoon_profile
                        icon="🎨"
                        label="Theme"
                        onPress={() => navigation.navigate("Wishlist")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#050713",
        paddingTop:
            Platform.OS === "android"
                ? (StatusBar.currentHeight ?? 0) + height * 0.01
                : height * 0.01,
        paddingBottom: height * 0.02,
    },
    scrollContent: {
        paddingBottom: height * 0.05,
    },
    header: {
        alignItems: "center",
        marginVertical: height * 0.04,
    },
    username: {
        fontSize: width * 0.06,
        fontWeight: "bold",
        color: "#FD44FF",
    },
    optionsContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: height * 0.02,
    },
    sectionTitle: {
        fontSize: width * 0.04,
        fontWeight: "500",
        color: "#ffffff68",
        marginBottom: height * 0.02,
        textAlign: "left",
    },
});
