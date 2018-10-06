import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { infoActions } from "../actions";

class Info extends React.Component {
  componentDidMount() {
    const { dispatch, auth } = this.props;
    dispatch(infoActions.read(auth.token));
  }

  render() {
    const { info } = this.props;
    return (
      <ScrollView>
        {info.isFetching || !info.current ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
        ) : (
          [
            <View>
              {console.log(info)}
              <Text>{info.current.content}</Text>
            </View>
          ]
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  info: state.info
});

export default connect(mapStateToProps)(Info);
