import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import Leaderboard from './Leaderboard';
import DriverBonuses from "./DriverBonuses"
import Gauges from "./Gauges"


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
        <View style={{width: '60%', backgroundColor: "#14162c"}}>
          <Gauges />
        </View>

        <View style={{flex: 1, flexDirection: "column", width: "40%", backgroundColor: "#14162c"}}>
          <Leaderboard data={this.state.apiData}/>
          <DriverBonuses data={this.state.apiData}/>
        </View>

        {/*<View style={{width: '50%', backgroundColor: 'skyblue'}}>
          <View style={{height: '50%', backgroundColor: 'red'}}>
            <Text style={styles.instructions}>To g1234567et staradsdsadsated, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}dsdssddrrrs</Text>
          </View>
          <View style={{height: '50%', backgroundColor: 'green'}}>
            <Text style={styles.instructions}>To g1234567et staradsdsadsated, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}dsdssddrrrs</Text>
          </View>
        </View>*/}
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
