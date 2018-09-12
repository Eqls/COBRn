import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import config from '../config/config';
import { Actions } from 'react-native-router-flux'
import TeamRow from '../components/highcores/TeamRow';
import UserRow from '../components/highcores/UserRow';
import ChallengeRow from '../components/challenges/ChallengeRow';
import { HomeIconBlue, ChallengesIcon2, ChallengesGuy } from '../assets/images'
import styleConsts from '../constants/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    height: '100%'
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
    flex: 1,
    display: 'flex',
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
});

class Challenges extends React.Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={Actions.pop}
            style={styles.homebar}>
            <Image source={HomeIconBlue} />
          </TouchableOpacity>
          <Image style={styles.icon} source={ChallengesIcon2} />
          <Text style={styles.header_title}>Challenges</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.guy}>
            <Image style={styles.guy_icon} source={ChallengesGuy} />
          </View>
          <Text style={styles.table_header}></Text>
          <ChallengeRow />
          <ChallengeRow />
          <ChallengeRow />
          <ChallengeRow />
          <ChallengeRow />
        </View>
        <View style={styles.table}>
          <Text style={styles.table_header}>Team highscores</Text>
          <TeamRow />
          <TeamRow />
          <TeamRow />
          <TeamRow />
        </View>
      </ScrollView>
    )
  }
}

export default Challenges