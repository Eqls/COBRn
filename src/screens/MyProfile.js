import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Platform,
  PermissionsAndroid
} from "react-native";
import { Actions } from "react-native-router-flux";
import config from "../config/config";
import { connect } from "react-redux";
import Scores from "../components/myprofile/Scores";
import TeamRecordingsRow from "../components/myteam/TeamRecordingsRow";
import HeaderButtons from "../components/myprofile/HeaderButtons";
import { userActions } from "../actions";
import { HomeIcon, DefaultAvatar } from "../assets/images";
import axios from "axios";
import { authHeader } from "../utils";
import styleConsts from "../constants/styles";
import { Player, Recorder, MediaStates } from "react-native-audio-toolkit";
import ImagePicker from "react-native-image-crop-picker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    height: "100%"
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
    flex: 1,
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
  }
});

class MyProfile extends React.Component {
  state = {
    disabled: false
  };

  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(userActions.read(auth.id, auth.token));
  }

  selectPicture = () => {
    const { dispatch, user } = this.props;
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      dispatch(
        userActions.uploadAvatar(user.current, image, this.props.auth.token)
      );
    });
  };

  async checkPermission() {
    if (Platform.OS !== "android") {
      return Promise.resolve(true);
    }

    let result;
    try {
      result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "To record audio please allow access to your microphone!"
        }
      );
    } catch (error) {
      console.error("failed getting permission, result:", result);
    }
    console.log("permission result:", result);
    return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
  }

  onPress() {
    this.checkPermission();

    this.setState({ disabled: true });

    // Start recording
    let rec = new Recorder("filename.mp4").record();

    // Stop recording after approximately 3 seconds
    setTimeout(() => {
      rec.stop(err => {
        // NOTE: In a real situation, handle possible errors here
        let data = new FormData();
        console.log(rec._fsPath);
        data.append("recording[path_to_recording]", {
          uri: "file://" + rec._fsPath,
          name: "filename.mp4",
          type: "audio/mp4"
        });
        data.append("recording[challenge_id]", 1);
        data.append("recording[user_id]", 2);
        console.log(data);
        axios
          .post(config.API_URL + "recordings", data, {
            headers: {
              Authorization: "Bearer " + this.props.auth.token
            }
          })
          .then(res => res.data);
        // Play the file after recording has stopped
        new Player("filename.mp4").play().on("ended", () => {
          // Enable button again after playback finishes
          this.setState({ disabled: false });
        });
      });
    }, 3000);
  }

  render() {
    const { user } = this.props;
    const { showUploadDialog } = this.state;
    return (
      <ScrollView>
        {user.isFetching || !user.current ? (
          <ActivityIndicator size="small" color="#FECB45" />
        ) : (
          [
            <View style={styles.header}>
              <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                <Image source={HomeIcon} />
              </TouchableOpacity>
              <TouchableHighlight
                disabled={this.state.disabled}
                onPress={() => this.onPress()}
              >
                <Text>Press me!</Text>
              </TouchableHighlight>
              <Image source={DefaultAvatar} />
              <Text style={styles.username}>@{user.current.name}</Text>
              <HeaderButtons selectPicture={this.selectPicture} />
            </View>,
            <View style={styles.table}>
              <Text style={styles.table_header}>My Scores</Text>
              <Scores
                score={user.current.team_score}
                rating={user.current.mod_score_sum}
                numberofratings={user.current.num_of_recordings}
              />
            </View>,
            <View style={styles.table}>
              <Text style={styles.table_header}>Team opnames</Text>
              <TeamRecordingsRow />
              <TeamRecordingsRow />
              <TeamRecordingsRow />
              <TeamRecordingsRow />
            </View>
          ]
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user
});

export default connect(mapStateToProps)(MyProfile);
