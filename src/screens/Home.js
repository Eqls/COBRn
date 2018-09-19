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
  ChallengesIcon,
  HomePeople
} from '../assets/images'
import styleConsts from '../constants/styles'
import { connect } from 'react-redux'
import { auth } from '../actions'


export class Home extends React.Component {

  logout = () => {
    const { dispatch } = this.props;
    dispatch(auth.logout())
    Actions.main()
  }

  render() {
    const { auth } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.bg_wrapper}>
          <Image style={styles.bg} source={HomeBackground} />
        </View>
        <View style={styles.home_people_wrapper}>
          <Image style={styles.home_people} source={HomePeople} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => Actions.myprofile({ uid: auth.id })} style={styles.box}>
            <Image style={styles.img} source={MyProfileIcon} />
            <Text style={styles.box_text}>Mijn Profiel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.highscores()} style={styles.box}>
            <Image style={styles.img} source={HighScoresIcon} />
            <Text style={styles.box_text}>Score Lijst</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => Actions.allteams()} style={styles.box}>
            <Image style={styles.img} source={TeamListIcon} />
            <Text style={styles.box_text}>Alle Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.myteam({ tid: auth.team_id })} style={styles.box}>
            <Image style={styles.img} source={MyTeamIcon} />
            <Text style={styles.box_text}>Mijn Team</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => Actions.challenges()} style={styles.box}>
            <Image style={styles.img} source={ChallengesIcon} />
            <Text style={styles.box_text}>Challenges</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.box, { backgroundColor: '#19408B' }]} onPress={this.logout}>
            <Text style={styles.logout_text}>Logout</Text>
          </TouchableOpacity>
          {auth.role_id === 2 &&
            <TouchableOpacity style={[styles.box, { backgroundColor: styleConsts.gold }]} onPress={this.logout}>
              <Text style={[styles.logout_text, { color: styleConsts.dark_blue, }]}>Give ratings</Text>
            </TouchableOpacity>}
        </View>
      </View >
    )
  }
}


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
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
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
  logout_text: {
    color: 'white',
    fontSize: 15
  },
  box_text: {
    marginTop: 10,
    color: styleConsts.dark_blue,
    fontSize: 15
  },
  bg_wrapper: {
    position: 'absolute',
    top: -505,
    left: 0
  },
  bg: {
    aspectRatio: .28,
    resizeMode: 'contain',
  },
  home_people_wrapper: {
    position: 'absolute',
    bottom: -46,
    right: 0,
  },
  home_people: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  },
  img: {
    height: 83,
    width: 83,
    resizeMode: 'contain'
  }
});

const mapStateToProps = state => ({
  auth: state.auth.user
});

export default connect(mapStateToProps)(Home);