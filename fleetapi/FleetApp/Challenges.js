import React, {Component} from "react"
import {View, Text, Button} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet";

class Challenges extends Component {
  
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
        <Text style={styles.title}>Upcoming challenges</Text>
        <View style={styles.challenge}>
          <Text style={styles.challengeTitle}>Challenge Abc</Text>
          <Text style={styles.challengeText}>In 14.6 km</Text>
          <Button title="Join" color="#30b4bd" onPress={() => null} />
        </View>
        <View style={styles.challenge}>
          <Text style={styles.challengeTitle}>Challenge Öäå</Text>
          <Text style={styles.challengeText}>In 14.6 km</Text>
          <Button title="Join" color="#30b4bd" onPress={() => null} />
        </View>
        <View style={styles.challenge}>
          <Text style={styles.challengeTitle}>Challenge Pööbää</Text>
          <Text style={styles.challengeText}>In 14.6 km</Text>
          <Button title="Join" color="#30b4bd" onPress={() => null} />
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  cont: {
    width: "33%",
    marginLeft: "2%",
    marginTop: "2%"
  },
  title: {
    fontSize: "2rem",
    color: "white",
    paddingVertical: "3%",
    backgroundColor: "#534fc3",
    textAlign: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  challenge: {
    backgroundColor: "#22233c",
    padding: "5%",
    marginBottom: "2%"
  },
  challengeTitle: {
    fontSize: "1.5rem",
    color: "white"
  },
  challengeText: {
    fontSize: "1.2rem",
    color: "white",
    marginBottom: "5%"
  }
})

export default Challenges
