import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import Leaderboard from './Leaderboard';
import DriverBonuses from "./DriverBonuses"
import Gauges from "./Gauges"
import RangeGauge from './RangeGauge';


class HelloWorld extends React.Component {
  constructor (props) {
    super(props);
    this.state = { apiData: {} };
  } 

  handleNewData = (event) => {
    let data = {};
    data[event.name] = event.returnValue;
    const { apiData } = this.state;

    this.setState({apiData: { ...apiData, ...data }});
  }

  componentWillMount = () => {
    //addEventListener();
  }

  componentWillUnmount = () => {
    //removeEventListener();
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: '65%', backgroundColor: "#14162c"}}>
          <Gauges />
          <RangeGauge />
        </View>

        <View style={{flex: 1, flexDirection: "column", width: "34%", paddingRight: "1%", backgroundColor: "#14162c"}}>
          <Leaderboard data={this.state.apiData}/>
          <DriverBonuses data={this.state.apiData}/>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('MyReactNativeApp', () => HelloWorld);
