import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import config from "../config/config";
import TeamRow from "../components/highcores/TeamRow";
import { connect } from "react-redux";
import { teamActions, userActions } from "../actions";
import { authHeader } from "../utils";
import UserRow from "../components/highcores/UserRow";
import { Actions } from "react-native-router-flux";
import { HomeIconBlue, HighScoresIcon2, HighScoresGuy } from "../assets/images";
import styleConsts from "../constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    height: "100%"
  },
  homebar: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    width: "100%"
  },
  header_title: {
    fontSize: 24,
    margin: 15,
    color: "#010763"
  },
  header: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    width: "100%",
    alignItems: "center"
  },
  table: {
    display: "flex",
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
  guy_wrapper: {
    position: "absolute",
    top: 30,
    right: 10
  },
  guy: {
    aspectRatio: 0.5,
    resizeMode: "contain"
  },
  icon: {
    aspectRatio: 1,
    resizeMode: "contain"
  }
});

class HighScores extends React.Component {
  state = {};

  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(teamActions.readAll(auth.token));
    dispatch(userActions.readAll(auth.token));
  }

  render() {
    const { teams, users } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {teams.isFetching &&
          !this.props.teams.all &&
          users.isFetching &&
          !this.props.users.all ? (
            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <ActivityIndicator size="large" color="#FECB45" />
            </View>
          ) : (
            [
              <View style={styles.header}>
                <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                  <Image source={HomeIconBlue} />
                </TouchableOpacity>
                <Image style={styles.icon} source={HighScoresIcon2} />
                <Text style={styles.header_title}>Score Lijst</Text>
              </View>,
              <View style={styles.guy_wrapper}>
                <Image style={styles.guy} source={HighScoresGuy} />
              </View>,
              <View style={styles.table}>
                <Text style={styles.table_header}>Team Punten</Text>
                {teams.all ? (
                  teams.all.data.map((item, index) => (
                    <TeamRow
                      id={item.id}
                      name={item.name}
                      team_score={item.team_score}
                      position={index + 1}
                    />
                  ))
                ) : (
                    <TeamRow empty />
                  )}
              </View>,
              <View style={styles.table}>
                <Text style={styles.table_header}>HC Waarderingen</Text>
                {users.all ? (
                  users.all.data.map((item, index) => (
                    <UserRow
                      id={item.id}
                      name={item.name}
                      mod_score={item.mod_score}
                      num_of_recordings={item.num_of_recordings}
                      position={index + 1}
                    />
                  ))
                ) : (
                    <UserRow empty />
                  )}
              </View>
            ]
          )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  teams: state.team,
  users: state.user
});

export default connect(mapStateToProps)(HighScores);
