import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './utils'
import { Router, Scene, Actions } from 'react-native-router-flux'
import Login from './screens/Login'
import Home from './screens/Home'
import HighScores from './screens/HighScores';
import Challenges from './screens/Challenges';
import MyTeam from './screens/MyTeam';
import Comments from './screens/Comments';
import MyProfile from './screens/MyProfile';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene hideNavBar key="root">
            <Scene
              key="main"
              component={Login}
              title="Login"
              initial
            />
            <Scene
              key="home"
              component={Home}
              title="Home"
            />
            <Scene
              key="highscores"
              component={HighScores}
              title="High Scores"
              swipeEnabled
            />
            <Scene
              key="myprofile"
              component={MyProfile}
              title="My Profile"
              swipeEnabled
            />
            <Scene
              key="challenges"
              component={Challenges}
              title="Challenges"
              swipeEnabled
            />
            <Scene
              key="myteam"
              component={MyTeam}
              title="My Team"
              swipeEnabled
            />
            <Scene
              key="comments"
              component={Comments}
              title="Comments"
              swipeEnabled
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
