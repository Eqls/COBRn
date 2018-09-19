import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import config from '../config/config';
import { Actions } from 'react-native-router-flux'
import TeamRow from '../components/highcores/TeamRow';
import UserRow from '../components/highcores/UserRow';
import ChallengeRow from '../components/challenges/ChallengeRow';
import { HomeIconBlue, ChallengesIcon2, ChallengesGuy } from '../assets/images'
import styleConsts from '../constants/styles'
import { connect } from 'react-redux'
import { challengeActions, teamActions } from '../actions'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2'
  },
  homebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 15,
    width: "100%"
  },
  header_title: {
    fontSize: 22,
    margin: 10,
    color: '#010763',
  },
  header: {
    display: "flex",
    padding: 10,
    flexDirection: 'column',
    width: '100%',
    alignItems: "center"
  },
  table: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10
  },
  table_header: {
    fontSize: 14,
    padding: 10,
    paddingLeft: 30,
    fontWeight: 'bold',
    color: styleConsts.light_blue
  },
  guy: {
    position: 'absolute',
    top: -120,
    right: 40
  },
  guy_icon: {
    aspectRatio: .3,
    resizeMode: 'contain',
  },
  icon: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  }
});

class Challenges extends React.Component {

  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(challengeActions.readAll(auth.token));
    dispatch(teamActions.readAll(auth.token));
  }

  render() {
    const { challengeIsFetching, allChallenges, teamIsFetching, teams } = this.props
    return (<ScrollView contentContainerStyle={styles.container} >
      {(challengeIsFetching || teamIsFetching) ?
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#FECB45" />
        </View> :
        [
          <View style={styles.header}>
            <TouchableOpacity
              onPress={Actions.pop}
              style={styles.homebar}>
              <Image source={HomeIconBlue} />
            </TouchableOpacity>
            <Image style={styles.icon} source={ChallengesIcon2} />
            <Text style={styles.header_title}>Challenges</Text>
          </View>,
          <View style={styles.table}>
            {console.log(allChallenges)}
            <View style={styles.guy}>
              <Image style={styles.guy_icon} source={ChallengesGuy} />
            </View>
            <Text style={styles.table_header}></Text>
            {allChallenges &&
              allChallenges.sort((a, b) => b - a).map(x => <ChallengeRow challenge={x} />)}
          </View>,
          <View style={styles.table}>
            <Text style={styles.table_header}>Teams Highscore</Text>
            {teams &&
              teams.data.sort((a, b) => b.team_score - a.team_score).map((item, index) => (
                <TeamRow
                  key={item.id}
                  name={item.name}
                  team_score={item.team_score}
                  position={index + 1}
                />
              ))}
          </View>
        ]
      }
    </ScrollView>)
    return elements
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  teams: state.team.all,
  teamIsFetching: state.team.isFetching,
  allChallenges: state.challenge.all,
  challengeIsFetching: state.challenge.isFetching
});


export default connect(mapStateToProps)(Challenges)