import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import { CommentIcon, PlayIcon, FullStarIcon } from '../../assets/images'
import config from './../../config/config'
import { Actions } from 'react-native-router-flux'
import { Player, MediaStates } from 'react-native-audio-toolkit'
import ChallengeReplayOptions from '../ChallengeReplayOptions'
import ImageView from 'react-native-image-view'
import styleConsts from '../../constants/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import StarRatingDisplay from '../StarRatingDisplay'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  title: {
    flex: 3,
    color: '#010763',
    fontWeight: 'bold'
  },
  comment_icon: {
    aspectRatio: 1.25,
    paddingBottom: 2,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  play_icon: {
    marginTop: -10,
    marginBottom: -10,
    aspectRatio: 0.5,
    resizeMode: 'contain'
  },
  rate: { padding: 3, backgroundColor: styleConsts.gold }
})

class TeamRecordingsRow extends React.Component {
  state = {
    displayImage: false,
    width: 0,
    height: 0,
    showStars: false
  }

  componentDidMount() {
    let { item, empty } = this.props
    if (!empty && item.recording_type === 'image') {
      Image.getSize(item.path_to_recording, (width, height) => {
        this.setState({ width, height })
      })
    }
  }

  toggleStars = () => this.setState({ showStars: !this.state.showStars })

  handleAction = actionType => {
    const { item } = this.props
    switch (actionType) {
      case 'audio':
        return new Player(config.PHOTO_URL + item.path_to_recording).play()
      case 'image':
        return this.setState({ displayImage: true })
      case 'text':
        return Actions.message({ text: item.text_input })
    }
  }

  attachUIDBeforeSubmit = val => {
    this.props.updateRecording(val, this.props.item.id)
    this.props.getRecordings()
  }

  render() {
    const { displayImage, width, height, showStars } = this.state
    const { item, empty, handleAction } = this.props
    return (
      <View style={styles.container}>
        {empty ? (
          <Text style={styles.title}>Geen data gevonden.</Text>
        ) : (
          <>
            {item.recording_type === 'image' && (
              <ImageView
                images={[
                  {
                    source: {
                      uri: config.PHOTO_URL + item.path_to_recording
                    },
                    width,
                    height
                  }
                ]}
                imageIndex={0}
                isVisible={displayImage}
              />
            )}
            {showStars ? (
              <View style={{ flex: 3 }}>
                <StarRatingDisplay
                  starSize={30}
                  rating={item.rating}
                  editing={item.rating === 0}
                  handleChange={this.attachUIDBeforeSubmit}
                />
              </View>
            ) : (
              <Text style={styles.title}>{item.recording_name}</Text>
            )}
            <TouchableOpacity
              // disabled={disabled}
              onPress={this.toggleStars}
              style={{ maringLeft: 5, marginRight: 5 }}
            >
              <Icon
                style={{
                  padding: 5,
                  paddingLeft: 6,
                  paddingRight: 6,
                  borderRadius: 50,
                  backgroundColor: showStars ? '#137BD1' : styleConsts.gold,
                  fontSize: 14,
                  color: showStars ? styleConsts.gold : '#137BD1'
                }}
                name="star"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingRight: 10, paddingLeft: 10 }}
              onPress={() => Actions.comments({ item })}
            >
              <ImageBackground style={styles.comment_icon} source={CommentIcon}>
                <Text style={{ fontSize: 12 }}>{item.number_of_comments}</Text>
              </ImageBackground>
            </TouchableOpacity>
            <ChallengeReplayOptions
              handleAction={this.handleAction}
              text={item.recording_type === 'text'}
              audio={item.recording_type === 'audio'}
              image={item.recording_type === 'image'}
            />
          </>
        )}
      </View>
    )
  }
}

export default TeamRecordingsRow
