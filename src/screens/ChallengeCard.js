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
import { recordingActions } from '../actions'
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
import ChallengeSubmitOptions from '../components/ChallengeSubmitOptions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    height: '100%'
  },
  topbar: {
    top: 0,
    left: 0,
    height: 40,
    position: 'absolute',
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
    marginBottom: 10,
    color: styleConsts.light_blue,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  descriptionMid: {
    fontSize: 12,
    color: '#010763',
    marginBottom: 10,
    color: styleConsts.light_blue,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  descriptionLong: {
    fontSize: 9,
    color: '#010763',
    marginBottom: 10,
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
    paddingLeft: 10,
    marginBottom: 10
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
    showHint: false,
    option: undefined,
    actionsDisabled: false
  }

  setOption = name => this.setState({ option: name })

  componentDidMount() {
    const { dispatch, auth, challenge } = this.props
    dispatch(teamActions.teamProgress(challenge.id, auth.token))
  }

  submit = text => {
    const { dispatch, auth, challenge } = this.props
    dispatch(
      recordingActions.create(auth, challenge, undefined, auth.token, text)
    )
    this.resetOption()
    Actions.success()
  }

  toggleActions = () =>
    this.setState({ actionsDisabled: !this.state.actionsDisabled })

  resetOption = () => this.setState({ option: undefined, dim: false })

  toggleHint = () => this.setState({ showHint: !this.state.showHint })

  toggleDimmer = () => this.setState({ dim: !this.state.dim })

  shootPic = () => {
    const { dispatch, user, auth, challenge } = this.props
    ImagePicker.openCamera({
      cropping: true
    })
      .then(image => {
        dispatch(
          recordingActions.create(
            auth,
            challenge,
            image,
            auth.token,
            undefined,
            image
          )
        )
        this.resetOption()
        Actions.success()
      })
      .catch(err => console.log(err))
  }

  render() {
    const { challenge, team_progress, teamIsFetching, error } = this.props
    const { dim, showHint, option, actionsDisabled } = this.state
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
              {showHint && (
                <TouchableOpacity onPress={this.toggleHint}>
                  <Icon
                    style={{
                      fontSize: 32,
                      color: '#010763'
                    }}
                    name="times-circle"
                  />
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
                {challenge.description.length < 120 ? (
                  <Text style={styles.description}>
                    {challenge.description}
                  </Text>
                ) : challenge.description.length > 120 &&
                challenge.description.length < 160 ? (
                  <Text style={styles.descriptionMid}>
                    {challenge.description}
                  </Text>
                ) : (
                  <Text style={styles.description}>
                    {challenge.descriptionLong}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={this.toggleHint}
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Hulp bij uitvoeren</Text>
                  <Image style={styles.arrow} source={RightArrow} />
                </TouchableOpacity>
                <RatingRow rating={challenge.difficulty} />
                <TeamProgress
                  progress={Math.round(team_progress.team_progress_percentage)}
                />
                <TeamMembersBar users={team_progress.users} />
              </>
            )}
            {!option ? (
              <ChallengeSubmitOptions
                disabled={actionsDisabled}
                record={challenge.audio_input}
                shoot={challenge.photo_input}
                action={this.setOption}
              />
            ) : option === 'record' ? (
              <Recording
                toggleActions={this.toggleActions}
                challenge={challenge}
                resetOption={this.resetOption}
                toggleDimmer={this.toggleDimmer}
              />
            ) : option === 'write' ? (
              Actions.addcomment({
                submitChallenge: this.submit,
                reset: this.resetOption
              })
            ) : (
              option === 'shoot' && this.shootPic()
            )}
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  team_progress: state.team.team_progress,
  teamIsFetching: state.team.isFetching,
  auth: state.auth.user,
  error: state.team.error
})

export default connect(mapStateToProps)(ChallengeCard)
