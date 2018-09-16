import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { StarRatingDisplay } from "../StarRatingDisplay"
import config from "./../../config/config"
import { DefaultAvatar } from '../../assets/images'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center'
  },
  name: {
    color: "darkblue"
  },
  avatar_img: {
    height: 50,
    width: 50
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const TeammateRow = ({ name, mod_score, num_of_recordings, avatar }) => (
  <View style={styles.container}>
    <View style={styles.avatar}>
      <Image style={styles.avatar_img} source={avatar ? { uri: config.PHOTO_URL + avatar } : DefaultAvatar} />
    </View>
    <View style={styles.user_details}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.user_scores}>
        <StarRatingDisplay starSize={30} rating={mod_score} />
        <Text style={{ marginLeft: 10 }}>{"(" + num_of_recordings + ")"}</Text>
      </View>
    </View>
  </View>
);

export default TeammateRow;
