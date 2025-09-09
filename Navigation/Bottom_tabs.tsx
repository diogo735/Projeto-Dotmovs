import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const iconSize = Math.round(height * 0.035); // 3.5% da altura do ecra
const labelFontSize = Math.round(height * 0.015); // 1.8% da altura da tela

//Paginas da app
import HomeScreen from '../Screens/HomeScreen';
import LibraryScreen from '../Screens/LibraryScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import GameDetailsScreen from '../Screens/GameDetails_screnn';

export type LibraryStackParamList = {
  LibraryMain: undefined;
  GameDetails: { game: any };
};

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();


function LibraryStackNavigator() {
    return (
        <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
            <LibraryStack.Screen name="LibraryMain" component={LibraryScreen} />
            <LibraryStack.Screen name="GameDetails" component={GameDetailsScreen} />
        </LibraryStack.Navigator>
    );
}


function Animacao_Icon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
    const escala = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        //reset
        escala.setValue(focused ? 1 : 1.2);

        Animated.timing(escala, {
            toValue: focused ? 1.2 : 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.exp),
        }).start();
    }, [focused]);

    return (
        <Animated.View style={{ transform: [{ scale: escala }] }}>
            <Ionicons name={name as any} size={iconSize} color={color} />
        </Animated.View>
    );
}



const Tab = createBottomTabNavigator();

export default function Bottom_TAB() {
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Library':
                            iconName = 'book';
                            break;
                        case 'Profile':
                            iconName = 'person';
                            break;
                        default:
                            iconName = 'help-circle';
                            break;
                    }
                    return <Animacao_Icon name={iconName as any} color={color} focused={focused} />;
                },

                tabBarActiveTintColor: "#FD44FF",
                tabBarInactiveTintColor: '#888888',
                tabBarLabelStyle: {
                    fontSize: labelFontSize,
                    fontWeight: 'bold',
                    marginTop: Math.round(height * 0.009),
                },
                tabBarStyle: {
                    backgroundColor: "#050713",
                    height: Math.round(height * 0.11) + (Platform.OS === 'android' ?  Math.round(height * 0.035): 0),
                    paddingTop: 5,
                },
                tabBarLabelPosition: 'below-icon',

            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Library" component={LibraryStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}