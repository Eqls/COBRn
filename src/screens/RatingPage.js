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
import { recordingActions, ratingActions } from "../actions";
import { StarRatingRow } from "./../components/StarRating";
import { Player, MediaStates } from "react-native-audio-toolkit";
import { PlayIcon } from "./../assets/images";
import styleConsts from "../constants/styles";
import { Actions } from "react-native-router-flux";
import { HomeIcon } from "../assets/images";
import RateRecordingsRow from "../components/ratings/RateRecordingsRow";

class RatingPage extends React.Component {
  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(recordingActions.readAll(auth.token));
  }

  updateRecording = (val, id) => {
    const { dispatch, auth } = this.props;
    dispatch(ratingActions.create(auth.token, auth.id, id, val));
  };

  render() {
    const { recording } = this.props;
    // onPress = {() => playAudio(item.path_to_recording)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {recording.isFetching || !recording.all ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
          [
            <View style={styles.header}>
              <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                <Image source={HomeIcon} />
              </TouchableOpacity>
              <Text style={styles.header_title}>Beoordeel Je Teamgenoten</Text>
            </View>,
            <View style={styles.table}>
              {recording.all.data.length > 0 ? (
                recording.all.data.map(item => (
                  <RateRecordingsRow
                    updateRecording={this.updateRecording}
                    {...{ item }}
                  />
                ))
              ) : (
                <RateRecordingsRow empty />
              )}
            </View>
          ]
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2"
  },
  header_title: {
    fontSize: 24,
    margin: 20
  },
  header: {
    display: "flex",
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FECB45"
  },
  table: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 10
  },
  table_header: {
    fontSize: 14,
    padding: 10,
    paddingLeft: 30,
    fontWeight: "bold",
    color: styleConsts.light_blue
  },
  username: {
    margin: 20,
    fontSize: 18,
    color: "#010763",
    fontWeight: "bold"
  },
  homebar: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    width: "100%"
  },
  avatar_img: {
    height: 112,
    width: 112,
    borderRadius: 100
  },
  header_title: {
    fontSize: 24,
    margin: 15,
    color: "#010763"
  }
});

const mapStateToProps = state => ({
  auth: state.auth.user,
  recording: state.recording,
  rating: state.recording
});

export default connect(mapStateToProps)(RatingPage);
