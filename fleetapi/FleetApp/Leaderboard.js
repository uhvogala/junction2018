import React, {Component} from "react"
import constants from "./constants.js"
import {
  //StyleSheet, 
  Text, 
  View
} from 'react-native';

import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  title: {
    fontSize: '2rem',
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
    margin: 5,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#14162c"
  },

  leaderboardDriver: {
    textAlign: "center",
    fontSize: "1.2rem",
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
    fontSize: "1.2rem",
    textAlign: "left"
  },
  leaderboardDriverPos: {
    width: "20%",
    color: "white",
    fontSize: "1.2rem",
    textAlign: "center"
  },
  leaderboardDriverScore: {
    width: "20%",
    color: "white",
    fontSize: "1.2rem",
    textAlign: "left"
  }
});

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderboard: [],
      error: false
    }
  }
  
  componentWillMount() {
    this._mounted = true;
    this.getLeaderboard()
  }

  componentDidMount() {
    this._mounted = true;
    this.interval = setInterval(this.getLeaderboard, 2000);
  }

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this.interval);
  }

  getLeaderboard = () => {
    /*this.setState({
      leaderboard: [
        {position: "1", name: "Bob"},
        {position: "2", name: "Kop"},
        {position: "3", name: "Beeboo buup"}
      ]
    })*/

    const url = `${constants.ENDPOINT}/scoreboard`
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      if (this._mounted){
        this.setState({leaderboard: data.map((driver, i) => ({name: Object.keys(driver)[0], score:  Object.values(driver)[0], position: i+1})).slice(0,4), error: false})
      }
    })
    .catch(err => this.setState({error: true}))
  }

  render() {
    
    const {leaderboard, error} = this.state

    return (
      <View style={styles.cont}>
        <View style={styles.leaderboardCont}>
          <Text style={styles.title}>Leaderboard</Text>
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

export default Leaderboard
