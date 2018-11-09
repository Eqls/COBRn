import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { SuccessBg, HomeIconBlue } from '../assets/images'
import styleConsts from '../constants/styles'
import ChallengeReplayOptions from '../components/ChallengeReplayOptions'
import { Player, MediaStates } from 'react-native-audio-toolkit'
import ImageView from 'react-native-image-view'
import { connect } from 'react-redux'
import config from '../config/config'

export class Success extends React.Component {
  state = {
    displayImage: false,
    width: 0,
    height: 0
  }

  componentDidMount() {
    let { item, empty } = this.props
    if (item && item.recording_type === 'image') {
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
    const { item, isFetching } = this.props
    const { displayImage, height, width } = this.state
    return (
      <View style={{ flex: 1 }}>
        {isFetching || !item ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color="#FECB45" />
          </View>
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
            <View style={styles.container}>
              <ImageBackground
                resizeMode={'cover'}
                aspectRatio={0.5}
                style={styles.main}
                source={SuccessBg}
              >
                <TouchableOpacity onPress={Actions.pop} style={styles.homebar}>
                  <Image source={HomeIconBlue} />
                </TouchableOpacity>
                <ChallengeReplayOptions
                  big
                  handleAction={this.handleAction}
                  text={item.recording_type === 'text'}
                  audio={item.recording_type === 'audio'}
                  image={item.recording_type === 'image'}
                />
              </ImageBackground>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: 'none',
                      borderWidth: 1,
                      borderColor: styleConsts.cream_yellow
                    }
                  ]}
                  onPress={Actions.pop}
                >
                  <Text style={styles.text}>Opnieuw?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Actions.home}>
                  <Text style={styles.text}>Afronden</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    height: '100%'
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: styleConsts.cream_yellow,
    padding: 12,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10
  },
  text: {
    fontWeight: 'bold',
    color: styleConsts.cream_blue
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  homebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 15
  }
})

const mapStateToProps = state => ({
  item: state.recording.current,
  isFetching: state.recording.isFetching
})

export default connect(mapStateToProps)(Success)
