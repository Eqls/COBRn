import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './utils'
import { Router, Scene, Actions } from 'react-native-router-flux'
import Login from './screens/Login'
import Home from './screens/Home'
import HighScores from './screens/HighScores'
import GroupCard from './screens/GroupCard'
import MyTeam from './screens/MyTeam'
import Comments from './screens/Comments'
import MyProfile from './screens/MyProfile'
import EditProfile from './screens/EditProfile'
import { connect } from 'react-redux'
import { auth } from './actions/'
import AllTeams from './screens/AllTeams'
import ChallengeCard from './screens/ChallengeCard'
import Success from './screens/Success'
import AddComment from './screens/AddComment'
import RatingPage from './screens/RatingPage'
import Info from './screens/Info'
import GroupedChallenges from './screens/GroupedChallenges'
import Message from './screens/Message'

class App extends React.Component {
  componentDidMount() {
    AsyncStorage.getItem('jwt')
      .then(token => {
        if (token) {
          store.dispatch(auth.validate(token))
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene hideNavBar key="root">
            <Scene key="main" component={Login} title="Login" initial />
            <Scene key="home" component={Home} title="Home" />
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
              key="editprofile"
              component={EditProfile}
              title="Edit Profile"
              swipeEnabled
            />
            <Scene
              key="groupcard"
              component={GroupCard}
              title="Group Card"
              swipeEnabled
            />
            <Scene
              key="groupedchallenges"
              component={GroupedChallenges}
              title="Grouped Challenges"
              swipeEnabled
            />
            <Scene
              key="challengecard"
              component={ChallengeCard}
              title="Challenge Card"
              swipeEnabled
            />
            <Scene
              key="success"
              component={Success}
              title="Success"
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
            <Scene
              key="addcomment"
              component={AddComment}
              title="Add Comment"
              swipeEnabled
            />
            <Scene
              key="message"
              component={Message}
              title="Message"
              swipeEnabled
            />
            <Scene
              key="allteams"
              component={AllTeams}
              title="All Teams"
              swipeEnabled
            />
            <Scene
              key="ratingpage"
              component={RatingPage}
              title="Rating Page"
              swipeEnabled
            />
            <Scene
              key="infopage"
              component={Info}
              title="Info Page"
              swipeEnabled
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
