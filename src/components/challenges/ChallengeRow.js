import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import styleConsts from '../../constants/styles'
import {
  RightArrow,
  BandFrame,
  DefaultChallengeIcon
} from '../../assets/images'
import config from '../../config/config'

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
    marginRight: 25,
  },
  icon_wrapper: {
    position: 'absolute',
    top: 1,
    left: 6,
  },
  icon: {
    borderWidth: 1,
    borderColor: '#000065',
    height: 33,
    width: 33,
  },
  info: {
    flex: 1,
    flexDirection: 'column'
  },
  info_text: {
    color: 'black',
    fontSize: 15
  }
})
const avatar = null
const ChallengeRow = ({ challenge }) => (
  <View style={styles.container}>
    <View>
      <Image style={styles.img_frame} source={BandFrame} />
      <View style={styles.icon_wrapper}>
        <Image style={styles.icon} borderRadius={50} source={challenge.avatar ? { uri: config.PHOTO_URL + challenge.avatar } : DefaultChallengeIcon} />
      </View>
    </View>
    <View style={styles.info}>
      <Text style={styles.info_text}>{challenge.name ? challenge.name : 'No title'}</Text>
    </View>
    <TouchableOpacity
      onPress={() => Actions.challengecard({ challenge })}
      style={styles.button}>
      <Text
        style={styles.button_text}
      >
        Bekijk
      </Text>
      <Image style={styles.arrow} source={RightArrow} />
    </TouchableOpacity>
  </View >
)

export default ChallengeRow