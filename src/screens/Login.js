import React from "react";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { auth } from "../actions";
import styleConsts from "../constants/styles";
import { Illustration } from "../assets/images/login";
import { CheckinIcon } from "../assets/images";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  formField: {
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    width: "100%",
    marginBottom: 10,
    zIndex: 1,
    color: "darkblue"
  },
  header: {
    flex: 1,
    paddingTop: 30,
    fontSize: 38,
    zIndex: 1,
    color: styleConsts.login_font_color
  },
  illustration: {
    position: "absolute",
    bottom: 140,
    left: 0,
    resizeMode: "contain",
    width: Dimensions.get("window").width
  },
  button: {
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    padding: 12,
    zIndex: 2,
    backgroundColor: styleConsts.login_font_color
  },
  form: {
    flex: 1,
    width: "100%",
    padding: 10
  },
  checkin: {
    position: "absolute",
    right: 30,
    bottom: -23
  },
  checkin_icon: {
    aspectRatio: 0.25,
    resizeMode: "contain"
  }
});

class Login extends React.Component {
  state = {
    user: {
      name: "",
      password: ""
    }
  };

  componentDidMount() {
    if (this.props.isLogged) Actions.home();
  }

  sendLoginRequest = () => {
    const { dispatch } = this.props;
    const { user } = this.state;
    dispatch(auth.login(user));
  };

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
    const { user } = this.state;
    const { isLogged, error } = this.props;
    if (isLogged) {
      Actions.home();
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Klantgericht Omroepen</Text>
        <Text>{error}</Text>
        <View style={styles.form}>
          <Image style={styles.illustration} source={Illustration} />
          <TextInput
            style={styles.formField}
            placeholderTextColor="darkblue"
            onChangeText={name => this.handleChange({ name: name })}
            value={user.name}
            placeholder="Enter Your username"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            textAlign={"center"}
          />
          <TextInput
            style={styles.formField}
            placeholderTextColor="darkblue"
            onChangeText={password => this.handleChange({ password: password })}
            value={user.password}
            type="password"
            placeholder="Enter Your password"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            textAlign={"center"}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={this.sendLoginRequest}
            style={styles.button}
          >
            <View style={styles.checkin}>
              <Image style={styles.checkin_icon} source={CheckinIcon} />
            </View>
            <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  error: state.auth.error,
  isLogged: state.auth.isLogged
});

export default connect(mapStateToProps)(Login);
