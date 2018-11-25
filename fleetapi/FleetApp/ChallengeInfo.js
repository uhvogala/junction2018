import React, {Component} from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

class ChallengeInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            challenge: {}
        }
    }
    
    componentWillMount() {
        this.getChallengeInfo();
    }

    getChallengeInfo() {
        this.setState({
            challenge: {
                name: "Daily Fuel Efficiency Challenge",
                description: "Drive as efficiently as possible.\nScore is ratio between fuel consumption and distance traveled.",
                previousBestUser: "John",
                previousBestValue: 5
            }
        })
    }

    render() {
        const {challenge} = this.state

        return (
            <View style={styles.cont}>
                <Text style={styles.title}>{challenge.name}</Text>
                <Text style={styles.bonusText}>{challenge.description}</Text>
                <Text style={styles.bonusText}>Previous best: {challenge.previousBestValue} by {challenge.previousBestUser}</Text>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    cont: {
      marginTop: "5%"
    },
    title: {
      fontSize: '2rem',
      textAlign: "center",
      fontWeight: "200",
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      color: "#eee"
    },
    bonusText: {
      fontSize: '1.2rem',
      textAlign: "center",
      marginLeft: 10,
      marginRight: 10,
      color: "#eee"
    }
})

export default ChallengeInfo