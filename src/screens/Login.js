import React from 'react'
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../actions'
import styleConsts from '../constants/styles'
import { CheckinIcon, LoginBg, Logo } from '../assets/images'
import ProgressBar from '../components/challengecard/ProgressBar'

class Login extends React.Component {
  state = {
    user: {
      name: '',
      password: ''
    }
  }

  componentDidMount() {
    if (this.props.isLogged) Actions.home()
  }

  sendLoginRequest = () => {
    const { dispatch } = this.props
    const { user } = this.state
    dispatch(auth.login(user))
  }

  handleChange = data => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        ...data
      }
    })
  }

  render() {
    const { user } = this.state
    const { isLogged, error } = this.props
    if (isLogged) {
      Actions.home()
    }
    return (
      <View style={styles.container}>
        {error && (
          <Text style={styles.error}>
            {error.error
              ? error.error
              : 'Er is iets fout gegaan! Probeer het later opnieuw.'}
          </Text>
        )}
        <View style={styles.logo_wrapper}>
          <Image
            style={styles.logo_img} // must be passed from the parent, the number may vary depending upon your screen size
            source={Logo}
          />
        </View>
        <View style={styles.background_wrapper}>
          <Image
            style={styles.background_img} // must be passed from the parent, the number may vary depending upon your screen size
            source={LoginBg}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.formField}
            placeholderTextColor="#010763"
            onChangeText={name => this.handleChange({ name: name })}
            value={user.name}
            placeholder="Typ je gebruikersnaam"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            textAlign={'center'}
          />
          <TextInput
            style={styles.formField}
            placeholderTextColor="#010763"
            onChangeText={password => this.handleChange({ password: password })}
            value={user.password}
            type="password"
            placeholder="Voer uw wachtwoord in"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            textAlign={'center'}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={this.sendLoginRequest}
            style={styles.button}
          >
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.checkin}>
            <Image style={styles.checkin_icon} source={CheckinIcon} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  formField: {
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    width: '100%',
    marginBottom: 15,
    zIndex: 1,
    color: '#010763'
  },
  error: {
    color: 'red',
    backgroundColor: '#f2f2f2',
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 50,
    padding: 12,
    zIndex: 2,
    backgroundColor: styleConsts.login_font_color
  },
  form: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    zIndex: 2
  },
  checkin: {
    position: 'absolute',
    right: 40,
    bottom: -12,
    zIndex: 999
  },
  checkin_icon: {
    aspectRatio: 0.25,
    resizeMode: 'contain'
  },
  background_wrapper: {
    position: 'absolute',
    bottom: 40
  },
  background_img: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  },
  logo_wrapper: {
    position: 'absolute',
    bottom: 420,
    zIndex: 2
  },
  logo_img: {
    aspectRatio: 2,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  isLogged: state.auth.isLogged
})

export default connect(mapStateToProps)(Login)
