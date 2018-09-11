import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  HomeBackground,
  MyProfileIcon,
  HighScoresIcon,
  TeamListIcon,
  MyTeamIcon,
  ChallengesIcon
} from '../assets/images'
import styleConsts from '../constants/styles'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    // backgroundColor: '#f2f2f2',
    height: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  box: {
    borderRadius: 10,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 7,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  box_text: {
    marginTop: 10,
    color: styleConsts.dark_blue,
    fontSize: 15
  },
  bg: {
    position: 'absolute',
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    bottom: 0,
    left: 0
  }
});

export default class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={HomeBackground} />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => Actions.myprofile()} style={styles.box}>
            <Image source={MyProfileIcon} />
            <Text style={styles.box_text}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.highscores()} style={styles.box}>
            <Image source={HighScoresIcon} />
            <Text style={styles.box_text}>High Scores</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.box}>
            <Image source={TeamListIcon} />
            <Text style={styles.box_text}>All Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.myteam()} style={styles.box}>
            <Image source={MyTeamIcon} />
            <Text style={styles.box_text}>My Team</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => Actions.challenges()} style={styles.box}>
            <Image source={ChallengesIcon} />
            <Text style={styles.box_text}>Challenges</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}