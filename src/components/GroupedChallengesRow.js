import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styleConsts from '../constants/styles'
import {
  RightArrow,
  BandFrame,
  DefaultChallengeIcon,
  ChallengeSuccess,
  ChallengeFailure,
  AlarmClock
} from '../assets/images'
import config from '../config/config'

const GroupedChallengesRow = ({ group }) => {
  return (
    <View style={styles.container}>
      {group.expired && group.done ? (
        <Image style={styles.img_frame} source={groupSuccess} />
      ) : !group.expired && !group.done ? (
        <View>
          <Image style={styles.img_frame} source={BandFrame} />
          <View style={styles.icon_wrapper}>
            <Image
              style={styles.icon}
              borderRadius={50}
              source={
                group.avatar
                  ? { uri: config.PHOTO_URL + group.avatar }
                  : DefaultChallengeIcon
              }
            />
          </View>
        </View>
      ) : (
        <Image style={styles.img_frame} source={ChallengeFailure} />
      )}
      <View style={styles.info}>
        <Text style={styles.info_text}>
          {group.name ? group.name : 'No title'}
        </Text>
        <View style={styles.expiration}>
          {!group.expired ? (
            <Text style={{ color: '#4765FF' }}>
              {group.number_of_challanges +
                ' ' +
                (group.number_of_challanges === 1 ? 'Challenge' : 'Challenges')}
            </Text>
          ) : group.expired && group.done ? (
            <Text style={{ color: '#71E84C' }}>Afgetikt!</Text>
          ) : (
            <Text style={{ color: '#FF8373' }}>Niet Gedaan...</Text>
          )}
        </View>
      </View>
      {group.expired && group.done ? (
        <TouchableOpacity
          onPress={() => Actions.groupcard({ group })}
          style={[styles.button, , { backgroundColor: '#78ff94' }]}
        >
          <Text style={[styles.button_text, { color: '#4765FF' }]}>
            Opnieuw?
          </Text>
        </TouchableOpacity>
      ) : !group.expired ? (
        <TouchableOpacity
          onPress={() => Actions.groupcard({ group })}
          style={styles.button}
        >
          <Text style={styles.button_text}>Bekijk</Text>
          <Image style={styles.arrow} source={RightArrow} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.button, { backgroundColor: '#EEEEEE' }]}>
          <Text style={[styles.button_text, { color: '#838383' }]}>
            Verlopen
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  button: {
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styleConsts.cream_blue,
    padding: 7,
    paddingRight: 10,
    paddingLeft: 10
  },
  button_text: {
    color: styleConsts.gold,
    marginRight: 5
  },
  arrow: {
    resizeMode: 'contain',
    aspectRatio: 1.25
  },
  img_frame: {
    width: 45,
    height: 35,
    marginRight: 25
  },
  icon_wrapper: {
    position: 'absolute',
    top: 1,
    left: 6
  },
  icon: {
    borderWidth: 1,
    borderColor: '#000065',
    height: 33,
    width: 33
  },
  info: {
    flex: 1,
    flexDirection: 'column'
  },
  info_text: {
    color: 'black',
    fontSize: 15
  },
  clock: {
    width: 15,
    height: 15,
    marginRight: 3
  },
  expiration: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default GroupedChallengesRow
