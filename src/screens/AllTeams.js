import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import config from "../config/config";
import TeamRow from "../components/highcores/TeamRow";
import { Actions } from "react-native-router-flux";
import { HomeIconBlue, AllTeamsIcon } from "../assets/images";
import styleConsts from "../constants/styles";
import { connect } from "react-redux";
import { teamActions } from "../actions";

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
      <View style={styles.container}>
        {teams.isFetching && !this.props.teams.all ? (
          <ActivityIndicator size="small" color="#FECB45" />
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
              teams.all.data.map((item, index) => (
                <TeamRow
                  name={item.name}
                  team_score={item.team_score}
                  position={index + 1}
                />
              ))}
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

export default connect(mapStateToProps)(AllTeams);
