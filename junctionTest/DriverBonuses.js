import React, {Component} from "react"
import {StyleSheet, Text, View} from 'react-native';

class DriverBonuses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bonuses: {},
      error: false
    }
  }

  componentWillMount() {
    this.getBonuses()
  }

  getBonuses() {
    this.setState({
      bonuses: {
        daily: 5,
        monthly: 125,
        yearly: 645
      }
    })
    /*fetch("/bonuses")
    .then(resp => resp.json())
    .then(data => this.setState({bonuses: data, error: false}))
    .catch(err => this.setState({error: true}))*/
  }

  render() {
    
    const {bonuses} = this.state

    return (
      <View style={styles.cont}>
        <Text style={styles.title}>Estimated  bonuses</Text>
        <View style={styles.bonusesCont}>
          <View style={styles.bonusCont}>
            <Text style={styles.bonusText}>Today</Text>
            <Text style={styles.bonusText}>{bonuses.daily ? `${bonuses.daily} €` : "-"}</Text>
          </View>
          <View style={styles.bonusCont}>
            <Text style={styles.bonusText}>This month</Text>
            <Text style={styles.bonusText}>{bonuses.monthly ? `${bonuses.monthly} €` : "-"}</Text>
          </View>
          <View style={styles.bonusCont}>
            <Text style={styles.bonusText}>This year</Text>
            <Text style={styles.bonusText}>{bonuses.yearly ? `${bonuses.yearly} €` : "-"}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    cont: {
      height: "47%",
      backgroundColor: "white",
      borderRadius: 4,
      margin: 10
    },
    title: {
      fontSize: 35,
      textAlign: "center",
      fontWeight: "500",
      marginTop: 30,
      fontFamily: "Roboto"
    },
  
    bonusesCont: {
      marginTop: 20
    },
  
    bonusCont: {
      marginBottom: 10
    },

    bonusText: {
      textAlign: "center",
      fontSize: 25
    }
})

export default DriverBonuses
