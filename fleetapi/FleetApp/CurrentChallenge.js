import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"

class CurrentChallenge extends Component {

  componentWillMount() {
    
  }

  render() {
    return (
      <View style={styles.cont}>
        <View style={styles.statusBarCont}>
          <View style={styles.statuBarOuter}>
            <View style={styles.statusBarMover} />
          </View>
        </View>
        <View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    width: "66%"
  },
  statusBarCont: {
    width: "20%"
  },
  statusBarOuter: {
    height: "90%",
    width: 40,
    marginTop: "5%",
    backgroundColor: "#30b4bd"
  }
})

export default CurrentChallenge
