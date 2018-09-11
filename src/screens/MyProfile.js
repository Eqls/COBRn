import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Actions } from "react-native-router-flux";
import config from "../config/config";
import { connect } from "react-redux";
import Scores from "../components/myprofile/Scores";
import TeamRecordingsRow from "../components/myteam/TeamRecordingsRow";
import HeaderButtons from "../components/myprofile/HeaderButtons";
import { userActions } from "../actions";
import { HomeIcon, DefaultAvatar } from "../assets/images";
// import ImagePicker from "react-native-customized-image-picker";
import { Player, Recorder, MediaStates } from "react-native-audio-toolkit";
import axios from "axios";
import { authHeader } from "./../utils";

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
    marginTop: 10,
    marginBottom: 10
  },
  table_header: {
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
    color: "#137BD1"
  },
  username: {
    margin: 20,
    fontSize: 18,
    color: "#010763",
    fontWeight: "bold"
  },
  homebar: {
    padding: 10,
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
    // ImagePicker.openPicker({
    //   cropping: true
    // }).then(image => {

    //   dispatch(userActions.uploadAvatar(user.current, image));
    // });
  }

  // onPress() {
  //   this.setState({ disabled: true });

  //   // Start recording
  //   let rec = new Recorder("filename.mp4").record();

  //   // Stop recording after approximately 3 seconds
  //   setTimeout(() => {
  //     rec.stop(err => {
  //       // NOTE: In a real situation, handle possible errors here

  //       // Play the file after recording has stopped
  //       new Player("filename.mp4").play().on("ended", () => {
  //         // Enable button again after playback finishes
  //         this.setState({ disabled: false });
  //       });
  //     });
  //   }, 3000);
  // }

  render() {
    const { user } = this.props;
    const { showUploadDialog } = this.state;
    return (
      <View style={styles.container}>
        {user.isFetching || !user.current ? (
          <ActivityIndicator size="small" color="#FECB45" />
        ) : (
            [
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={Actions.pop}
                  style={styles.homebar}>
                  <Image source={HomeIcon} />
                </TouchableOpacity>
                <Image source={DefaultAvatar} />
                <Text style={styles.username}>@{user.current.name}</Text>
                <HeaderButtons />
              </View>,
              <View style={styles.table}>
                <Text style={styles.table_header}>My Scores</Text>
                <Scores score={user.current.team_score[0]} />
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user
});

export default connect(mapStateToProps)(MyProfile);
