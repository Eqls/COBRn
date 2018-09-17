import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import config from '../config/config';
import { Actions } from 'react-native-router-flux'
import TeamRow from '../components/highcores/TeamRow';
import UserRow from '../components/highcores/UserRow';
import ChallengeRow from '../components/challenges/ChallengeRow';
import {
  HomeIconBlue,
  ChallengesIcon2,
  DefaultChallengeIcon,
  BandFrame
} from '../assets/images'
import styleConsts from '../constants/styles'
import { connect } from 'react-redux'
import { } from '../actions'
import RatingRow from '../components/challengecard/RatingRow';
import TeamProgress from '../components/challengecard/TeamProgress';
import Recording from '../components/challengecard/Recording';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    height: '100%'
  },
  homebar: {
    padding: 15,
    width: "100%"
  },
  header_title: {
    fontSize: 24,
    color: '#010763',
    marginBottom: 15
  },
  description: {
    fontSize: 18,
    color: '#010763',
    marginBottom: 20,
    color: styleConsts.light_blue
  },
  img_frame: {
    height: 121,
    width: 162,
    resizeMode: 'contain'
  },
  icon_wrapper: {
    position: 'absolute',
    top: 3,
    left: 24,
  },
  icon: {
    height: 115,
    width: 115,
  },
  image_container: {
    marginBottom: 15
  },
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 1,
    opacity: .65,
  }
});

class ChallengeCard extends React.Component {

  state = {
    dim: false
  }

  toggleDimmer = () => this.setState({ dim: !this.state.dim })

  render() {
    const { challenge } = this.props
    const { dim } = this.state
    return (
      <View style={styles.container}>
        {dim && <View style={styles.dim} />}
        <TouchableOpacity
          onPress={Actions.pop}
          style={styles.homebar}>
          <Image source={HomeIconBlue} />
        </TouchableOpacity>
        <Text style={styles.header_title}>test</Text>
        <View style={styles.image_container}>
          <Image style={styles.img_frame} source={BandFrame} />
          <View style={styles.icon_wrapper}>
            <Image style={styles.icon} borderRadius={100} source={challenge.avatar ? { uri: config.PHOTO_URL + challenge.avatar } : DefaultChallengeIcon} />
          </View>
        </View>
        <Text style={styles.description}>{challenge.description}</Text>
        <RatingRow rating={challenge.difficulty} />
        <TeamProgress progress={70} />
        <Recording challenge={challenge} toggleDimmer={this.toggleDimmer} />
      </View>
    )
  }
}

const mapStateToProps = state => ({

});


export default connect(mapStateToProps)(ChallengeCard)