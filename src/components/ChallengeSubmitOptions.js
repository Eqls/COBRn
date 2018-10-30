import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styleConsts from '../constants/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%'
  },
  actions: {
    marginBottom: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000065',
    width: '100%',
    padding: 20
  },
  wrapper: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10
  }
})

const ChallengeSubmitOptions = ({ record, shoot, write, action, disabled }) => (
  <View style={styles.container}>
    <View style={styles.actions}>
      {record && (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => action('record')}
          style={styles.wrapper}
        >
          <Icon
            style={{
              padding: 10,
              paddingLeft: 17,
              paddingRight: 13,
              borderRadius: 50,
              backgroundColor: styleConsts.gold,
              borderColor: styleConsts.gold,
              borderWidth: 2,
              fontSize: 26,
              color: styleConsts.cream_blue,
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
              paddingLeft: 12,
              paddingRight: 8,
              fontSize: 26,
              backgroundColor: styleConsts.gold,
              borderColor: styleConsts.gold,
              borderWidth: 2,
              borderRadius: 50,
              color: styleConsts.cream_blue,
              opacity: disabled ? 0.5 : 1
            }}
            name="camera"
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => action('write')}
        style={styles.wrapper}
      >
        <Icon
          style={{
            paddingLeft: 12,
            paddingRight: 8,
            paddingTop: 11,
            paddingBottom: 9,
            fontSize: 26,
            borderRadius: 50,
            borderColor: styleConsts.gold,
            borderWidth: 2,
            color: styleConsts.gold,
            opacity: disabled ? 0.5 : 1
          }}
          name="pencil-alt"
        />
      </TouchableOpacity>
    </View>
  </View>
)

export default ChallengeSubmitOptions
