import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import Leaderboard from './Leaderboard';
import DriverBonuses from "./DriverBonuses"
import Gauges from "./Gauges"


class HelloWorld extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: '60%', backgroundColor: 'powderblue'}}>
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
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('MyReactNativeApp', () => HelloWorld);
