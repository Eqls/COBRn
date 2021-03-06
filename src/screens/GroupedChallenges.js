import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import config from '../config/config'
import { Actions } from 'react-native-router-flux'
import TeamRow from '../components/highcores/TeamRow'
import UserRow from '../components/highcores/UserRow'
import ChallengeRow from '../components/challenges/ChallengeRow'
import { HomeIconBlue, ChallengesIcon2, ChallengesGuy } from '../assets/images'
import styleConsts from '../constants/styles'
import { connect } from 'react-redux'
import { challengeActions, teamActions } from '../actions'
import GroupedChallengesRow from '../components/GroupedChallengesRow'

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
    width: '100%'
  },
  header_title: {
    fontSize: 22,
    margin: 10,
    color: '#010763'
  },
  header: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
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
    aspectRatio: 0.3,
    resizeMode: 'contain'
  },
  icon: {
    aspectRatio: 1,
    resizeMode: 'contain'
  }
})

class GroupedChallenges extends React.Component {
  componentDidMount() {
    const { dispatch, auth } = this.props
    dispatch(challengeActions.readAllGrouped(auth.token))
    dispatch(challengeActions.readAllOrphans(auth.token))
    dispatch(teamActions.readAll(auth.token))
  }

  sortChallenges = groups => {
    let active = groups.filter(x => !x.done && !x.expired),
      doneinactive = groups.filter(x => x.done && x.expired)
    inactive = groups.filter(x => !x.done && x.expired)
    return active.concat(doneinactive.concat(inactive))
  }

  render() {
    const {
      challengeIsFetching,
      allGroups,
      teamIsFetching,
      allChallenges,
      teams
    } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {challengeIsFetching || teamIsFetching ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                <Image source={HomeIconBlue} />
              </TouchableOpacity>
              <Image style={styles.icon} source={ChallengesIcon2} />
              <Text style={styles.header_title}>Challenges</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.guy}>
                <Image style={styles.guy_icon} source={ChallengesGuy} />
              </View>
              <Text style={styles.table_header} />
              {allGroups ? (
                this.sortChallenges(allGroups).map(x => (
                  <GroupedChallengesRow group={x} />
                ))
              ) : (
                <GroupedChallengesRow empty />
              )}
              {allChallenges &&
                this.sortChallenges(allChallenges).map(x => (
                  <ChallengeRow challenge={x} />
                ))}
            </View>
            <View style={styles.table}>
              <Text style={styles.table_header}>Team Punten</Text>
              {teams ? (
                teams.data
                  .sort((a, b) => b.team_score - a.team_score)
                  .map((item, index) => (
                    <TeamRow
                      id={item.id}
                      key={item.id}
                      name={item.name}
                      team_score={item.team_score}
                      position={index + 1}
                    />
                  ))
              ) : (
                <TeamRow empty />
              )}
            </View>
          </>
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  teams: state.team.all,
  teamIsFetching: state.team.isFetching,
  allGroups: state.challenge.allGroups,
  allChallenges: state.challenge.all,
  challengeIsFetching: state.challenge.isFetching
})

export default connect(mapStateToProps)(GroupedChallenges)
