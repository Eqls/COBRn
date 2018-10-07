import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";

const Hint = ({ hint }) => {
  return (
    <View>
      <Text>{hint}</Text>
    </View>
  );
};

export default Hint;
