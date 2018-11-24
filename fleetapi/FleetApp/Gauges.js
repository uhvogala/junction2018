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
      fuelConsumption: 30,
      drivingScoreColor: '#47e4c2'
    }
  }

  componentWillMount() {
    setInterval(() => this.setDrivingScore(), 1);
    setInterval(() => this.setFuelConsumption(), 100);
    setInterval(() => this.setTotalRange(), 300);

  }

  setDrivingScore(){
   
    this.setState({
      drivingScore: this.state.totalRange - this.state.fuelConsumption 
    })


    // if(this.state.drivingScore >= 0){
    //   this.setState({
    //     drivingScore: this.state.drivingScore + 1 //Math.random() * 50
    //   })
    // }
    // else{
    //   this.setState({
    //     drivingScore: 0 //Math.random() * 50
    //   })
    // }

    // set colors

    //red
    this.setState({
      drivingScoreColor: '#e60808'
    })

    // orange
    if(this.state.drivingScore > 25){
      this.setState({
        drivingScoreColor: '#ca7d22'
      })
    }

    // yellow
    if(this.state.drivingScore > 50){
      this.setState({
        drivingScoreColor: '#cac522'
      })
    }

    // green
    if(this.state.drivingScore > 75){
      this.setState({
        drivingScoreColor: '#30b4bd'
      })
    }
  }

  setFuelConsumption(){
    if(this.state.fuelConsumption < 100){
      this.setState({
        fuelConsumption: this.state.fuelConsumption - Math.floor(Math.random()*(4-(-4)+1)+(-4))
      })
    }
    else if(this.state.fuelConsumption < 0){
      this.setState({
        fuelConsumption: 30
      })
    }
    else{
      this.setState({
        fuelConsumption: 30 //Math.random() * 50
      })
    }

    // set colors

    // //red
    // this.setState({
    //   drivingScoreColor: '#e60808'
    // })

    // // orange
    // if(this.state.drivingScore > 25){
    //   this.setState({
    //     drivingScoreColor: '#ca7d22'
    //   })
    // }

    // // yellow
    // if(this.state.drivingScore > 50){
    //   this.setState({
    //     drivingScoreColor: '#cac522'
    //   })
    // }

    // // green
    // if(this.state.drivingScore > 75){
    //   this.setState({
    //     drivingScoreColor: '#14a02e'
    //   })
    // }
  }

  setTotalRange(){
    this.setState({
      totalRange: this.state.fuelLevel / (this.state.fuelConsumption / 100)
    })
  }




  render() {
    return (
      <View style={styles.cont}>
        
        <View style={styles.gaugeCont}>
          <Speedometer value={this.state.drivingScore} totalValue={5000} style={styles.gauge} 
          internalColor={this.state.drivingScoreColor} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} showPercent={false} showLabels={false} />
          <Text style={styles.gaugeTitle}>Driving score</Text>
        </View>

        <View style={styles.gaugeCont}>
          <Speedometer value={this.state.fuelConsumption} innerColor={"#14162c"} outerColor={"#22233c"} percentStyle={{ color: '#eee' }} totalValue={60} style={styles.gauge} showPercent={true} internalColor={this.state.drivingScoreColor}/>
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