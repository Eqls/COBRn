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
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import TeammateRow from '../components/myteam/TeammateRow'
import TeamRecordingsRow from '../components/myteam/TeamRecordingsRow'
import styleConsts from '../constants/styles'
import { teamActions } from '../actions'
import { HomeIconBlue, TeamIcon, TeamGuy } from '../assets/images'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2'
  },
  header_title: {
    fontSize: 22,
    margin: 10,
    color: styleConsts.dark_blue
  },
  header: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: styleConsts.gold
  },
  table: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10
  },
  table_header: {
    fontSize: 14,
    padding: 10,
    paddingLeft: 30,
    marginTop: 20,
    fontWeight: 'bold',
    color: styleConsts.light_blue
  },
  icon: {
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  guy: {
    position: 'absolute',
    top: -30,
    right: 0
  },
  guy_icon: {
    aspectRatio: 0.3,
    resizeMode: 'contain'
  },
  homebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    width: '100%'
  },
  score: {
    fontSize: 30,
    color: styleConsts.light_blue,
    fontWeight: 'bold'
  },
  score_text: {
    fontSize: 14,
    color: styleConsts.dark_blue
  }
})

class MyTeam extends React.Component {
  state = {}

  componentDidMount() {
    const { dispatch, auth, tid } = this.props
    // dispatch(teamActions.read(auth.token));
    dispatch(teamActions.read(tid, auth.token))
  }
  render() {
    const { team } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {team.isFetching || !team.current ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
          [
            <View style={styles.header}>
              <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                <Image source={HomeIconBlue} />
              </TouchableOpacity>
              <Image style={styles.icon} source={TeamIcon} />
              <Text style={styles.header_title}>
                Team{' '}
                <Text style={{ fontWeight: 'bold' }}>{team.current.name}</Text>
              </Text>
              <Text style={styles.score}>{team.current.team_score}</Text>
              <Text style={styles.score_text}>punten</Text>
            </View>,
            <View style={styles.table}>
              {team.current &&
                team.current.team_members.map((item, index) => (
                  <TeammateRow
                    id={item.id}
                    tl={item.role_id === 2}
                    name={item.name}
                    mod_score={item.mod_score_sum}
                    num_of_recordings={item.num_of_recordings}
                    avatar={item.avatar}
                  />
                ))}
            </View>,
            <View style={styles.table}>
              <View style={styles.guy}>
                <Image style={styles.guy_icon} source={TeamGuy} />
              </View>
              <Text style={styles.table_header}>Team Opnames</Text>
              {console.log(team.current)}
              {team.current && team.current.team_recordings.length > 0 ? (
                team.current.team_recordings.map((item, index) => (
                  <TeamRecordingsRow {...{ item }} />
                ))
              ) : (
                <TeamRecordingsRow empty />
              )}
            </View>
          ]
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  team: state.team
})

export default connect(mapStateToProps)(MyTeam)
