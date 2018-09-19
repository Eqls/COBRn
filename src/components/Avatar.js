import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import config from "../config/config";
import { DefaultAvatar } from "../assets/images";

const styles = StyleSheet.create({
  avatar_img: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  border: {
    borderWidth: 4,
    borderColor: '#D71A81'
  },
  tl_tag: {
    position: 'absolute',
    bottom: -6,
    left: 10,
    backgroundColor: '#D71A81',
    borderRadius: 50,
    paddingLeft: 6,
    paddingRight: 6,
    color: 'white',
    fontWeight: 'bold'
  }
});

attachBorder = tl => tl && styles.border

const Avatar = ({ avatar, tl }) => (
  <View>
    <Image style={[styles.avatar_img, attachBorder(tl)]} source={avatar ? { uri: config.PHOTO_URL + avatar } : DefaultAvatar} />
    {tl && <Text style={styles.tl_tag}>TL</Text>}
  </View>
);

export default Avatar;