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
  icon: {
    height: 50,
    width: 50
  },
  avatar: {

  }
});

const CommentRow = ({ comment }) => (
  <View style={styles.container}>
    {console.log(config.PHOTO_URL + comment.avatar)}
    <View style={styles.avatar}>
      <Image
        style={styles.icon}
        borderRadius={100}
        source={
          comment.avatar
            ? { uri: config.PHOTO_URL + comment.avatar }
            : DefaultAvatar
        }
      />
    </View>
    <View style={styles.comment}>
      <Text style={styles.name}>{comment.user_name}</Text>
      <Text style={styles.message}>{comment.message}</Text>
    </View>
  </View>
);

export default CommentRow;
