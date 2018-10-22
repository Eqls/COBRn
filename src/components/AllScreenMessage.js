import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import config from '../config/config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 40,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20
  },
  msg: {
    fontSize: 15,
    color: '#010763'
  }
})

const AllScreenMessage = ({ message }) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={styles.msg}>
        {message ? message : 'No information was found.'}
      </Text>
    </View>
  </View>
)

export default AllScreenMessage
