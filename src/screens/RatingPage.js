import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import config from "../config/config";
import { connect } from "react-redux";
import { recordingActions } from "../actions";
import { StarRatingRow } from "./../components/StarRating";
import { Player, MediaStates } from "react-native-audio-toolkit";
import { PlayIcon } from "./../assets/images";

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

class RatingPage extends React.Component {
  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(recordingActions.readAll(auth.token));
  }

  render() {
    const { recording } = this.props;
    playAudio = path_to_recording => {
      new Player(config.PHOTO_URL + path_to_recording).play();
    };
    return (
      <ScrollView>
        {recording.isFetching || !recording.all ? (
          <ActivityIndicator size="small" color="#FECB45" />
        ) : (
          [
          <View>
            <Text>Scoring page</Text>
            {recording.all &&
              recording.all.data.map((item, index) => (
                <TouchableOpacity
                  style={{ paddingRight: 10, paddingLeft: 10 }}
                  onPress={() => playAudio(item.path_to_recording)}
                >
                  <Image style={styles.play_icon} source={PlayIcon} />
                </TouchableOpacity>
              ))}
          </View>
          ]
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  recording: state.recording
});

export default connect(mapStateToProps)(RatingPage);
