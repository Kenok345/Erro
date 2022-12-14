import axios from 'axios';
import React, { Component } from 'react';
import { Text, View,Alert } from 'react-native';

export default class MeteorScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            meteors: {}
        }
    }
    getMeteors = () => {
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=99HSk4HdsFsC66smJGgfXUlfs5dPWGqfefrp2GW7")
        .then(response =>{
            this.setState({meteoros: response.data.near_earth_objects})
        })
        .catch(error =>{
            Alert.alert(error.message)
        });
    }
    ComponentDidMount(){this.getMeteors()};
    render() {
        if(Object.keys(this.state.meteors).length === 0){
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Q isso meu filho calma</Text>
            </View>
        )}
        else{
            let meteor_array = Object.keys(this.state.meteors).map(meteor_date =>{
                return this.state.meteors[meteor_date]
            })
            let meteor = [].concat.apply([], meteor_array);
            meteor.forEach(function(element){
                let diametroemingles = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diametroemingles / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            })
        }
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Meteoros, a tela</Text>
            </View>
        )
    }
}