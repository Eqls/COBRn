import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import config from '../config/config';
import TeamRow from '../components/highcores/TeamRow';
import UserRow from '../components/highcores/UserRow';
import { Actions } from 'react-native-router-flux'
import { HomeIconBlue, AllTeamsIcon } from '../assets/images'

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
    fontWeight: 'bold',
    color: '#137BD1'
  },
  icon: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  }
});

class AllTeams extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={Actions.pop}
            style={styles.homebar}>
            <Image source={HomeIconBlue} />
          </TouchableOpacity>
          <Image style={styles.icon} source={AllTeamsIcon} />
          <Text style={styles.header_title}>Alle Teams</Text>
        </View>
        <View style={styles.table}>
          <TeamRow />
          <TeamRow />
          <TeamRow />
          <TeamRow />
          <TeamRow />
          <TeamRow />
        </View>
      </View>
    )
  }
}

export default AllTeams