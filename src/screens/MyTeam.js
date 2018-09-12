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
import TeammateRow from '../components/myteam/TeammateRow';
import TeamRecordingsRow from '../components/myteam/TeamRecordingsRow';
import styleConsts from '../constants/styles'
import { HomeIconBlue, TeamIcon, TeamGuy } from '../assets/images'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    height: '100%'
  },
  header_title: {
    fontSize: 22,
    margin: 10,
    color: styleConsts.dark_blue,
  },
  header: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: styleConsts.gold,
  },
  table: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10,
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
    resizeMode: 'contain',
  },
  homebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    width: "100%"
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
});

class MyTeam extends React.Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
            <Image source={HomeIconBlue} />
          </TouchableOpacity>
          <Image style={styles.icon} source={TeamIcon} />
          <Text style={styles.header_title}>Team <Text style={{ fontWeight: 'bold' }}>Avengers</Text></Text>
          <Text style={styles.score}>5465434</Text>
          <Text style={styles.score_text}>punten</Text>
        </View>
        <View style={styles.table}>
          <TeammateRow />
          <TeammateRow />
          <TeammateRow />
        </View>
        <View style={styles.table}>
          <View style={styles.guy}>
            <Image style={styles.guy_icon} source={TeamGuy} />
          </View>
          <Text style={styles.table_header}>Team opnames</Text>
          <TeamRecordingsRow />
          <TeamRecordingsRow />
          <TeamRecordingsRow />
          <TeamRecordingsRow />
        </View>
      </ScrollView>
    )
  }
}

export default MyTeam