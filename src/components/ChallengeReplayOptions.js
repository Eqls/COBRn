import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styleConsts from '../constants/styles'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'center',
    padding: 5,
    paddingRight: 10
  },
  wrapper: {}
})

const ChallengeReplayOptions = ({
  audio,
  image,
  text,
  handleAction,
  disabled,
  white
}) => (
  <View style={styles.container}>
    {text && (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => handleAction('text')}
        style={styles.wrapper}
      >
        <Icon
          style={{
            padding: 5,
            paddingLeft: 7,
            borderRadius: 50,
            backgroundColor: white ? 'white' : styleConsts.gold,
            fontSize: 14,
            color: '#137BD1',
            opacity: disabled ? 0.5 : 1
          }}
          name="align-left"
        />
      </TouchableOpacity>
    )}
    {audio && (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => handleAction('audio')}
        style={styles.wrapper}
      >
        <Icon
          style={{
            padding: 5,
            paddingLeft: 7,
            borderRadius: 50,
            fontSize: 14,
            backgroundColor: white ? 'white' : styleConsts.gold,
            color: '#137BD1',
            opacity: disabled ? 0.5 : 1
          }}
          name="play"
        />
      </TouchableOpacity>
    )}
    {image && (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => handleAction('image')}
        style={styles.wrapper}
      >
        <Icon
          style={{
            padding: 5,
            borderRadius: 50,
            fontSize: 15,
            backgroundColor: white ? 'white' : styleConsts.gold,
            color: '#137BD1',
            opacity: disabled ? 0.5 : 1
          }}
          name="image"
        />
      </TouchableOpacity>
    )}
  </View>
)

export default ChallengeReplayOptions
