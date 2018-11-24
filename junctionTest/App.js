/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Leaderboard from './Leaderboard';
import DriverBonuses from "./DriverBonuses"
import Gauges from "./Gauges"
import RangeGauce from './RangeGauge';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: ""
    }
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: '60%', backgroundColor: "#14162c"}}>
            <Gauges />
            <RangeGauce />
          </View>

          <View style={{flex: 1, flexDirection: "column", width: "40%", backgroundColor: "#14162c"}}>
            <Leaderboard />
            <DriverBonuses />
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
