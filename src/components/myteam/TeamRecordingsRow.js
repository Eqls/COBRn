import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import { CommentIcon, PlayIcon } from '../../assets/images'
import config from './../../config/config'
import { Actions } from 'react-native-router-flux'
import { Player, MediaStates } from 'react-native-audio-toolkit'
import ChallengeReplayOptions from '../ChallengeReplayOptions'
import ImageView from 'react-native-image-view'

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
  }
})

class TeamRecordingsRow extends React.Component {
  state = {
    displayImage: false,
    width: 0,
    height: 0
  }

  componentDidMount() {
    let { item, empty } = this.props
    if (!empty && item.recording_type === 'image') {
      Image.getSize(item.path_to_recording, (width, height) => {
        this.setState({ width, height })
      })
    }
  }

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
  render() {
    const { displayImage, width, height } = this.state
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
            <Text style={styles.title}>{item.recording_name}</Text>
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
