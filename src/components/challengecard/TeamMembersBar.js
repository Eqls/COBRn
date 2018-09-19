import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { DefaultAvatar } from '../../assets/images'
import config from "../../config/config";
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  avatar_img: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white'
  },
  avatar: {
    padding: 3
  }
});

isDone = done => done && { borderColor: 'lightgreen' }

const TeamMembersBar = ({ users }) => (
  <View style={styles.container}>
    {console.log(users)}
    {users.map(user =>
      <TouchableOpacity onPress={() => Actions.myprofile({ uid: user.id })} style={styles.avatar}>
        <Image
          style={[styles.avatar_img, isDone(user.done)]}
          source={user.avatar ? { uri: config.PHOTO_URL + user.avatar } : DefaultAvatar}
        />
      </TouchableOpacity>
    )
    }
  </View >
)

export default TeamMembersBar;