import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import config from "../config/config";
import TeammateRow from "../components/myteam/TeammateRow";
import { Actions } from "react-native-router-flux";
import { PlayIcon, CommentsBg, CommentsGuy, HomeIcon, CommentsIcon, CommentCloud } from "./../assets/images";
import TeamRecordingsRow from "../components/myteam/TeamRecordingsRow";
import CommentRow from "../components/comments/CommentRow";
import styleConsts from '../constants/styles'
import { Player, MediaStates } from "react-native-audio-toolkit";
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  header_title: {
    fontSize: 18,
    margin: 10,
    color: '#000065'
  },
  header: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: styleConsts.gold
  },
  table: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginBottom: 30
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
  },
  bg_wrapper: {
    position: 'absolute',
    left: 0,
    bottom: -312
  },
  bg: {
    aspectRatio: .28,
    resizeMode: 'contain'
  },
  guy_wrapper: {
    position: 'absolute',
    right: 0,
    bottom: -65,
  },
  guy: {
    aspectRatio: 0.35,
    resizeMode: 'contain'
  },
  icon: {
    height: 22,
    width: 23,
    marginTop: 15
  },
  playback: {
    height: 23,
    width: 23,
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
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderTopColor: styleConsts.cream_blue,
    transform: [{ rotate: '45deg' }]
  },
  homebar: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    width: "100%"
  },
  button: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: styleConsts.cream_blue,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    margin: 10
  },
  button_icon: {
    marginLeft: 5,
    height: 17,
    width: 18
  }
});

class Comments extends React.Component {

  state = {
    comments: this.props.comments
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.current) {
      let item = props.user.current.recording_list.find(x => x.id === props.id)
      if (item && item.recording_comments.length !== state.comments.length) {
        return {
          comments: [...item.recording_comments]
        }
      }
    }
  }

  render() {
    const { id, rec_name, path_to_recording } = this.props;
    const { comments } = this.state

    playAudio = () => {
      new Player(config.PHOTO_URL + path_to_recording).play();
    };


    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bg_wrapper}>
          <Image style={styles.bg} source={CommentsBg} />
        </View>
        <View style={styles.guy_wrapper}>
          <Image style={styles.guy} source={CommentsGuy} />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => Actions.pop({ popNum: 2 })} style={styles.homebar}>
              <Image source={HomeIcon} />
            </TouchableOpacity>
            <Image style={styles.icon} source={CommentsIcon} />
            <Text style={styles.header_title}>{rec_name}</Text>
            <TouchableOpacity
              onPress={playAudio}
              style={styles.playback}>
              <View style={styles.triangle} />
            </TouchableOpacity>
          </View>
          <View style={styles.table}>
            {comments.length === 0 ? (
              <Text>no comments yet</Text>
            ) : (
                comments.map((item, index) => <CommentRow comment={item} />)
              )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.addcomment({ id })}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Write Comment</Text>
            <Image style={styles.button_icon} source={CommentCloud} />
          </TouchableOpacity>
        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user
});

export default connect(mapStateToProps)(Comments)
