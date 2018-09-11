import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  title: {
    flex: 9,
    color: '#010763',
    fontWeight: 'bold'
  },
})

const UserRow = () => (
  <View style={styles.container}>
    <Text style={{ flex: 1, color: '#137BD1' }}>1</Text>
    <Text style={styles.title}> Avangers</Text>
    <Text>(21) Stars here</Text>
  </View >
)

export default UserRow