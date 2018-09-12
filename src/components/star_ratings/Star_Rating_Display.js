import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignItems: "center"
  },
  border: {
    color: "purple",
    fontSize: 12
  },
  text: {
    color: "black",
    fontSize: 16
  }
});

export const StarRatingDisplay = props => (
  <View style={styles.container}>
    {/* {console.log(props.data)} */}
    <StarRating
      disabled={true}
      maxStars={5}
      rating={props.rating}
      starSize={props.size}
      fullStar={require("./../../assets/images/star.png")}
      emptyStar={require("./../../assets/images/inactive_star.png")}
      halfStar={require("./../../assets/images/half_star.png")}
    />
  </View>
);
