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
  ChiliBlueIcon,
  HomePeople,
  FullStarIcon,
  InfoIcon
} from '../assets/images'
import styleConsts from '../constants/styles'
import { connect } from 'react-redux'
import { auth } from '../actions'

export class Home extends React.Component {
  logout = () => {
    const { dispatch } = this.props
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
          <TouchableOpacity
            onPress={() => Actions.myprofile({ uid: auth.id })}
            style={styles.box}
          >
            <Image style={styles.img} source={MyProfileIcon} />
            <Text style={styles.box_text}>Mijn Profiel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.highscores} style={styles.box}>
            <Image style={styles.img} source={HighScoresIcon} />
            <Text style={styles.box_text}>Score Lijst</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={Actions.allteams} style={styles.box}>
            <Image style={styles.img} source={TeamListIcon} />
            <Text style={styles.box_text}>Alle Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Actions.myteam({ tid: auth.team_id })}
            style={styles.box}
          >
            <Image style={styles.img} source={MyTeamIcon} />
            <Text style={styles.box_text}>Mijn Team</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={Actions.groupedchallenges}
            style={[styles.box, { backgroundColor: '#19408B' }]}
          >
            <View style={[styles.circle, { backgroundColor: 'white' }]}>
              <Image style={styles.img_new} source={ChiliBlueIcon} />
            </View>
            <Text style={[styles.box_text, { color: 'white' }]}>
              Challenges
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={this.logout}>
            <Text style={styles.logout_text}>Uitloggen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'white' }]}
            onPress={Actions.ratingpage}
          >
            <Image source={FullStarIcon} style={styles.star} />
            <Text style={styles.logout_text}>Waarderen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer_2}>
          <TouchableOpacity
            style={styles.footer_container}
            onPress={Actions.infopage}
          >
            <Image style={styles.info_icon} source={InfoIcon} />
          </TouchableOpacity>
          <View style={styles.trademark_container}>
            <Text style={styles.trademark}>
              <Text style={{ color: styleConsts.dark_blue }}>by</Text> Yellow
              <Text style={{ color: styleConsts.dark_blue }}>Storm.nl</Text>
            </Text>
          </View>
          <View style={styles.footer_container} />
        </View>
      </View>
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
  star: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5
  },
  footer_2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    borderRadius: 20,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '20%'
  },
  logout_text: {
    color: styleConsts.dark_blue,
    fontSize: 15
  },
  box_text: {
    color: styleConsts.dark_blue,
    fontSize: 15,
    marginTop: 2
  },
  bg_wrapper: {
    position: 'absolute',
    top: -505,
    left: 0
  },
  bg: {
    aspectRatio: 0.28,
    resizeMode: 'contain'
  },
  footer_container: {
    flex: 1
  },
  home_people_wrapper: {
    position: 'absolute',
    bottom: -46,
    right: 0
  },
  home_people: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  },
  img: {
    height: 83,
    width: 83,
    resizeMode: 'contain'
  },
  info_icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  img_new: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  circle: {
    width: 83,
    height: 83,
    backgroundColor: '#19408B',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trademark_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10
  },
  trademark: {
    color: styleConsts.gold,
    fontSize: 14,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => ({
  auth: state.auth.user
})

export default connect(mapStateToProps)(Home)
