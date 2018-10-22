import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'
import config from '../config/config'
import { Actions } from 'react-native-router-flux'
import TeamRow from '../components/highcores/TeamRow'
import UserRow from '../components/highcores/UserRow'
import ChallengeRow from '../components/challenges/ChallengeRow'
import {
  HomeIconBlue,
  ChallengesIcon2,
  DefaultChallengeIcon,
  BandFrame,
  RightArrow
} from '../assets/images'
import styleConsts from '../constants/styles'
import { connect } from 'react-redux'
import { teamActions } from '../actions'
import RatingRow from '../components/challengecard/RatingRow'
import TeamProgress from '../components/challengecard/TeamProgress'
import Recording from '../components/challengecard/Recording'
import team from '../reducers/team'
import TeamMembersBar from '../components/challengecard/TeamMembersBar'
import AllScreenMessage from '../components/AllScreenMessage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    height: '100%'
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    paddingBottom: 0
  },
  header_title: {
    fontSize: 24,
    color: '#010763',
    marginBottom: 15
  },
  description: {
    fontSize: 15,
    color: '#010763',
    marginBottom: 20,
    color: styleConsts.light_blue,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  img_frame: {
    height: 121,
    width: 162,
    resizeMode: 'contain'
  },
  icon_wrapper: {
    position: 'absolute',
    top: 3,
    left: 24
  },
  icon: {
    height: 115,
    width: 115
  },
  image_container: {
    marginBottom: 15
  },
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 1,
    opacity: 0.65
  },
  button: {
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#010763',
    padding: 7,
    paddingRight: 10,
    paddingLeft: 10
  },
  button_text: {
    color: styleConsts.gold,
    marginRight: 5
  },
  arrow: {
    resizeMode: 'contain',
    aspectRatio: 1.25
  }
})

class ChallengeCard extends React.Component {
  state = {
    dim: false,
    loaded: false,
    showHint: false
  }

  componentDidMount() {
    const { dispatch, token, challenge } = this.props
    dispatch(teamActions.teamProgress(challenge.id, token))
  }

  toggleHint = () => this.setState({ showHint: !this.state.showHint })

  toggleDimmer = () => this.setState({ dim: !this.state.dim })

  render() {
    const { challenge, team_progress, teamIsFetching, error } = this.props
    const { dim, showHint } = this.state
    return (
      <View style={styles.container}>
        {[
          dim && <View style={styles.dim} />,
          error &&
            Alert.alert('Er is iets gebeurd!', error, { cancelable: true })
        ]}
        {teamIsFetching || !team_progress ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
          <>
            <View style={styles.topbar}>
              <TouchableOpacity onPress={Actions.pop}>
                <Image source={HomeIconBlue} />
              </TouchableOpacity>
              {showHint ? (
                <TouchableOpacity
                  onPress={this.toggleHint}
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Close</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this.toggleHint}
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Suggesties</Text>
                  <Image style={styles.arrow} source={RightArrow} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.header_title}>{challenge.name}</Text>
            {showHint ? (
              <AllScreenMessage message={challenge.hint} />
            ) : (
              <>
                <View style={styles.image_container}>
                  <Image style={styles.img_frame} source={BandFrame} />
                  <View style={styles.icon_wrapper}>
                    <Image
                      style={styles.icon}
                      borderRadius={100}
                      source={
                        challenge.avatar
                          ? { uri: config.PHOTO_URL + challenge.avatar }
                          : DefaultChallengeIcon
                      }
                    />
                  </View>
                </View>
                <Text style={styles.description}>{challenge.description}</Text>
                <RatingRow rating={challenge.difficulty} />
                <TeamProgress
                  progress={Math.round(team_progress.team_progress_percentage)}
                />
                <TeamMembersBar users={team_progress.users} />
              </>
            )}
            <Recording challenge={challenge} toggleDimmer={this.toggleDimmer} />
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  team_progress: state.team.team_progress,
  teamIsFetching: state.team.isFetching,
  token: state.auth.user.token,
  error: state.team.error
})

export default connect(mapStateToProps)(ChallengeCard)
