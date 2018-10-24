import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styleConsts from '../constants/styles'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'center',
    padding: 5,
    paddingRight: 10,
    zIndex: 999
  }
})

const ChallengeSubmitOptions = ({ record, shoot, write, action, disabled }) => (
  <View style={styles.container}>
    <TouchableOpacity
      disabled={disabled}
      onPress={() => action('write')}
      style={styles.wrapper}
    >
      <Icon
        style={{
          padding: 10,
          fontSize: 26,
          color: styleConsts.gold,
          opacity: disabled ? 0.5 : 1
        }}
        name="pencil-alt"
      />
    </TouchableOpacity>
    {record && (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => action('record')}
        style={styles.wrapper}
      >
        <Icon
          style={{
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 26,
            color: styleConsts.gold,
            opacity: disabled ? 0.5 : 1
          }}
          name="microphone-alt"
        />
      </TouchableOpacity>
    )}
    {shoot && (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => action('shoot')}
        style={styles.wrapper}
      >
        <Icon
          style={{
            padding: 10,
            fontSize: 26,
            color: styleConsts.gold,
            opacity: disabled ? 0.5 : 1
          }}
          name="camera"
        />
      </TouchableOpacity>
    )}
  </View>
)

export default ChallengeSubmitOptions
