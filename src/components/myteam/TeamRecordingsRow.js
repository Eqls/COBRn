import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import { CommentIcon, PlayIcon } from "../../assets/images";
import config from "./../../config/config";
import { Actions } from "react-native-router-flux";
import { Player, MediaStates } from "react-native-audio-toolkit";

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
    flex: 3,
    color: "#010763",
    fontWeight: "bold"
  },
  comment_icon: {
    aspectRatio: 1.25,
    paddingBottom: 2,
    resizeMode: "contain",
    alignItems: "center"
  },
  play_icon: {
    marginTop: -10,
    marginBottom: -10,
    aspectRatio: 0.5,
    resizeMode: "contain"
  }
});

const TeamRecordingsRow = ({
  id,
  rec_name,
  num_of_comments,
  path_to_recording,
  comments,
  empty
}) => {
  playAudio = () => {
    new Player(config.PHOTO_URL + path_to_recording).play();
  };

  return (
    <View style={styles.container}>
      {empty ? (
        <Text style={styles.title}>No results found.</Text>
      ) : (
          [
            <Text style={styles.title}>{rec_name}</Text>,
            <TouchableOpacity
              style={{ paddingRight: 10, paddingLeft: 10 }}
              onPress={() =>
                Actions.comments({ id, rec_name, comments, path_to_recording })
              }
            >
              <ImageBackground style={styles.comment_icon} source={CommentIcon}>
                <Text style={{ fontSize: 12 }}>{num_of_comments}</Text>
              </ImageBackground>
            </TouchableOpacity>,
            <TouchableOpacity
              style={{ paddingRight: 10, paddingLeft: 10 }}
              onPress={playAudio}
            >
              <Image style={styles.play_icon} source={PlayIcon} />
            </TouchableOpacity>
          ]
        )}
    </View>
  );
};

export default TeamRecordingsRow;
