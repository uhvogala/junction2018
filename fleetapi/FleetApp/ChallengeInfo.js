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
        const {challenge} = this.props

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
        width: "70%",
        marginLeft: "5%",
      marginTop: "3%",
      backgroundColor: "#22233c",
      padding: "3%"
    },
    title: {
      fontSize: '2rem',
      textAlign: "center",
      fontWeight: "200",
      color: "#eee"
    },
    bonusText: {
      fontSize: '1.2rem',
      textAlign: "center",
      marginTop: 20,
      color: "#eee"
    }
})

export default ChallengeInfo