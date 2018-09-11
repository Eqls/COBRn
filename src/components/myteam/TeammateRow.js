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
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  user_details: {
    flex: 2,
    flexDirection: 'column'
  },
  name: {
    color: 'darkblue'
  }
})

const TeammateRow = () => (
  <View style={styles.container}>
    <Text style={{ flex: 1 }}>Avatar</Text>
    <View style={styles.user_details}>
      <Text style={styles.name}>Johnny Boy</Text>
      <Text>Feedback (60)</Text>
    </View>
  </View >
)

export default TeammateRow