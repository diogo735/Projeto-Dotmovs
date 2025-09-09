import React from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import GameCard from "./Card_game";
import ArrowRightIcon from "../../assets/images/icons/Home/seta_direita.svg";

const { width, height } = Dimensions.get("window");

interface SectionListGamesProps {
  title: string;
  icon: string;
  games: any[];
}

export default function Section_list({ title, icon, games }: SectionListGamesProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>
          {icon} {title}
        </Text>
        <ArrowRightIcon width={width * 0.04} height={width * 0.04} fill="#FD44FF" style={{ marginRight: 10 }} />
      </View>
      <FlatList
        data={games}
        horizontal
        keyExtractor={(g) => g.id.toString()}
        renderItem={({ item: game }) => (
          <GameCard
            name={game.name}
            image={game.background_image}
            rating={game.rating}
            platforms={game.parent_platforms}
          />
        )}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: width * 0.03 }} />}
        contentContainerStyle={{ paddingHorizontal: width * 0.03 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#FD44FF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,

  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
    marginBottom: height * 0.02,
  },

});
