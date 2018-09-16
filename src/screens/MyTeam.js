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
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import TeammateRow from "../components/myteam/TeammateRow";
import TeamRecordingsRow from "../components/myteam/TeamRecordingsRow";
import styleConsts from "../constants/styles";
import { teamActions } from "../actions";
import { HomeIconBlue, TeamIcon, TeamGuy } from "../assets/images";

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
    fontSize: 22,
    margin: 10,
    color: styleConsts.dark_blue
  },
  header: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: styleConsts.gold
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
    marginTop: 20,
    fontWeight: "bold",
    color: styleConsts.light_blue
  },
  icon: {
    aspectRatio: 1,
    resizeMode: "contain"
  },
  guy: {
    position: "absolute",
    top: -30,
    right: 0
  },
  guy_icon: {
    aspectRatio: 0.3,
    resizeMode: "contain"
  },
  homebar: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    width: "100%"
  },
  score: {
    fontSize: 30,
    color: styleConsts.light_blue,
    fontWeight: "bold"
  },
  score_text: {
    fontSize: 14,
    color: styleConsts.dark_blue
  }
});

class MyTeam extends React.Component {
  state = {};

  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(teamActions.read(auth.token));
  }
  render() {
    const { team } = this.props;
    return (
      <ScrollView>
        {team.isFetching || !team.current ? (
          <ActivityIndicator size="small" color="#FECB45" />
        ) : (
            [
              <View style={styles.header}>
                <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                  <Image source={HomeIconBlue} />
                </TouchableOpacity>
                <Image style={styles.icon} source={TeamIcon} />
                <Text style={styles.header_title}>
                  Team{" "}
                  <Text style={{ fontWeight: "bold" }}>{team.current.name}</Text>
                </Text>
                {console.log(team.current)}
                <Text style={styles.score}>{team.current.team_score}</Text>
                <Text style={styles.score_text}>punten</Text>
              </View>,
              <View style={styles.table}>
                {team.current &&
                  team.current.team_members.map((item, index) => (
                    <TeammateRow
                      name={item.name}
                      mod_score={item.mod_score}
                      num_of_recordings={item.num_of_recordings}
                      avatar={item.avatar}
                    />
                  ))}
              </View>,
              <View style={styles.table}>
                <View style={styles.guy}>
                  <Image style={styles.guy_icon} source={TeamGuy} />
                </View>
                <Text style={styles.table_header}>Team opnames</Text>
                {team.current && team.current.team_recordings.length > 0 ?
                  team.current.team_recordings.map((item, index) => (
                    <TeamRecordingsRow
                      name={item.path_to_recording}
                      num_of_comments={item.number_of_comments}
                    />
                  )) : <TeamRecordingsRow empty />}
              </View>
            ]
          )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  team: state.team
});

export default connect(mapStateToProps)(MyTeam);
