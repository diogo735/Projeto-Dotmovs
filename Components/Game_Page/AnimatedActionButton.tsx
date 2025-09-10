import React, { ComponentProps, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface Props {
    iconName: IoniconsName;
    color: string;
    size: number;
    onPress: () => void;
}

export function AnimatedActionButton({ iconName, color, size, onPress }: Props) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();

        onPress();
    };

    return (
        <View style={{ alignItems: "center", marginHorizontal: 5 }}>
            <Pressable onPress={handlePress}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Ionicons name={iconName} size={size} color={color} />
                </Animated.View>
            </Pressable>
        </View>
    );
}



