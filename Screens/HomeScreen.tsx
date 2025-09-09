import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    FlatList,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar,
    Platform,
    Dimensions,
} from "react-native";
import { top10games, trending_games, recommended_games, new_releases } from "../API/api_rawg";
import Carousel from "../Components/Home/Carrosel";
import Section_list from "../Components/Home/Section_list";

const { width, height } = Dimensions.get("window");


export default function HomeScreen() {
    const [topGames, set_topGames] = useState<any[]>([]);
    const [trending, set_trending] = useState<any[]>([]);
    const [recommended, set_recommended] = useState<any[]>([]);
    const [news, set_news] = useState<any[]>([]);
    const [loading, set_loading] = useState(true);

    useEffect(() => {
        async function Save_data() {
            set_loading(true);
            const [top, trending, recommended, news] = await Promise.all([
                top10games(),
                trending_games(),
                recommended_games(),
                new_releases(),
            ]);
            set_topGames(top);
            set_trending(trending);
            set_recommended(recommended);
            set_news(news);
            set_loading(false);
        }
        Save_data();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#FD44FF" />
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[
                    { key: "carousel" },
                    { key: "trending" },
                    { key: "popular" },
                    { key: "news" },
                ]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                    switch (item.key) {
                        case "carousel":
                            return (
                                <View>
                                    <Text style={styles.sectionTitle}>🏆 Top 10 Games</Text>
                                    <Carousel data={topGames} />
                                </View>
                            );
                        case "trending":
                            return <Section_list title="Trending Now" icon="🔥" games={trending} />;
                        case "popular":
                            return <Section_list title="Recommended Games" icon="⭐" games={recommended} />;
                        case "news":
                            return <Section_list title="New Releases" icon=" ✨" games={news} />;
                        default:
                            return null;
                    }
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#050713",
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 10 : 0,
        paddingBottom: 15
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        color: "#FD44FF",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 15,
        margin: height * 0.02,

    },
});
