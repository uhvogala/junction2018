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
        {position: "2", name: "Kop"},
        {position: "3", name: "Beeboo buup"}
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
      <View style={styles.cont}>
        <View style={styles.leaderboardCont}>
          <Text style={styles.title2}>Leaderboard</Text>
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
  title2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
    backgroundColor: "#636eed",
    color: "white",
    paddingVertical: 17,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  leaderboardCont: {
    marginTop: 20,
    backgroundColor: "white",
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eee"
  },

  leaderboardDriver: {
    textAlign: "center",
    fontSize: 22,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee"
  }
})

export default Leaderboard
