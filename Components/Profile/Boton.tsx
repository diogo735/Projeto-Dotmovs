import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

type Props = {
  icon: string;
  label: string;
  onPress: () => void;
};

export default function Botton_profile({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <Text style={styles.optionIcon}>{icon}</Text>

      <Text style={styles.optionText}>{label}</Text>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Ionicons name="chevron-forward-outline" size={24} color="#FD44FF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  optionIcon: {
    fontSize: width * 0.06,
    marginRight: 15,
  },
  optionText: {
    fontSize: width * 0.04,
    color: "#FD44FF",
    fontWeight: "600",
  },
});
    