import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import config from "../config/config";
import { commentActions, userActions } from "../actions";
import { Actions } from 'react-native-router-flux'

class AddComment extends React.Component {
  state = {
    text: undefined
  };

  onChangeText = text => this.setState({ text });

  submit = id => {
    const { dispatch, auth, user } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({ text: undefined, submitted: true })
      dispatch(commentActions.create(auth.token, auth.id, id, text))
      dispatch(userActions.read(user.current.id, auth.token))
      Actions.pop()
    } else {
      alert("Please enter your comment first");
    }
  };

  setDone = () => this.setState({ ...this.state, done: true })

  render() {
    const { id } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Write your message..."
          autoFocus={true} // focus and show the keyboard
          value={this.state.text}
          onChangeText={this.onChangeText} // handle input changes
        />
        <Button onPress={() => this.submit(id)} title="hfdsfd" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user
});
export default connect(mapStateToProps)(AddComment);
