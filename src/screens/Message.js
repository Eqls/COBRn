import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import styleConsts from '../constants/styles'
import AllScreenMessage from '../components/AllScreenMessage'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Message = ({ text }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <View>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={Actions.pop}>
          <Icon
            style={{
              fontSize: 32,
              color: '#010763'
            }}
            name="times-circle"
          />
        </TouchableOpacity>
      </View>
      <AllScreenMessage message={text} />
    </View>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2'
  },
  table_header: {
    fontSize: 14,
    padding: 10,
    paddingLeft: 30,
    fontWeight: 'bold',
    color: styleConsts.light_blue
  },
  icon: {
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    paddingBottom: 0
  }
})

export default Message
