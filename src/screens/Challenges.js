import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import config from '../config/config';
import TeamRow from '../components/highcores/TeamRow';
import UserRow from '../components/highcores/UserRow';
import ChallengeRow from '../components/challenges/ChallengeRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    height: '100%'
  },
  header: {
    fontSize: 24,
    marginTop: 50
  },
  table: {
    flex: 1,
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
    color: 'blue'
  }
});

class Challenges extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Challenges</Text>
        <View style={styles.table}>
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
      </View>
    )
  }
}

export default Challenges