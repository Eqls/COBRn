import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import config from "../config/config";
import TeamRow from "../components/highcores/TeamRow";
import { Actions } from "react-native-router-flux";
import { HomeIconBlue, AllTeamsIcon, AllTeamsBg, AllTeamsGuy } from "../assets/images";
import styleConsts from "../constants/styles";
import { connect } from "react-redux";
import { teamActions } from "../actions";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  homebar: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 15,
    width: "100%"
  },
  header_title: {
    fontSize: 22,
    margin: 10,
    color: styleConsts.dark_blue
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
    paddingLeft: 30,
    fontWeight: "bold",
    color: styleConsts.light_blue
  },
  icon: {
    aspectRatio: 0.5,
    resizeMode: "contain"
  },
  bg_wrapper: {
    position: 'absolute',
    left: -140,
    bottom: 0,
    zIndex: -1
  },
  bg: {
    height: 461,
    resizeMode: 'contain'
  },
  guy_wrapper: {
    position: 'absolute',
    right: 60,
    bottom: -55,
  },
  guy: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  }
});

class AllTeams extends React.Component {
  state = {};

  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(teamActions.readAll(auth.token));
  }
  render() {
    const { teams } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.guy_wrapper}>
          <Image style={styles.guy} source={AllTeamsGuy} />
        </View>
        <View style={styles.bg_wrapper}>
          <Image style={styles.bg} source={AllTeamsBg} />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          {teams.isFetching && !this.props.teams.all ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#FECB45" />
            </View>
          ) : (
              [
                <View style={styles.header}>
                  <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                    <Image source={HomeIconBlue} />
                  </TouchableOpacity>
                  <Image style={styles.icon} source={AllTeamsIcon} />
                  <Text style={styles.header_title}>Alle Teams</Text>
                </View>,
                <View style={styles.table}>
                  {teams.all &&
                    teams.all.data.sort((a, b) => b.team_score - a.team_score).map((item, index) => (
                      <TeamRow
                        id={item.id}
                        name={item.name}
                        team_score={item.team_score}
                        position={index + 1}
                      />
                    ))}
                </View>
              ]
            )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  teams: state.team
});

export default connect(mapStateToProps)(AllTeams);
