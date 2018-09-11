import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CameraIcon, WriteIcon } from "../../assets/images";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#E6B430",
    padding: 12,
    margin: 3
  },
  button_icon: {
    marginLeft: 5
  }
});

const HeaderButtons = ({ selectPicture }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={selectPicture}>
      <Text style={{ color: "#010763" }}>Upload Photo</Text>
      <Image style={styles.button_icon} source={CameraIcon} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={{ color: "#010763" }}>Edit Profile</Text>
      <Image style={styles.button_icon} source={WriteIcon} />
    </TouchableOpacity>
  </View>
);

export default HeaderButtons;
