import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import StarRatingDisplay from "../StarRatingDisplay";
import config from "./../../config/config";
import { DefaultAvatar } from "../../assets/images";
import { Actions } from 'react-native-router-flux'
import Avatar from "../Avatar";

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
    flex: 3,
    flexDirection: "column"
  },
  user_scores: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    color: "darkblue",
    fontSize: 14
  },
  avatar_img: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 3,
    color: "#010763",
    fontWeight: "bold"
  }
});

const TeammateRow = ({ id, tl, name, mod_score, num_of_recordings, avatar, empty }) => (
  <TouchableOpacity onPress={() => id && Actions.myprofile({ uid: id })} style={styles.container}>
    {empty ? <Text style={styles.title}>No results found.</Text> :
      [
        <View style={styles.avatar}>
          <Avatar {...{ avatar, tl }} />
        </View>,
        <View style={styles.user_details}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.user_scores}>
            <StarRatingDisplay starSize={20} rating={mod_score} />
            <Text style={{ marginLeft: 10 }}>{"(" + num_of_recordings + ")"}</Text>
          </View>
        </View>
      ]}
  </TouchableOpacity>
);

export default TeammateRow;
