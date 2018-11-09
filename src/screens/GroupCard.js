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
import { HomeIconBlue, DefaultChallengeIcon, BandFrame } from '../assets/images'
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
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    paddingBottom: 0
  },
  header_title: {
    fontSize: 20,
    color: '#010763',
    marginBottom: 10
  },
  table: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10
  },
  img_frame: {
    height: 101,
    width: 142,
    resizeMode: 'contain'
  },
  icon_wrapper: {
    position: 'absolute',
    top: 3,
    left: 25
  },
  icon: {
    height: 95,
    width: 92
  },
  image_container: {
    marginBottom: 15
  }
})

class GroupCard extends React.Component {
  componentDidMount() {
    const { dispatch, auth, group } = this.props
    dispatch(challengeActions.readAll(group.id, auth.token))
  }

  sortChallenges = challenges => {
    let active = challenges
        .filter(x => x.days_left >= 0 && !x.done_by_user)
        .sort((a, b) => b.days_left - a.days_left),
      inactive = challenges
        .filter(x => x.days_left < 0 || x.done_by_user)
        .sort((a, b) => b.days_left - a.days_left)
    return active.concat(inactive)
  }

  render() {
    const { challengeIsFetching, allChallenges, group } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {challengeIsFetching ? (
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
            </View>
            <View style={styles.image_container}>
              <Image style={styles.img_frame} source={BandFrame} />
              <View style={styles.icon_wrapper}>
                <Image
                  style={styles.icon}
                  borderRadius={100}
                  source={
                    group.avatar
                      ? { uri: config.PHOTO_URL + group.avatar }
                      : DefaultChallengeIcon
                  }
                />
              </View>
            </View>
            <Text style={styles.header_title}>{group.name}</Text>
            <View style={styles.table}>
              {allChallenges &&
                this.sortChallenges(allChallenges).map(x => (
                  <ChallengeRow challenge={x} />
                ))}
            </View>
          </>
        )}
      </ScrollView>
    )
    return elements
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  allChallenges: state.challenge.all,
  challengeIsFetching: state.challenge.isFetching
})

export default connect(mapStateToProps)(GroupCard)
