import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux'

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
  title: {
    flex: 9,
    color: "#010763",
    fontWeight: "bold"
  },
  team_score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#137BD1"
  }
});

const TeamRow = ({ id, name, team_score, position, empty }) => (
  <TouchableOpacity onPress={() => id && Actions.myteam({ tid: id })} style={styles.container}>
    {empty ? <Text style={styles.title}>Geen data gevonden.</Text> :
      [<Text style={{ flex: 1, color: "#137BD1" }}>{position}</Text>,
      <Text style={styles.title}>{name}</Text>,
      <Text style={styles.team_score}>{team_score}</Text>]}
  </TouchableOpacity>
);

export default TeamRow;
