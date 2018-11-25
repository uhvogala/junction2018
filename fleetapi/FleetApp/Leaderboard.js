import React, {Component} from "react"
import {StyleSheet, Text, View} from 'react-native';
import constants from "./constants.js"

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
    /*this.setState({
      leaderboard: [
        {position: "1", name: "Bob"},
        {position: "2", name: "Kop"},
        {position: "3", name: "Beeboo buup"}
      ]
    })*/

    const url = `${constants.ENDPOINT}/leaderboards`
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      this.setState({leaderboard: data.eff_kpi.map((driver, i) => ({...driver, position: i+1})), error: false})
    })
    .catch(err => this.setState({error: true}))
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
                <View key={driver.position} style={styles.driverCont}>
                  <Text style={styles.leaderboardDriverPos}>{driver.position}.</Text>
                  <Text style={styles.leaderboardDriverName}>{driver.name}</Text>
                  <Text style={styles.leaderboardDriverScore}>{Math.round(driver.score)}</Text>
                </View>
              ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },

  driverCont: {
    flexDirection: "row",
    paddingVertical: "2%",
    borderBottomWidth: 5,
    borderColor: "#14162c"
  },
  leaderboardDriverName: {
    width: "60%",
    color: "white",
    fontSize: 22,
    textAlign: "left"
  },
  leaderboardDriverPos: {
    width: "20%",
    color: "white",
    fontSize: 22,
    textAlign: "center"
  },
  leaderboardDriverScore: {
    width: "20%",
    color: "white",
    fontSize: 22,
    textAlign: "left"
  }
})

export default Leaderboard
