import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarRatingDisplay from "../StarRatingDisplay";
import ProgressBar from "./ProgressBar";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24327B'
  },
});

const TeamProgress = ({ progress }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Mijn teamvoortgang</Text>
    <View style={{ flex: 1 }}>
      <ProgressBar percent={progress} />
    </View>
  </View>
)

export default TeamProgress;
