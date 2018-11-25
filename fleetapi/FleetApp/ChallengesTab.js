import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"

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

})

export default ChallengesTab
