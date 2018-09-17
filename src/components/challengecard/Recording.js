import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import { StarRatingDisplay } from "../StarRatingDisplay";
import ProgressBar from "./ProgressBar";
import { MicIcon, CancelIcon } from "../../assets/images";
import styleConsts from "../../constants/styles";
import { Player, Recorder, MediaStates } from "react-native-audio-toolkit";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000065",
    width: "100%",
    zIndex: 2,
    padding: 20
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 16
  },
  start_recording: {
    borderRadius: 100,
    backgroundColor: "#D0021B",
    height: 74,
    width: 74,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  mic_icon: {
    height: 35,
    width: 25
  },
  timer: {
    flex: 2,
    fontSize: 56,
    color: "white"
  },
  stop_recording: {
    borderRadius: 100,
    backgroundColor: "white",
    height: 74,
    width: 74,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rectangle: {
    backgroundColor: "#D0021B",
    height: 22,
    width: 22
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  actions_top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  playback: {
    height: 39,
    width: 39,
    borderRadius: 100,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  triangle: {
    width: 0,
    height: 0,
    marginLeft: -6,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderTopColor: "#FBCB5E",
    transform: [{ rotate: "45deg" }]
  },
  finish_button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: styleConsts.cream_yellow,
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 3
  },
  finish_text: {
    fontWeight: "bold",
    color: styleConsts.cream_blue
  },
  cancel_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10
  }
});

class Recording extends React.Component {
  state = {
    // time: [1, 0],
    finished: false,
    recording: false
  };

  // formatTime = time => {
  //   let temp = [...time];
  //   if (temp[0].toString().length <= 1) {
  //     temp[0] = "0" + temp[0];
  //   }
  //   if (temp[1].toString().length <= 1) {
  //     temp[1] = "0" + temp[1];
  //   }
  //   return temp[0] + ":" + temp[1];
  // };

  startRecording = () => {
    this.props.toggleDimmer();
    let rec = new Recorder("filename.mp4").record();
    this.setState({ ...this.state, recording: true });
    console.log(rec);
    // this.countDown(time);
  };

  stopRecording = () => {
    this.setState({
      ...this.state,
      recording: false,
      finished: true
    });
  };

  getText = (recording, finished) => {
    if (!recording && !finished) return "En………Actie!";
    else if (recording) return "Recording...";
    else if (finished) return "Done!";
  };

  // countDown = time => {
  //   console.log(time);
  //
  //   const { finished } = this.state;
  //   let temp = [...time];
  //   if ((temp[0] === 0 && temp[1] === 0) || finished) return;
  //   setTimeout(() => {
  //     if (temp[0] !== 0) temp = [temp[0] - 1, 59];
  //     else if (temp[0] === 0 && temp[1] !== 0) temp = [temp[0], temp[1] - 1];
  //     this.setState({ ...this.state, time: temp });
  //     return this.countDown(temp);
  //   }, 1000);
  // };

  render() {
    const { time, recording, finished } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.getText(recording, finished)}</Text>
        <Text style={styles.timer}>1</Text>
        {!recording && !finished ? (
          <TouchableOpacity
            onPress={() => this.startRecording()}
            style={styles.start_recording}
          >
            <Image style={styles.mic_icon} source={MicIcon} />
          </TouchableOpacity>
        ) : recording ? (
          <TouchableOpacity
            onPress={this.stopRecording}
            style={styles.stop_recording}
          >
            <View style={styles.rectangle} />
          </TouchableOpacity>
        ) : (
          finished && (
            <View style={styles.actions}>
              <View style={styles.actions_top}>
                <TouchableOpacity
                  onPress={() => console.log("playback")}
                  style={styles.playback}
                >
                  <View style={styles.triangle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.finish_button}
                  onPress={() => console.log("submit")}
                >
                  <Text style={styles.finish_text}>Opslaan</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.cancel_button}>
                <Image
                  style={{ width: 15, height: 15, marginRight: 5 }}
                  source={CancelIcon}
                />
                <Text style={{ color: "red" }}>Verwijder</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    );
  }
}

export default Recording;
