import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StarRatingDisplay } from "./../star_ratings/Star_Rating_Display";
import config from "./../../config/config";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  user_details: {
    flex: 2,
    flexDirection: "column"
  },
  user_scores: {
    flex: 1,
    flexDirection: "row"
  },
  name: {
    color: "darkblue"
  }
});

const TeammateRow = ({ name, mod_score, num_of_recordings, avatar }) => (
  <View style={styles.container}>
    <Image style={{ flex: 1 }} source={{ uri: config.PHOTO_URL + avatar }} />
    <View style={styles.user_details}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.user_scores}>
        <StarRatingDisplay size={30} rating={mod_score} />
        <Text>{"(" + num_of_recordings + ")"}</Text>
      </View>
    </View>
  </View>
);

export default TeammateRow;
