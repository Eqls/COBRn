import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StarRatingDisplay from "../StarRatingDisplay";
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

const UserRow = ({ id, name, position, mod_score, num_of_recordings, empty }) => (
  <TouchableOpacity onPress={() => id && Actions.myprofile({ uid: id })} style={styles.container}>
    {empty ? <Text style={styles.title}>No results found.</Text> :
      [
        <Text style={{ flex: 1, color: "#137BD1" }}>{position}</Text>,
        <Text style={styles.title}>{name}</Text>,
        <Text style={{ paddingRight: 5 }}>{"(" + num_of_recordings + ")"}</Text>,
        <StarRatingDisplay starSize={20} rating={mod_score} />
      ]
    }
  </TouchableOpacity>
);

export default UserRow;
