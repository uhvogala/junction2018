import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"
import ChallengeInfo from "./ChallengeInfo"

class CurrentChallenge extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pos: 100
    }
  }

  componentWillMount() {
    setInterval(() => this.setState({pos: Math.max(this.state.pos - 0.5, 0)}), 250)
  }

  render() {

    const {pos} = this.state
    const {challenge} = this.props

    return (
      <View style={styles.cont}>
        <View style={styles.statusBarCont}>
          <Text style={styles.finishText}>Finish</Text>
          <View style={styles.statusBarOuter}>
            <View style={{
              ...styles.statusBarMover,
              top: (pos+5) + "%",
              height: (100 - pos) + "%"
            }} />
            <View style={{
              ...styles.statusBarBall,
              top: (pos) + "%"
            }} />
          </View>
          <Text style={styles.startText}>Start</Text>
        </View>
        <ChallengeInfo challenge={challenge} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    width: "66%",
    flexDirection: "row"
  },
  statusBarCont: {
    width: "15%",
    marginLeft: "5%",
    marginTop: "3%",
    height: "90%",
    alignItems: "center"
    //backgroundColor: "tomato"
  },
  statusBarOuter: {
    position: "absolute",
    height: "100%",
    width: 20,
    marginTop: "5%",
    backgroundColor: "#22233c",
    borderRadius: 5,
    alignItems: "center"
  },
  statusBarMover: {
    width: "100%",
    top: "35%",
    height: "70%",
    backgroundColor: "#30b4bd"
  },
  statusBarBall: {
    position: "absolute",
    borderRadius: 50,
    top: "30%",
    width: 37,
    height: 37,
    backgroundColor: "#30b4bd",
    borderWidth: 1,
    borderColor: "#22233c"
  },

  finishText: {
    color: "white",
    left: 35
  },
  startText: {
    position: "absolute",
    top: "99%",
    right: 0,
    color: "white"
  }
})

export default CurrentChallenge
