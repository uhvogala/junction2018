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
        {/*<Text style={styles.title}>Estimated  bonuses</Text>*/}
        {/*<View style={styles.bonusesCont}>
          <Text style={styles.title2}>Estimated  bonuses</Text>
          {/*<View style={styles.bonusCont}>
            <Text style={styles.bonusText}>Today</Text>
            <Text style={styles.bonusText}>{bonuses.daily ? `${bonuses.daily} €` : "-"}</Text>
          </View>
          {/*<View style={styles.bonusBottomCont}>
            <View style={styles.bonusBottomCont2}>
              <Text style={styles.bonusText}>This month</Text>
              <Text style={styles.bonusText}>{bonuses.monthly ? `${bonuses.monthly} €` : "-"}</Text>
            </View>
            <View style={styles.bonusBottomCont2}>
              <Text style={styles.bonusText}>This year</Text>
              <Text style={styles.bonusText}>{bonuses.yearly ? `${bonuses.yearly} €` : "-"}</Text>
            </View>
          </View>
        </View>*/}
        <Text style={styles.title}>Estimated Bonuses</Text>
        <View style={{...styles.bonusBottomCont2, width: "96%", margin: "2%"}}>
          <Text style={styles.bonusText}>{bonuses.daily ? `${bonuses.daily} €` : "-"}</Text>
          <Text style={styles.bonusText}>Today so far</Text>
        </View>
        <View style={styles.bonusBottomCont}>
            <View style={styles.bonusBottomCont2}>
              <Text style={styles.bonusText}>{bonuses.monthly ? `${bonuses.monthly} €` : "-"}</Text>
              <Text style={styles.bonusText}>This month</Text>
            </View>
            <View style={styles.bonusBottomCont2}>
              <Text style={styles.bonusText}>{bonuses.yearly ? `${bonuses.yearly} €` : "-"}</Text>
              <Text style={styles.bonusText}>This year</Text>
            </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    cont: {
      height: 238
    },
    title: {
      fontSize: 35,
      textAlign: "center",
      fontWeight: "200",
      marginTop: 10,
      color: "white"
    },
    title2: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: "200",
      backgroundColor: "#636eed",
      color: "white",
      paddingVertical: 17,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      color: "white"
    },
  
    bonusesCont: {
      marginTop: 20,
      backgroundColor: "#22233c",
      borderRadius: 4,
      margin: 10,
      borderWidth: 1,
      borderColor: "#ddd"
    },
  
    bonusCont: {
      marginBottom: 10,
      padding: 5
    },

    bonusBottomCont: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around"
    },

    bonusBottomCont2: {
      marginBottom: 10,
      padding: 5,
      width: "45%",
      backgroundColor: "#22233c",
      borderLeftColor: "#636eed",
      borderLeftWidth: 7,
      borderRadius: 4
    },

    bonusText: {
      fontSize: 25,
      marginLeft: 20,
      color: "white"
    }
})

export default DriverBonuses
