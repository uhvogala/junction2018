import React, {Component} from "react"
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

class ChallengesTab extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onSelect, selected } = this.props;

    return (
      <View style={styles.cont}>
        <View style={{width: "50%"}}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => onSelect(0)}
          >
            <Text style={{color: "white"}}>Stats</Text>
          </TouchableOpacity>
          {selected === 0 && <View style={styles.selectedLine}/>}
        </View>
        <View style={{width: "50%"}}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => onSelect(1)}
          >
            <Text style={{color: "white"}}>Challenges</Text>
          </TouchableOpacity>
          {selected === 1 && <View style={styles.selectedLine}/>}
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  cont: {
    flexDirection: "row",
    width: "100%"
  },
  tab: {
    height: 40,
    backgroundColor: "#22233c",
    alignItems: "center",
    justifyContent: "center"
  },
  selectedLine: {
    height: 3,
    width: "100%",
    backgroundColor: "white",
    position: "relative",
    top: -3

  }
})

export default ChallengesTab
