import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"

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
        <Text>Upcoming challenges</Text>
        <View>
          <Text>Challenge Abc</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default Challenges
