import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  SuccessBg
} from '../assets/images'
import styleConsts from '../constants/styles'

export class Success extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode={'cover'} // or cover
          style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
          source={SuccessBg}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={Actions.home}>
              <Text style={styles.text}>Afronden</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    // backgroundColor: '#f2f2f2',
    height: '100%'
  },
  button: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: styleConsts.cream_yellow,
    padding: 12,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 3,
    marginBottom: 100
  },
  text: {
    fontWeight: 'bold',
    color: styleConsts.cream_blue
  },
});

export default Success