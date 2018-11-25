import React, {Component} from "react"
import {Text, View} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import EStyleSheet from "react-native-extended-stylesheet";

var totalValue = 100;

class Gauges extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      drivingScore: 30,
      totalRange: 5000,
      fuelLevel: 1500,
      fuelConsumption: 30
    }
  }

  render() {
    const { fuelConsumption } = this.props.data;
    console.log(this.props.data);
    const drivingScore = (parseInt(fuelConsumption) * 0.33);// + (0.65 * this.props.data.speed);
    let drivingScoreColor = '#14a02e';
    if (drivingScore > 25) drivingScoreColor = '#cac522';
    if (drivingScore > 50) drivingScoreColor = '#ca7d22';
    if (drivingScore > 75) drivingScoreColor = '#e60808';


    return (
      <View style={styles.cont}>
        
        <View style={styles.gaugeCont}>
          <Speedometer value={100 - parseInt(drivingScore) || 0} totalValue={100} style={styles.gauge} 
          internalColor={drivingScoreColor} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} showPercent={false} showLabels={false} />
          <Text style={styles.gaugeTitle}>Driving score</Text>
        </View>

        <View style={styles.gaugeCont}>
          <Speedometer value={100 - parseInt(fuelConsumption) || 0} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} totalValue={100} style={styles.gauge} showPercent={false} internalColor={drivingScoreColor}/>
          <Text style={styles.gaugeTitle}>Fuel efficiency</Text> 
        </View>
        {/*<Text style={styles.gaugeTitle}>Total range</Text>
        <Speedometer value={this.state.totalRange} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} totalValue={5000} style={styles.gauge} showPercent={true} internalColor={this.state.drivingScoreColor}/>
        */}
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  cont: {
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  gaugeTitle: {
    fontSize: '1.2rem',
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