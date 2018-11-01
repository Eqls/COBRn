import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import StarRating from 'react-native-star-rating'
import {
  FullStarIcon,
  EmptyStarIcon,
  HalfStarIcon,
  FullChiliIcon,
  EmptyChiliIcon
} from '../assets/images'

class StarRatingDisplay extends React.Component {
  state = {
    selection: 0
  }

  changeRating = selection => {
    let { handleChange } = this.props
    this.setState({ selection })
    Alert.alert(
      'Confirmation',
      `Are you sure you want to rate this recording ${selection} stars?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleChange(selection) }
      ],
      { cancelable: true }
    )
  }

  componentDidMount() {
    let { rating } = this.props
    if (rating) this.setState({ selection: rating })
  }

  render() {
    let { rating, starSize, chilli, editing, handleChange } = this.props
    let { selection } = this.state
    return (
      <StarRating
        containerStyle={{ justifyContent: 'flex-start' }}
        disabled={editing ? false : true}
        maxStars={5}
        selectedStar={this.changeRating}
        fullStar={chilli ? FullChiliIcon : FullStarIcon}
        emptyStar={chilli ? EmptyChiliIcon : EmptyStarIcon}
        halfStar={HalfStarIcon}
        rating={selection}
        {...{ starSize }}
      />
    )
  }
}

export default StarRatingDisplay
