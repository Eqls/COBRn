import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
import config from "../config/config";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { authHeader } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    height: "100%"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FECB45"
  },
  title: {
    fontSize: 18,
    color: "#010763",
    fontWeight: "bold"
  },
  homebar: {
    flex: 1,
    padding: 10,
    width: "100%"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#E6B430",
    padding: 12,
    margin: 10
  },
  back: {
    fontWeight: "bold",
    color: "white"
  },
  form: {
    flex: 1,
    padding: 5
  }
});

class EditProfile extends React.Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    if (!state.user && props.user.current) {
      return {
        user: props.user.current
      };
    }
    return null;
  }

  submitUpdate = user => {
    const { dispatch, auth } = this.props;
    dispatch(userActions.update(user, auth.token))
    Actions.pop()
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
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
            <Text style={styles.back}>Ga terug</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Wijzig uw gegevens</Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={styles.form}>
          <Text>Gebruikersnaam</Text>
          <TextInput
            style={{ height: 40, backgroundColor: "white" }}
            onChangeText={name => this.handleChange({ name })}
            value={user.name} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.submitUpdate(user)}
          >
            <Text style={{ color: "#010763" }}>Profiel bijwerken</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user
});

export default connect(mapStateToProps)(EditProfile);
