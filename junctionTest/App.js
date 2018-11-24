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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: '60%', backgroundColor: "#eee"}}>
            <Text style={styles.welcome}>INSERT TITLE HERE</Text>
            <Text style={styles.instructions}>KPI GOES IN HERE</Text>
            <Gauges />
          </View>

          <View style={{flex: 1, flexDirection: "column", width: "40%", backgroundColor: "#eee"}}>
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
