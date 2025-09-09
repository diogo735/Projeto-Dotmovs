import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { fetchNextGames, resetSeenGames } from '../API/api_rawg';
import { GameCard1_2 } from '../Components/Library/card_game_library';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryStackParamList } from '../Navigation/Bottom_tabs';

const { width, height } = Dimensions.get("window");

const SearchIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 21L16.65 16.65" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
type LibraryScreenNavigationProp = NativeStackNavigationProp<LibraryStackParamList, 'LibraryMain'>;

export default function LibraryScreen() {
    const [searchText, setSearchText] = useState('');
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageEnd, setPageEnd] = useState(false);

    const navigation = useNavigation<LibraryScreenNavigationProp>();
    
    useEffect(() => {
        loadMoreGames();
        return () => resetSeenGames();
    }, []);

    const loadMoreGames = async () => {
        if (loading || pageEnd) return;
        setLoading(true);

        const newGames = await fetchNextGames(20);
        if (newGames.length === 0) {
            setPageEnd(true);
        } else {
            setGames(prev => [...prev, ...newGames]);
        }

        setLoading(false);
    };
    return (

        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.searchContainer}>
                    <SvgXml xml={SearchIcon} width={20} height={20} style={styles.icon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="What games are you looking for?"
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={20} color="#888" />
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableWithoutFeedback>

            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("GameDetails", { game: item })}
                    >
                        <GameCard1_2
                            name={item.name}
                            rating={item.rating}
                            image={item.background_image}
                            platforms={item.parent_platforms}
                        />
                    </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: width * 0.03 }}
                onEndReached={loadMoreGames}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    loading ? (
                        <View style={{ alignItems: "center", marginVertical: 20 }}>
                            <ActivityIndicator size="large" color="#FD44FF" />
                            <Text style={{ color: "#FD44FF", marginTop: 10, fontSize: 16 }}>
                                Searching games...
                            </Text>
                        </View>
                    ) : null
                }

                keyboardShouldPersistTaps="handled"

            />
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A2E',
        borderRadius: width * 0.025,
        height: height * 0.06,
        paddingHorizontal: width * 0.03,
        marginBottom: 10,
        width: width * 0.9,
        alignSelf: 'center',
    },
    icon: {
        marginRight: width * 0.02,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: width * 0.04,
    },
    clearButton: {
        marginLeft: 5,
    },

});
