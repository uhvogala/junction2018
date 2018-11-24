import React from 'react';
import {DeviceEventEmitter, AppRegistry} from 'react-native';
import App from './App';


class FleetBoardApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = { apiData: {} };
  } 

  // The data comes in the form of {name: "VEHICLE_DATAPOINT", returnValue: "RETURN_VALUE"}
  // E.g.: {name: "speed", returnValue: "90.3"}
  handleNewData = (event) => {
    let data = {};
    data[event.name] = event.returnValue;
    const { apiData } = this.state;

    this.setState({apiData: { ...apiData, ...data }});
  }

  componentWillMount = () => {
    // Listens to the onVehicleDataChanged event sent by android activity.
    DeviceEventEmitter.addListener("onVehicleDataChanged", this.handleNewData);
  }

  componentWillUnmount = () => {
    DeviceEventEmitter.removeEventListener("onVehicleDataChanged", this.handleNewData);
  }

  render() {
    return (
      <App apiData={this.state.apiData} />
    );
  }
}

AppRegistry.registerComponent('MyReactNativeApp', () => FleetBoardApp);
