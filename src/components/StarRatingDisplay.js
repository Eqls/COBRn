import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";
import {
  FullStarIcon,
  EmptyStarIcon,
  HalfStarIcon,
  FullChiliIcon,
  EmptyChiliIcon
} from '../assets/images'

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignItems: "center"
  }
});

export const StarRatingDisplay = ({ rating, starSize, chilli, editing, handleChange }) => (
  <View style={styles.container}>
    <StarRating
      disabled={editing ? false : true}
      maxStars={5}
      selectedStar={handleChange}
      fullStar={chilli ? FullChiliIcon : FullStarIcon}
      emptyStar={chilli ? EmptyChiliIcon : EmptyStarIcon}
      halfStar={HalfStarIcon}
      {...{
        rating,
        starSize
      }}
    />
  </View>
);
