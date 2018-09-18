import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";
import { FullStarIcon, EmptyStarIcon, HalfStarIcon } from "../assets/images";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignItems: "center"
  }
});

export const StarRatingRow = props => (
  <View style={styles.container}>
    {console.log("props", props)}
    <StarRating
      half={false}
      disabled={false}
      maxStars={5}
      fullStar={FullStarIcon}
      emptyStar={EmptyStarIcon}
      halfStar={HalfStarIcon}
      rating={props.data.mod_score}
      selectedStar={val => {
        props.handleChange(val, props.index);
      }}
      starSize={60}
    />
  </View>
);
