import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import config from "./../../config/config";
import { DefaultAvatar } from "../../assets/images";
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
    borderBottomColor: 'rgba(151, 151, 151, .2)'
  },
  comment: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 20,
    padding: 3
  },
  name: {
    color: '#000065',
    fontWeight: 'bold'
  },
  message: {
    color: '#000065'
  },
});

const CommentRow = ({ comment }) => (
  <View style={styles.container}>
    <Avatar avatar={comment.avatar} tl={comment.role_id === 2} />
    <View style={styles.comment}>
      <Text style={styles.name}>{comment.user_name}</Text>
      <Text style={styles.message}>{comment.message}</Text>
    </View>
  </View>
);

export default CommentRow;
