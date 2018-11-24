import React, {Component} from "react"
import {
  //StyleSheet, 
  Text, 
  View
} from 'react-native';

import EStyleSheet from "react-native-extended-stylesheet";

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

const styles = EStyleSheet.create({
  cont: {
    
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "200",
    marginTop: "7%"
  },
  title2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
    backgroundColor: "#534fc3",
    color: "white",
    paddingVertical: "3%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  leaderboardCont: {
    marginTop: "4%",
    backgroundColor: "#22233c",
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#14162c"
  },

  leaderboardDriver: {
    textAlign: "center",
    fontSize: 22,
    paddingVertical: "2%",
    borderBottomWidth: 5,
    borderColor: "#14162c",
    color: "white"
  }
});

export default Leaderboard
