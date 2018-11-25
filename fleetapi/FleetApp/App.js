import React from 'react';
import { 
  Platform, 
  StatusBar, 
  //StyleSheet, 
  View, 
  //Text 
} from 'react-native';
import Leaderboard from './Leaderboard';
import DriverBonuses from "./DriverBonuses";
import Gauges from "./Gauges";
import RangeGauge from "./RangeGauge";
import EStyleSheet from "react-native-extended-stylesheet";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    const { apiData } = this.props;

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <View style={{width: '70%', backgroundColor: "#14162c"}}>
          <Gauges data={apiData} />
          <RangeGauge data={apiData} />
        </View>
        {/* Just an example on how to use values, remove this when actually implemented */}
        {/*<View style={styles.container}>
          <Text style={{color: "#ffffff"}}>Current speed: {apiData.speed} km/h</Text>
        </View>*/}
        <View style={{flex: 1, flexDirection: "column", width: "29%", paddingRight: "1%", backgroundColor: "#14162c"}}>  
          <Leaderboard data={apiData}/>
          <DriverBonuses data={apiData}/>
        </View>
      </View>
    );
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

EStyleSheet.build({
  '@media (max-width: 500': {
    $fontSize: '12px'
  },
  '@media (min-width: 1500)': {
    $fontSize: '24px'
}});