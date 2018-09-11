import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StarRatingDisplay } from "./../star_ratings/Star_Rating_Display";

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
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  title: {
    flex: 1,
    color: "#010763",
    fontWeight: "bold"
  },
  team_score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#137BD1"
  }
});

const Scores = ({ score, rating, numberofratings }) => [
  <View style={styles.container}>
    <Text style={styles.title}>My Feedback</Text>
    <Text>{numberofratings}</Text>
    <StarRatingDisplay rating={rating} />
  </View>,
  <View style={styles.container}>
    <Text style={styles.title}>My Team Score</Text>
    <Text style={styles.team_score}>{score}</Text>
  </View>
];

export default Scores;
