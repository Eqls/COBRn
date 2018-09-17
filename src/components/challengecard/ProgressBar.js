import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#24327B'
  },
  filled: {
    borderRadius: 100,
    backgroundColor: '#8599FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24327B'
  }
});

const ProgressBar = ({ percent }) => (
  <View style={styles.container}>
    <View style={[styles.filled, { width: percent + '%' }]}>
      <Text style={styles.title}>{percent}%</Text>
    </View>
  </View>
)

export default ProgressBar;