import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import config from '../config/config';
import TeamRow from '../components/highcores/TeamRow';
import UserRow from '../components/highcores/UserRow';

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
    margin: 30,
    color: '#010763',
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
  }
});

class HighScores extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>High Scores</Text>
        <View style={styles.table}>
          <Text style={styles.table_header}>Team highscores</Text>
          <TeamRow />
          <TeamRow />
          <TeamRow />
          <TeamRow />
        </View>
        <View style={styles.table}>
          <Text style={styles.table_header}>Personal highscores</Text>
          <UserRow />
          <UserRow />
          <UserRow />
          <UserRow />
        </View>
      </View>
    )
  }
}

export default HighScores