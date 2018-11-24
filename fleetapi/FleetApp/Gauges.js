import React, {Component} from "react"
import {StyleSheet, Text, View} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';

var totalValue = 100;

class Gauges extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      drivingScore: 0,
      totalRange: 5000,
      fuelLevel: 1500,
      fuelConsumption: 30
    }
  }

  render() {
    const { fuelConsumption } = this.props;
    const drivingScore = fuelConsumption;
    let drivingScoreColor = '#e60808';
    if (drivingScore > 25) drivingScoreColor = '#ca7d22';
    if (drivingScore > 50) drivingScoreColor = '#cac522';
    if (drivingScore > 75) drivingScoreColor = '#14a02e';


    return (
      <View style={styles.cont}>
        
        <View style={styles.gaugeCont}>
          <Speedometer value={drivingScore || 0} totalValue={5000} style={styles.gauge} 
          internalColor={drivingScoreColor} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} showPercent={false} showLabels={false} />
          <Text style={styles.gaugeTitle}>Driving score</Text>
        </View>

        <View style={styles.gaugeCont}>
          <Speedometer value={fuelConsumption || 0} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} totalValue={60} style={styles.gauge} showPercent={true} internalColor={drivingScoreColor}/>
          <Text style={styles.gaugeTitle}>Fuel consumption</Text> 
        </View>
        {/*<Text style={styles.gaugeTitle}>Total range</Text>
        <Speedometer value={this.state.totalRange} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} totalValue={5000} style={styles.gauge} showPercent={true} internalColor={this.state.drivingScoreColor}/>
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  gaugeTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
    marginTop: "3%",
    color: "#eee",
    marginBottom: 10
  },

  gaugeCont: {
    marginTop: "5%",
    width: "50%",
    alignItems: "center"
  },

  leaderboardDriver: {
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 5,
    borderBottomWidth: 1
  },
  gauge: {
    //marginLeft: '35%'
  }
})

export default Gauges