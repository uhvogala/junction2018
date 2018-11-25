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
import ChallengesTab from "./ChallengesTab";
import Challenges from "./Challenges";
import ChallengeInfo from './ChallengeInfo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 0};
  }

  onTabSelect = (tab) => {
    this.setState({selectedTab: tab})
  }

  render() {
    const { apiData } = this.props;
    const { selectedTab } = this.state;

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <View style={{width: '70%', backgroundColor: "#14162c"}}>
          <ChallengesTab 
            selected={selectedTab}
            style={{height: 40, width: '100%'}} onSelect={this.onTabSelect} />
          {selectedTab === 0 &&
            <View><Gauges data={apiData} />
            <RangeGauge data={apiData} /></View>
          }
          {selectedTab === 1 &&
            <Challenges />
          }
        </View>
        <View style={{flex: 1, flexDirection: "column", width: "29%", paddingRight: "1%", backgroundColor: "#14162c"}}>  
          <Leaderboard data={apiData}/>
          <DriverBonuses data={apiData}/>
        </View>
        {/*<View style={{backgroundColor: "#14162c"}}>
          <ChallengeInfo />
      </View>*/}
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