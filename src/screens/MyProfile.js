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
import ImagePicker from "react-native-image-crop-picker";

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

  render() {
    const { user } = this.props;
    const { showUploadDialog } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {user.isFetching || !user.current ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
            [
              <View style={styles.header}>
                <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                  <Image source={HomeIcon} />
                </TouchableOpacity>
                {console.log(config.PHOTO_URL + user.current.avatar)}
                <Image style={styles.avatar_img} source={user.current.avatar ? { uri: config.PHOTO_URL + user.current.avatar } : DefaultAvatar} />
                <Text style={styles.username}>@{user.current.name}</Text>
                <HeaderButtons selectPicture={this.selectPicture} />
              </View>,
              <View style={styles.table}>
                <Text style={styles.table_header}>Punten</Text>
                {console.log(user.current)}
                <Scores
                  score={user.current.team_score}
                  rating={user.current.mod_score_sum}
                  numberofratings={user.current.num_of_recordings}
                />
              </View>,
              <View style={styles.table}>
                <Text style={styles.table_header}>Team opnames</Text>
                {user.current &&
                  user.current.recording_list.map((item, index) => (
                    <TeamRecordingsRow
                      name={item.recording_name.file_name}
                      num_of_comments={item.number_of_comments}
                      path_to_recording={item.path_to_recording}
                    />
                  ))}
              </View>
            ]
          )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
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
  },
  avatar_img: {
    height: 112,
    width: 112,
    borderRadius: 100
  }
});

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user
});

export default connect(mapStateToProps)(MyProfile);
