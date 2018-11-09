import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StarRatingDisplay from '../StarRatingDisplay'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  title: {
    flex: 1,
    color: '#010763',
    fontWeight: 'bold'
  },
  team_score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#137BD1'
  }
})

const Scores = ({ score, rating, numberofratings }) => [
  <View style={styles.container}>
    <Text style={styles.title}>Mijn Waardering</Text>
    <Text>{'(' + numberofratings + ')'}</Text>
    <StarRatingDisplay starSize={30} rating={rating} />
  </View>,
  <View style={styles.container}>
    <Text style={styles.title}>Mijn Team Score</Text>
    <Text style={styles.team_score}>{score}</Text>
  </View>
]

export default Scores
