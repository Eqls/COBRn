import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import config from '../config/config';
import TeammateRow from '../components/myteam/TeammateRow';
import TeamRecordingsRow from '../components/myteam/TeamRecordingsRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    height: '100%'
  },
  header_title: {
    fontSize: 24,
    margin: 20,
  },
  header: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'gold',
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
  },

  score: {
    fontSize: 30,
    color: 'blue',
    fontWeight: 'bold'
  }
});

class MyTeam extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_title}>Team Avangers</Text>
          <Text style={styles.score}>5465434</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.table_header}></Text>
          <TeammateRow />
          <TeammateRow />
          <TeammateRow />
        </View>
        <View style={styles.table}>
          <Text style={styles.table_header}>Team opnames</Text>
          <TeamRecordingsRow />
          <TeamRecordingsRow />
          <TeamRecordingsRow />
          <TeamRecordingsRow />
        </View>
      </View>
    )
  }
}

export default MyTeam