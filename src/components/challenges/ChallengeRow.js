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
  button: {
    borderRadius: 50,
    backgroundColor: 'blue',
    padding: 5
  },
  button_text: {
    fontWeight: 'bold',
    color: 'yellow'
  }
})

const ChallengeRow = () => (
  <View style={styles.container}>
    <Text style={{ flex: 1 }}>Icon</Text>
    <Text style={{ flex: 2 }}> Robot off</Text>
    <View style={styles.button}>
      <Text style={styles.button_text}>Learn more</Text>
    </View>
  </View >
)

export default ChallengeRow