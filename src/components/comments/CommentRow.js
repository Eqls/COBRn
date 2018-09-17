import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import config from "./../../config/config";
import { DefaultAvatar } from "../../assets/images";

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
  name: {
    color: "darkblue"
  },
  icon: {
    height: 50,
    width: 50
  }
});

const CommentRow = ({ comment }) => (
  <View style={styles.container}>
    {console.log(config.PHOTO_URL + comment.avatar)}
    <Image
      style={styles.icon}
      borderRadius={100}
      source={
        comment.avatar
          ? { uri: config.PHOTO_URL + comment.avatar }
          : DefaultAvatar
      }
    />
    <View style={styles.user_details}>
      <Text style={styles.name}>{comment.user_name}</Text>
      <Text>{comment.message}</Text>
    </View>
  </View>
);

export default CommentRow;
