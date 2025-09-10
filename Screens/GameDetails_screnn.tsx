import React, { useEffect, useRef, useState } from "react";
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
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getGameDetails, getGameScreenshots } from "../API/api_rawg";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { Modal, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import PCIcon from "../assets/Plataforms_icons/windows.svg";
import IOSicon from "../assets/Plataforms_icons/apple.svg";
import XboxIcon from "../assets/Plataforms_icons/xbox.svg";
import PSIcon from "../assets/Plataforms_icons/playstation.svg";
import Androidicon from "../assets/Plataforms_icons/android.svg";
import NitendoIcon from "../assets/Plataforms_icons/nintendo.svg";
import { AnimatedActionButton } from "../Components/Game_Page/AnimatedActionButton";
import Toast from "react-native-toast-message";
import { Snackbar } from "react-native-paper";
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
    const [isWishlist, setIsWishlist] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [hoursModalVisible, setHoursModalVisible] = useState(false);
    const [selectedHours, setSelectedHours] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
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
    useEffect(() => {
        if (hoursModalVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [hoursModalVisible]);

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

    const showMessage = (msg: string) => {
        setSnackbarMessage(msg);
        setSnackbarVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={
                        details.background_image
                            ? { uri: details.background_image }
                            : require("../assets/images/game_image_null.png")
                    }
                    style={styles.image}
                />

                <Text style={styles.title}>{details.name}</Text>
                <View style={styles.ratingRow}>
                    <Text style={styles.rating}>⭐ {details.rating.toFixed(1)}</Text>

                    <View style={styles.actionsRow}>
                        <AnimatedActionButton
                            iconName={isWishlist ? "heart" : "heart-outline"}
                            color="#ff0062ff"
                            size={width * 0.075}
                            onPress={() => {
                                const newValue = !isWishlist;
                                setIsWishlist(newValue);
                                if (newValue) showMessage("Added to Wishlist");
                            }}
                        />

                        <AnimatedActionButton
                            iconName={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"}
                            color="#4CAF50"
                            size={width * 0.075}
                            onPress={() => {
                                const newValue = !isCompleted;
                                setIsCompleted(newValue);
                                if (newValue) {
                                    setHoursModalVisible(true);
                                }
                            }}
                        />


                        <AnimatedActionButton
                            iconName={isPlaying ? "game-controller" : "game-controller-outline"}
                            color="#FFD700"
                            size={width * 0.075}
                            onPress={() => {
                                const newValue = !isPlaying;
                                setIsPlaying(newValue);
                                if (newValue) showMessage("Added to Playing");
                            }}
                        />



                    </View>
                </View>



                <Text style={styles.subTitle}>🚀 Realese Date</Text>
                <Text style={styles.release}>
                    {details.released || "N/A"}
                </Text>

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
                <View style={{ marginBottom: 20, alignItems: "center" }}>
                    <Text
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 10}
                    >
                        {details.description_raw
                            ? details.description_raw
                            : "No description available for this game."}
                    </Text>

                    {details.description_raw && details.description_raw.length > 400 && (
                        <Pressable
                            onPress={() => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                setShowFullDescription(!showFullDescription);
                            }}
                            style={({ pressed }) => [
                                { marginTop: 5 },
                                pressed && { opacity: 0.7 },
                            ]}
                        >
                            <Text style={styles.showMore}>
                                {showFullDescription ? "Show Less ▲" : "Show More ▼"}
                            </Text>
                        </Pressable>


                    )}
                </View>


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

                <Text style={styles.subTitle}>🎮 Genres</Text>
                <View style={styles.genreRow}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 15 }}>
                        {details.genres?.map((g: any, idx: number) => {
                            return (
                                <View
                                    key={idx}
                                    style={styles.platformBadge}
                                >
                                    <Text style={styles.platformText}>{g.name}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

            </ScrollView>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
                style={{ backgroundColor: '#240a24ff', borderRadius: 10, margin: 16 }}
                wrapperStyle={{ bottom: 0 }}
                theme={{ colors: { surface: '#3b113cff' } }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name="checkmark-circle"
                        size={23}
                        color="#FD44FF"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: '#FD44FF', fontWeight: 'bold' }}>{snackbarMessage}</Text>
                </View>
            </Snackbar>
            {hoursModalVisible && (
                <Modal transparent visible={hoursModalVisible} onRequestClose={() => setHoursModalVisible(false)}>
                    <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter Hours Played</Text>
                            <Picker
                                selectedValue={selectedHours}
                                onValueChange={(itemValue) => setSelectedHours(itemValue)}
                            >
                                {Array.from({ length: 101 }, (_, i) => i).map((h) => (
                                    <Picker.Item key={h} label={`${h} h`} value={h} />
                                ))}
                            </Picker>

                            <Button
                                title="Confirmar"
                                onPress={() => {
                                    setHoursModalVisible(false);
                                    showMessage(`Added to Completed`);
                                }}
                            />
                        </View>
                    </Animated.View>
                </Modal>
            )}



        </SafeAreaView >
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

    },

    release: {
        fontSize: width * 0.04,
        color: "#ffffffff",
        marginHorizontal: width * 0.08,
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
        marginHorizontal: width * 0.08,
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
        marginHorizontal: width * 0.04,
    },
    genres: {
        fontSize: width * 0.04,
        color: "#fff",
        marginHorizontal: width * 0.08,
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
    genreRow: {
        marginVertical: 10,
        marginHorizontal: width * 0.04,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.015,
    },
    rating: {
        fontSize: width * 0.045,
        color: "#FFD700",
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.0015,
    },
    actionsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,

    },
    actionIcon: {
        marginLeft: width * 0.03,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#050713",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontWeight: "bold",
        color: "#FD44FF",
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 10,
    },

});