import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";

import PCIcon from "../../assets/Plataforms_icons/windows.svg";
import IOSicon from "../../assets/Plataforms_icons/apple.svg";
import XboxIcon from "../../assets/Plataforms_icons/xbox.svg";
import PSIcon from "../../assets/Plataforms_icons/playstation.svg";
import Androidicon from "../../assets/Plataforms_icons/android.svg";
import NitendoIcon from "../../assets/Plataforms_icons/nintendo.svg";

const { width, height } = Dimensions.get("window");

interface GameCardProps {
    name: string;
    rating: number;
    image: string;
    platforms: { platform: { id: number; name: string; slug: string } }[];
}

const platformIcons: { [key: string]: any } = {
    PC: PCIcon,
    Xbox: XboxIcon,
    PlayStation: PSIcon,
    Nintendo: NitendoIcon,
    iOS: IOSicon,
    Android: Androidicon,
};

export default function GameCard({ name, rating, image, platforms }: GameCardProps) {
    return (
        <View style={styles.card}>
            <ImageBackground
                source={
                    image
                        ? { uri: image }
                        : require("../../assets/images/game_image_null.png") 
                }
                style={styles.image}
                imageStyle={{ borderRadius: width * 0.03 }}
            />

            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {name}
            </Text>

            <View style={styles.ratingRow}>
                <Text style={styles.rating}>⭐ {rating}</Text>

                <View style={styles.platformIconsRow}>
                    {platforms && platforms.length > 0 && platforms.map((p, index) => {
                        const IconComponent = platformIcons[p.platform.name];
                        if (!IconComponent) return null;

                        return <IconComponent key={index} width={18} height={18} fill="#695769ff" style={{ marginLeft: 7 }} />;
                    })}
                </View>
            </View>
        </View>
    );
}

export function GameCardSimple({ name, image }: { name: string; image: string }) {
    return (
        <View style={styles.cardSimple}>
            <ImageBackground
                source={
                    image
                        ? { uri: image }
                        : require("../../assets/images/game_image_null.png") 
                }
                style={styles.imageSimple}
                imageStyle={{ borderRadius: width * 0.03 }}
            >
                <LinearGradient
                    colors={["transparent", "#050713"]}
                    style={styles.gradient}
                >
                    <Text style={styles.titleSimple}>{name}</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1A1A2E',
        borderRadius: width * 0.03,
        padding: width * 0.03,
        width: width * 0.9,
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: height * 0.25,
        borderRadius: width * 0.03,
    },
    title: {
        color: '#FD44FF',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginTop: height * 0.01,
    },
    rating: {
        color: '#858144ff',
        marginTop: height * 0.005,
        fontSize: width * 0.04,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: height * 0.005,
    },

    platformIconsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    ////////////////////////////////
    cardSimple: {
        width: width * 0.7,
        alignItems: "center",
        marginRight: 10,
    },
    imageSimple: {
        width: "100%",
        height: height * 0.23,
        justifyContent: "flex-end",
        borderRadius: width * 0.03,
        overflow: "hidden",
    },
    gradient: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: "flex-end",
    },
    titleSimple: {
        color: "#FD44FF",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
    platformContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    platformText: {
        color: "#fff",
        fontSize: width * 0.035,
        fontWeight: "600",
    },

});