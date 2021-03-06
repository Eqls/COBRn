import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  PlayIcon,
  CommentsBg,
  CommentsGuy,
  HomeIcon,
  CommentsIcon,
  CommentCloud,
  CloseIcon
} from './../assets/images'
import { connect } from 'react-redux'
import config from '../config/config'
import { commentActions, userActions } from '../actions'
import { Actions } from 'react-native-router-flux'
import styleConsts from '../constants/styles'

class AddComment extends React.Component {
  state = {
    text: undefined
  }

  onChangeText = text => this.setState({ text })

  submit = () => {
    const { dispatch, auth, item } = this.props
    const { text } = this.state
    if (text) {
      console.log(item)
      this.setState({ text: undefined, submitted: true })
      dispatch(commentActions.create(auth.token, item.user_id, item.id, text))
      Actions.pop()
    } else {
      alert('Please enter your comment first')
    }
  }

  submitChallenge = () => {
    const { submitChallenge } = this.props
    const { text } = this.state
    if (text) {
      submitChallenge(text)
    } else {
      alert('Please enter your submission first!')
    }
  }

  setDone = () => this.setState({ ...this.state, done: true })

  render() {
    const {
      item,
      auth,
      submitChallenge,
      reset,
      isFetching,
      dispatch
    } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => [Actions.pop(), reset ? reset() : null]}
          style={styles.close_wrapper}
        >
          <Image style={styles.close} source={CloseIcon} />
        </TouchableOpacity>
        <View style={styles.input_wrapper}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Schrijf je bericht..."
            autoFocus={true} // focus and show the keyboard
            value={this.state.text}
            onChangeText={this.onChangeText} // handle input changes
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={submitChallenge ? this.submitChallenge : this.submit}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {submitChallenge ? 'Submit' : 'Post'}
          </Text>
          <Image style={styles.button_icon} source={CommentCloud} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'white',
    height: '100%'
  },
  input_wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: styleConsts.cream_blue,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    margin: 10
  },
  button_icon: {
    marginLeft: 5,
    height: 17,
    width: 18
  },
  close_wrapper: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 1
  },
  close: {
    aspectRatio: 0.5,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user,
  isFetching: state.comment.isFetching
})
export default connect(mapStateToProps)(AddComment)
