import React, {Component} from "react"
import {StyleSheet, Text, View} from 'react-native';

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderboard: [],
      error: false
    }
  }

  componentWillMount() {
    this.getLeaderboard()
  }

  getLeaderboard() {
    this.setState({
      leaderboard: [
        {position: "1", name: "Bob"},
        {position: "2", name: "Kop"}
      ]
    })
    /*fetch("/leaderboard")
    .then(resp => resp.json())
    .then(data => this.setState({leaderboard: data, error: false}))
    .catch(err => this.setState({error: true}))*/
  }

  render() {
    
    const {leaderboard, error} = this.state

    return (
      <View elevation={5} style={styles.cont}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.leaderboardCont}>
          {error 
            ? <Text style={styles.leaderboardDriver}>Couldn't load leaderboards</Text>
            : leaderboard.map(driver => (
                <Text key={driver.position} style={styles.leaderboardDriver}>{driver.position}. {driver.name}</Text>
              ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    height: "50%"
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "200",
    marginTop: 30
  },

  leaderboardCont: {
    marginTop: 20,
    backgroundColor: "white",
    margin: 10,
    marginBottom: 0,
    borderRadius: 4
  },

  leaderboardDriver: {
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 5,
    borderBottomWidth: 1
  }
})

export default Leaderboard
