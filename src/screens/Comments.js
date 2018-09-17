import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import config from "../config/config";
import TeammateRow from "../components/myteam/TeammateRow";
import { Actions } from "react-native-router-flux";
import { PlayIcon } from "./../assets/images";
import TeamRecordingsRow from "../components/myteam/TeamRecordingsRow";
import CommentRow from "../components/comments/CommentRow";
import { Player, MediaStates } from "react-native-audio-toolkit";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    height: "100%"
  },
  header_title: {
    fontSize: 18,
    margin: 20
  },
  header: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "gold"
  },
  table: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10
  },
  table_header: {
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
    color: "blue"
  },

  score: {
    fontSize: 30,
    color: "blue",
    fontWeight: "bold"
  },

  play_icon: {
    marginTop: -10,
    marginBottom: -10,
    aspectRatio: 0.5,
    resizeMode: "contain"
  }
});

class Comments extends React.Component {
  render() {
    const { id, name, comments, path_to_recording } = this.props;
    playAudio = () => {
      new Player(config.PHOTO_URL + path_to_recording).play();
    };

    return (
      <View style={styles.container}>
        {comments === undefined ? (
          <ActivityIndicator size="small" color="#FECB45" />
        ) : (
          [
          <View style={styles.header}>
            <Text style={styles.header_title}>{name}</Text>
            <TouchableOpacity
              style={{ paddingRight: 10, paddingLeft: 10 }}
              onPress={playAudio}
            >
              <Image style={styles.play_icon} source={PlayIcon} />
            </TouchableOpacity>
          </View>,
          <View style={styles.table}>
            <Text style={styles.table_header} />
            {comments.length === 0 ? (
              <Text>no comments yet</Text>
            ) : (
              comments.map((item, index) => <CommentRow comment={item} />)
            )}
          </View>,
          <Button
            title="Write comment"
            color="#841584"
              onPress={() => Actions.addcomment({ id })}
            />
          ]
        )}
      </View>
    );
  }
}

export default Comments;
