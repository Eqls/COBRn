import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import styleConsts from '../../constants/styles'
import { RightArrow } from '../../assets/images'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
    padding: 7
  },
  button_text: {
    fontWeight: 'bold',
    color: styleConsts.gold,
    marginRight: 5
  },
  arrow: {
    padding: 3,
    resizeMode: 'contain',
    aspectRatio: 1.25

  }
})

const ChallengeRow = () => (
  <View style={styles.container}>
    <Text style={{ flex: 1 }}>Icon</Text>
    <Text style={{ flex: 2 }}> Robot off</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.button_text}>Bekijk</Text>
      <Image style={styles.arrow} source={RightArrow} />
    </TouchableOpacity>
  </View >
)

export default ChallengeRow