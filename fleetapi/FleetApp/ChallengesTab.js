import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"
import Challenges from "./Challenges"
import CurrentChallenge from "./CurrentChallenge"

class ChallengesTab extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      challenges: []
    }
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <View style={styles.cont}>
        <Challenges />
        <CurrentChallenge />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
  }
})

export default ChallengesTab
