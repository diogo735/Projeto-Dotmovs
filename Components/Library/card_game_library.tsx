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



export function GameCard1_2({ name, rating, image, platforms }: GameCardProps) {
    return (
        <View style={styles.cardSmall}>
            <ImageBackground
                source={
                    image
                        ? { uri: image }
                        : require("../../assets/images/game_image_null.png")
                }
                style={styles.cardSmallImage}
                imageStyle={{ borderRadius: width * 0.03 }}
            />

            <Text
                style={styles.cardSmallTitle}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                {name}
            </Text>

            <View style={styles.platformIconsRow}>
                {platforms && platforms.length > 0 && platforms.map((p, index) => {
                    const IconComponent = platformIcons[p.platform.name];
                    if (!IconComponent) return null;

                    return <IconComponent key={index} width={18} height={18} fill="#695769ff" style={{ marginLeft: 7 }} />;
                })}
            </View>

            <View style={styles.ratingRow}>
                <Text style={styles.rating}>⭐ {rating}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rating: {
        color: '#858144ff',
        marginTop: height * 0.005,
        fontSize: width * 0.04,
    },
    cardSmall: {
        backgroundColor: '#1A1A2E',
        borderRadius: width * 0.03,
        width: (width - width * 0.03 * 3) / 2,

        padding: width * 0.02,
        alignSelf: 'center',
        marginBottom: 15,
        overflow: 'hidden',
        justifyContent: 'flex-start',
    },

    cardSmallImage: {
        width: width * 0.41,
        height: width * 0.45,
        borderRadius: width * 0.03,
        marginBottom: height * 0.009,
        resizeMode: 'cover',
    },

    cardSmallTitle: {
        color: '#FD44FF',
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginBottom: width * 0.02,
        flexShrink: 1,
    },

    platformIconsRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: 'wrap',
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
    },


});