import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    flex: 3,
    color: "#010763",
    fontWeight: "bold"
  }
});

const TeamRecordingsRow = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Bla bla bla</Text>
    <Text style={{ flex: 1 }}> 1 c.</Text>
    <Text style={{ flex: 1 }}> Play</Text>
  </View>
);

export default TeamRecordingsRow;
