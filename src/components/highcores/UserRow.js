import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StarRatingDisplay } from "./../star_ratings/Star_Rating_Display";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  title: {
    flex: 9,
    color: "#010763",
    fontWeight: "bold"
  }
});

const UserRow = ({ name, position, mod_score, num_of_recordings }) => (
  <View style={styles.container}>
    <Text style={{ flex: 1, color: "#137BD1" }}>{position}</Text>
    <Text style={styles.title}>{name}</Text>
    <Text>{"(" + num_of_recordings + ")"}</Text>
    <StarRatingDisplay rating={mod_score} />
  </View>
);

export default UserRow;
