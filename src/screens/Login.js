import React from "react";
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from 'react-redux'
import { auth } from '../actions'
import styleConsts from '../constants/styles'
import { Illustration } from '../assets/images/login'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  formField: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 3,
    width: "100%",
    marginTop: 10
  },
  buttonWrapper: {
    height: 100,
    paddingTop: 10
  },
  avatar: {
    width: 80,
    height: 80
  },
  header: {
    fontSize: 46,
    color: styleConsts.login_font_color
  },
  illustration: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    alignItems: "center",
    justifyContent: "center"
  }
});

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
    });
  };

  render() {
    const { user } = this.state
    const { isLogged, error } = this.props
    if (isLogged) {
      Actions.home();
    }
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.illustration} source={Illustration}>
          <Text style={styles.header}>RNAPP</Text>
        </ImageBackground>
        <Text>{error}</Text>
        <TextInput
          style={styles.formField}
          onChangeText={name => this.handleChange({ name: name })}
          value={user.name}
          placeholder="Enter Your username"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          textAlign={"center"}
        />
        <TextInput
          style={styles.formField}
          onChangeText={password => this.handleChange({ password: password })}
          value={user.password}
          type="password"
          placeholder="Enter Your password"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          textAlign={"center"}
          secureTextEntry
        />
        <View style={styles.buttonWrapper}>
          <Button
            onPress={this.sendLoginRequest}
            title="Login"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  isLogged: state.auth.isLogged
})

export default connect(mapStateToProps)(Login)