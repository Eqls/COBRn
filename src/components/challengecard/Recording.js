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
import { MicIcon, CancelIcon } from '../../assets/images'
import styleConsts from '../../constants/styles'
import { Player, Recorder, MediaStates } from "react-native-audio-toolkit";
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { recordingActions } from '../../actions'

class Recording extends React.Component {

  state = {
    finished: false,
    recording: false,
    elapsed: 0,
    start: 0
  }

  constructor(props) {
    super(props)

    this.player = null;
    this.recorder = null;

    this._reloadPlayer();
    this._reloadRecorder();
  }

  submit = () => {
    const { dispatch, auth, challenge } = this.props
    dispatch(recordingActions.create(auth.id, challenge, this.recorder._fsPath, auth.token))
    this._reloadPlayer()
    this._reloadRecorder()
    Actions.home()
  }

  _reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player('myrec.mp4', {
      autoDestroy: false
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      } else {
        // this.player.looping = this.state.loopButtonStatus;
      }

      this._updateState();
    });

    this._updateState();

    this.player.on('ended', () => {
      this._updateState();
    });
    this.player.on('pause', () => {
      this._updateState();
    });
  }

  _reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder('myrec.mp4', {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max'
      //format: 'ac3', // autodetected
      //encoder: 'aac', // autodetected
    });

    this._updateState();
  }

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

  _updateState(err, finished) {
    this.setState({
      ...this.state,
      recording: this.recorder && this.recorder.isRecording ? true : false,
      finished: finished ? finished : this.state.finished
    });
  }

  formatTime = (time) => {
    let mins = Math.round(time / 60)
      , secs = Math.round(time - (mins * 60))
      , format = [2]
    secs = secs < 0 ? 0 : secs
    format[0] = mins <= 9 ? '0' + mins : mins
    format[1] = secs <= 9 ? '0' + secs : secs
    return format[0] + ':' + format[1]
  }

  tick = () => {
    if (this.player.isStopped && this.state.finished) return clearInterval(this.timer)
    return this.setState({ ...this.state, elapsed: new Date() - this.state.start })
  }

  startRecording = async () => {
    await this.checkPermission()
    await this.setState({ ...this.state, elapsed: 0, start: new Date() })
    this.props.toggleDimmer()
    if (this.player) {
      this.player.destroy();
    }
    this.timer = setInterval(this.tick, 50)
    this.recorder.record(err => {
      if (err) console.log(err)
      this._updateState()
    })
  }

  stopRecording = () => {
    this.recorder.stop(err => {
      clearInterval(this.timer);
      if (err) return console.log(err)
      this._updateState(err, true)
    })
  }

  playback = () => {
    this.setState({ ...this.state, elapsed: 0, start: new Date() }, () =>
      this.player.playPause((err, playing) => {
        console.log(playing)
        if (err) return console.log(err)
        return this.timer = setInterval(this.tick, 50)
      })
    )
  }

  getText = (recording, finished) => {
    if (!recording && !finished) return 'En………Actie!'
    else if (recording) return 'Recording...'
    else if (finished) return 'Done!'
  }

  render() {
    const { recording, finished, progress } = this.state
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(1)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.getText(recording, finished)}</Text>
        <Text style={styles.timer}>{this.formatTime(seconds)}</Text>
        {!recording && !finished ?
          <TouchableOpacity
            onPress={this.startRecording}
            style={styles.start_recording}>
            <Image style={styles.mic_icon} source={MicIcon} />
          </TouchableOpacity>
          : recording ?
            <TouchableOpacity
              onPress={this.stopRecording}
              style={styles.stop_recording}>
              <View style={styles.rectangle} />
            </TouchableOpacity>
            : finished &&
            <View style={styles.actions}>
              <View style={styles.actions_top}>
                <TouchableOpacity
                  onPress={this.playback}
                  style={styles.playback}>
                  <View style={styles.triangle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.finish_button}
                  onPress={this.submit}>
                  <Text style={styles.finish_text}>Opslaan</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={Actions.home}
                style={styles.cancel_button}>
                <Image style={{ width: 15, height: 15, marginRight: 5 }} source={CancelIcon} />
                <Text style={{ color: 'red' }}>Verwijder</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#000065',
    width: '100%',
    zIndex: 2,
    padding: 20
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 16
  },
  start_recording: {
    borderRadius: 100,
    backgroundColor: '#D0021B',
    height: 74,
    width: 74,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mic_icon: {
    height: 35,
    width: 25
  },
  timer: {
    flex: 2,
    fontSize: 56,
    color: 'white'
  },
  stop_recording: {
    borderRadius: 100,
    backgroundColor: 'white',
    height: 74,
    width: 74,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rectangle: {
    backgroundColor: '#D0021B',
    height: 22,
    width: 22
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actions_top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playback: {
    height: 39,
    width: 39,
    borderRadius: 100,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  triangle: {
    width: 0,
    height: 0,
    marginLeft: -6,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderTopColor: '#FBCB5E',
    transform: [{ rotate: '45deg' }]
  },
  finish_button: {
    display: 'flex',
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
    fontWeight: 'bold',
    color: styleConsts.cream_blue
  },
  cancel_button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
})


const mapStateToProps = state => ({
  auth: state.auth.user
});


export default connect(mapStateToProps)(Recording)
