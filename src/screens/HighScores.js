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
import { teamActions } from "../actions";
import { authHeader } from "../utils";
import UserRow from "../components/highcores/UserRow";
import { Actions } from "react-native-router-flux";
import { HomeIconBlue, HighScoresIcon2, HighScoresGuy } from "../assets/images";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
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
    flex: 1,
    display: "flex",
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
  guy: {
    position: "absolute",
    top: -50,
    right: 10
  }
});

class HighScores extends React.Component {
  state = {};

  componentDidMount() {
    console.log("hehexdDD");
    console.log("hehexdDD");
    console.log("hehexdDD");
    console.log("hehexdDD");
    console.log("hehexdDD");
    const { dispatch, auth } = this.props;
    dispatch(teamActions.readAll(auth.token));
  }

  render() {
    const { teams } = this.props;
    return (
      <View style={styles.container}>
        {teams.isFetching ? (
          <ActivityIndicator size="small" color="#FECB45" />
        ) : (
          [
            <View style={styles.header}>
              <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                <Image source={HomeIconBlue} />
              </TouchableOpacity>
              <Image source={HighScoresIcon2} />
              <Text style={styles.header_title}>High Scores</Text>
              {/* <ScrollView>
              {teams.all.map((item, index) => (
                <Text data={item} key={index} />
              ))}
            </ScrollView> */}
            </View>,
            <View style={styles.table}>
              <Image style={styles.guy} source={HighScoresGuy} />
              <Text style={styles.table_header}>Team highscores</Text>
              <TeamRow />
              <TeamRow />
              <TeamRow />
              <TeamRow />
            </View>,
            <View style={styles.table}>
              <Text style={styles.table_header}>Personal highscores</Text>
              <UserRow />
              <UserRow />
              <UserRow />
              <UserRow />
            </View>
          ]
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  teams: state.team
});

export default connect(mapStateToProps)(HighScores);
