import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"
import Challenges from "./Challenges"
import CurrentChallenge from "./CurrentChallenge"

class ChallengesTab extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      challenges: [
        {
          name: "Daily Fuel Efficiency Challenge",
          description: "Drive as efficiently as possible.\nScore is ratio between fuel consumption and distance traveled.",
          previousBestUser: "John",
          previousBestValue: 5,
          distance: "14.6"
        },
        {
          name: "Daily Safe Driving Challenge",
          description: "Drive as safely as possible.",
          previousBestUser: "Bobo",
          previousBestValue: 8,
          distance: "142.6"
        }
      ],
      currentIndex: 0
    }
  }

  changeChallenge = (index) => {
    this.setState({currentIndex: index})
  }

  render() {

    const {challenges, currentIndex} = this.state

    return (
      <View style={styles.cont}>
        <Challenges challenges={challenges} changeChallenge={this.changeChallenge} />
        <CurrentChallenge challenge={challenges[currentIndex]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    flexDirection: "row"
  }
})

export default ChallengesTab
