import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StatusBar,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getGameDetails, getGameScreenshots } from "../API/api_rawg";
import { LayoutAnimation, Platform, UIManager } from "react-native";

import PCIcon from "../assets/Plataforms_icons/windows.svg";
import IOSicon from "../assets/Plataforms_icons/apple.svg";
import XboxIcon from "../assets/Plataforms_icons/xbox.svg";
import PSIcon from "../assets/Plataforms_icons/playstation.svg";
import Androidicon from "../assets/Plataforms_icons/android.svg";
import NitendoIcon from "../assets/Plataforms_icons/nintendo.svg";

const { width, height } = Dimensions.get("window");

const platformIcons: { [key: string]: any } = {
    PC: PCIcon,
    Xbox: XboxIcon,
    PlayStation: PSIcon,
    Nintendo: NitendoIcon,
    iOS: IOSicon,
    Android: Androidicon,
};

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function GameDetailsScreen({ route, navigation }: any) {
    const { game } = route.params;
    const [details, setDetails] = useState<any | null>(null);
    const [screenshots, setScreenshots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        async function fetchDetails() {
            const data = await getGameDetails(game.id);
            setDetails(data);

            const shots = await getGameScreenshots(game.id);
            setScreenshots(shots);

            setLoading(false);
        }
        fetchDetails();
    }, [game.id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FD44FF" />
                <Text style={{ color: "#FD44FF", marginTop: 10 }}>
                    Loading game details...
                </Text>
            </SafeAreaView>
        );
    }
    if (!details) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={{ color: "red" }}>Erro ao carregar os detalhes do jogo.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            {/* Botão de voltar */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <Image
                    source={
                        details.background_image
                            ? { uri: details.background_image }
                            : require("../assets/images/game_image_null.png")
                    }
                    style={styles.image}
                />

                {/* Nome + Rating */}
                <Text style={styles.title}>{details.name}</Text>
                <Text style={styles.rating}>⭐ {details.rating.toFixed(1)}</Text>

                {/* Data de lançamento */}
                <Text style={styles.subTitle}>🚀 Realese Date</Text>
                <Text style={styles.release}>
                    {details.released || "N/A"}
                </Text>

                {/* Plataformas */}
                <Text style={styles.subTitle}>⚙️ Platforms</Text>
                <View style={styles.platformRow}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 15 }}>
                        {details.parent_platforms?.map((p: any, idx: number) => {
                            const IconComp = platformIcons[p.platform.name];
                            if (!IconComp) return null;
                            return (
                                <View
                                    key={idx}
                                    style={styles.platformBadge}
                                >
                                    <IconComp width={18} height={18} fill="#ffffffff" style={{ marginRight: 5 }} />
                                    <Text style={styles.platformText}>{p.platform.name}</Text>
                                </View>
                            );
                        })}
                    </View>

                </View>
                <Text style={styles.subTitle}>ℹ️ Description</Text>
                {/* Descrição */}
                <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <Text
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 10} // limita a 10 linhas
                    >
                        {details.description_raw
                            ? details.description_raw
                            : "No description available for this game."}
                    </Text>

                    {/* Botão Show More */}
                    {details.description_raw && details.description_raw.length > 400 && (
                        <Pressable
                            onPress={() => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                setShowFullDescription(!showFullDescription);
                            }}
                            style={({ pressed }) => [
                                { marginTop: 5 },
                                pressed && { opacity: 0.7 }, // efeito visual ao pressionar
                            ]}
                        >
                            <Text style={styles.showMore}>
                                {showFullDescription ? "Show Less ▲" : "Show More ▼"}
                            </Text>
                        </Pressable>


                    )}
                </View>


                {/* Galeria */}
                <Text style={styles.subTitle}>📸 Screenshots</Text>
                <FlatList
                    data={screenshots}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item.image }}
                            style={styles.screenshot}
                            resizeMode="cover"
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
                />

                {/* Géneros */}
                <Text style={styles.subTitle}>🎮 Genres</Text>
                <Text style={styles.genres}>
                    {details.genres?.map((g: any) => g.name).join(", ")}
                </Text>
    <details.dew></details>CRIAR BASE DE DADOS COM TABELA generos
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#050713",
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + height * 0.01 : height * 0.01,
        paddingBottom: height * 0.02,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#050713",
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: height * 0.05,
        left: width * 0.04,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: width * 0.025,
        borderRadius: width * 0.05,
    },
    image: {
        width: width * 0.95,
        height: height * 0.3,
        borderRadius: width * 0.04,
        marginBottom: height * 0.02,
        alignSelf: "center",
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: "bold",
        color: "#FD44FF",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.005,
    },
    rating: {
        fontSize: width * 0.045,
        color: "#FFD700",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.015,
    },
    release: {
        fontSize: width * 0.04,
        color: "#ffffffff",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.02,
        fontWeight: '500'
    },
    platformRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.02,

    },
    description: {
        fontSize: width * 0.04,
        color: "#ddd",
        lineHeight: width * 0.05,
        marginHorizontal: width * 0.04,
        fontWeight: '500',
    },
    subTitle: {
        fontSize: width * 0.05,
        fontWeight: "bold",
        color: "#FD44FF",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.015,
    },
    screenshot: {
        width: width * 0.7,
        height: height * 0.25,
        borderRadius: width * 0.03,
        marginHorizontal: width * 0.025,
    },
    genres: {
        fontSize: width * 0.04,
        color: "#fff",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.03,
    },
    showMore: {
        color: "#FD44FF",
        marginTop: height * 0.005,
        fontWeight: "500",
        fontSize: width * 0.04,
    },
    platformBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1A1A2E",
        paddingHorizontal: width * 0.025,
        paddingVertical: height * 0.005,
        borderRadius: width * 0.03,
        marginRight: width * 0.02,
        marginBottom: height * 0.01,
    },
    platformText: {
        color: "#fff",
        fontSize: width * 0.035,
        fontWeight: "bold",
    },
});