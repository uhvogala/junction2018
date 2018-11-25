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
        const {challenge, score} = this.props

        return (
            <View style={styles.cont}>
                <Text style={styles.title}>{challenge.name}</Text>
                <Text style={styles.bonusText}>{challenge.description}</Text>
                <Text style={styles.bonusText}>Previous best: {challenge.previousBestValue} by {challenge.previousBestUser}</Text>
                <Text style={styles.bonusText}>Current score: {Math.floor(100 - (score / 10))}</Text>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    cont: {
        width: "70%",
        marginLeft: "7%",
        marginTop: "3%",
        backgroundColor: "#22233c",
        //padding: "3%"
    },
    title: {
        fontSize: '2rem',
        textAlign: "center",
        //paddingVertical: "3%",
        backgroundColor: "#534fc3",
        fontWeight: "200",
        color: "#eee",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    bonusText: {
        fontSize: '1.2rem',
        textAlign: "center",
        marginTop: 20,
        color: "#eee"
    }
})

export default ChallengeInfo