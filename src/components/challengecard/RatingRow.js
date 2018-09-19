import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StarRatingDisplay } from "../StarRatingDisplay";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },
});

const RatingRow = ({ rating }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Uitdaging</Text>
    <StarRatingDisplay starSize={25} chilli {...{ rating }} />
  </View>
)

export default RatingRow;
