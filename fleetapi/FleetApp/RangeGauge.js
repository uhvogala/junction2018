import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"

class RangeGauge extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      normalRange: 400,
      currentRange: 440,
      totalRange: 460
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

    const rangeBetterThanNormal = currentRange > normalRange

    const normalRangePercent = `${Math.floor((normalRange / totalRange) * 100)}%`
    const worseRangePercent = !rangeBetterThanNormal
      ? `${Math.floor((currentRange / normalRange) * 100)}%` 
      : "0%"
    const betterRangePercent = rangeBetterThanNormal
      ? `${Math.floor(((currentRange / normalRange) - 1) * 100)}%`
      : "0%"


    const normalRangeTextPercent = Math.floor((normalRange / totalRange) * 100) - 3
    const currentRangeTextPercent = Math.floor((currentRange / totalRange) * 100) - 2

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

        <View style={styles.textCont}>
          <Text 
            style={{
              ...styles.rangeText,
              position: "absolute",
              left: `${normalRangeTextPercent}%`
            }}
          >Normal</Text>
          <Text 
            style={{
              ...styles.rangeText,
              position: "absolute",
              left: `${currentRangeTextPercent}%`,
              top: Math.abs(currentRangeTextPercent - normalRangeTextPercent) < 8
                ? 15
                : 0
            }}
          >Current</Text>
        </View>
        
        <View style={styles.feedbackCont}>
          <Text style={styles.feedbackText}>{rangeBetterThanNormal
            ? "Estimated fuel range is higher than normal. Good job!"
            : "Estimated fuel range is lower than normal."
          }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    marginTop: "5%"
  },
  gaugeOuter: {
    width: "80%",
    marginLeft: "10%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 3
  },
  gaugeInnerNormal: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#22233c",
    borderRightWidth: 2,
    borderColor: "white"
  },
  gaugeInnerWorse: {
    position: "absolute",
    zIndex: 5,
    height: "100%",
    backgroundColor: "#ed2059"
  },
  gaugeInnerBetter: {
    position: "absolute",
    zIndex: 7,
    height: "100%",
    backgroundColor: "#30b4bd"
  },

  textCont: {
    width: "80%",
    marginLeft: "10%",
    height: 35,
    marginTop: 5
  }, 
  rangeText: {
    color: "white"
  },
  feedbackCont: {
    alignItems: "center"
  },
  feedbackText: {
    color: "white",
    fontSize: 20
  }
})

export default RangeGauge
