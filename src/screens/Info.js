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
import { connect } from 'react-redux'
import { infoActions } from '../actions'
import styleConsts from '../constants/styles'
import { HomeIconBlue, HighScoresIcon2, HighScoresGuy } from '../assets/images'
import AllScreenMessage from '../components/AllScreenMessage'

class Info extends React.Component {
  componentDidMount() {
    const { dispatch, auth } = this.props
    dispatch(infoActions.read(auth.token))
  }

  render() {
    const { info } = this.props
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {info.isFetching || !info.current ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                <Image source={HomeIconBlue} />
              </TouchableOpacity>
              <Text style={styles.header_title}>Information</Text>
            </View>
            <AllScreenMessage message={info.current.content} />
          </View>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2'
  },
  homebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    width: '100%'
  },
  header_title: {
    fontSize: 24,
    margin: 15,
    color: '#010763'
  },
  header: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  table: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 10
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
  }
})

const mapStateToProps = state => ({
  auth: state.auth.user,
  info: state.info
})

export default connect(mapStateToProps)(Info)
