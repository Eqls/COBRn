import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import config from "../config/config";
import { commentActions } from "../actions";

class AddComment extends React.Component {
  state = {
    text: undefined // user's input
  };

  onChangeText = text => this.setState({ text });

  submit = id => {
    const { dispatch, auth, user } = this.props;
    console.log(user);
    const { text } = this.state;
    if (text) {
      this.setState({ text: undefined }, () =>
        dispatch(commentActions.create(auth.token, user.current.id, id, text))
      );
    } else {
      alert("Please enter your comment first");
    }
  };

  render() {
    const { id } = this.props;
    console.log(id);
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
