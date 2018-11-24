import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"

class RangeGauge extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      normalRange: 450,
      currentRange: 470,
      totalRange: 490
    }
  }

  componentWillMount() {
    //this.getRanges()
  }

  getRanges() {
    const normalRange = 450
    const currentRange = 470

    const biggestRange = Math.max(normalRange, currentRange)
    const totalRange = biggestRange + (biggestRange * 0.1)

    this.setState({
      normalRange,
      currentRange,
      totalRange
    })

    /*fetch("/abc")
    .then(resp => resp.json())
    .then(data => {
      // Do stuff
      // this.setState({})
    })
    .catch(err => this.setState({error: true}))*/
  }

  render() {

    const {normalRange, currentRange, totalRange} = this.state

    const normalRangePercent = "70%" /*`${(normalRange / totalRange) * 100} %`*/
    const worseRangePercent = "0%" /*currentRange < normalRange 
      ? `${((currentRange / normalRange)) * 100} %` 
      : "0"*/
    const betterRangePercent = "10%" /*currentRange > normalRange 
      ? `${((currentRange / normalRange) - 1) * 100} %`
      : "0"*/

    console.log("PERCENT: ", normalRangePercent, worseRangePercent, betterRangePercent)

    return (
      <View style={styles.cont}>
        <Text style={styles.title}>Range</Text>
        <View style={styles.gaugeOuter}>
          
          <View
            style={{
              ...styles.gaugeInnerNormal,
              width: normalRangePercent
            }}
          />
          <View 
            style={{
              ...styles.gaugeInnerWorse,
              width: worseRangePercent
            }}
          />
          <View 
            style={{
              ...styles.gaugeInnerBetter,
              width: betterRangePercent,
              left: normalRangePercent
            }}
          />
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {

  },
  gaugeOuter: {
    width: "90%",
    marginLeft: "5%",
    height: 20,
    backgroundColor: "white"
  },
  gaugeInnerNormal: {
    position: "absolute",
    //width: "80%",
    height: "100%",
    backgroundColor: "#22233c"
  },
  gaugeInnerWorse: {
    position: "absolute",
    zIndex: 5,
    //width: 0,
    //left: "0%",
    height: "100%",
    backgroundColor: "red"
  },
  gaugeInnerBetter: {
    position: "absolute",
    zIndex: 7,
    //width: "5%",
    //left: "80%",
    height: "100%",
    backgroundColor: "green"
  }
})

export default RangeGauge
