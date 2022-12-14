import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Alert,
    Platform
} from 'react-native';
import axios from "axios";
import MapView, {Marker} from "react-native-maps";

export default class IssLocationScreen extends Component {
    constructor(){
        super(props);
        this.state = {
            location: {}
        }
    }
    componentDidMount(){
        this.getIssLocation();
    }
    render() {
        if (Object.keys(this.state.location).length===0){
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}> <Text>Que isso, meu filho, calma</Text> </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                    <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Heheheh, inutilidades</Text>
                    </View>
                    <View style={styles.localDesign}>
                    <MapView style={styles.cartografia} region={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        latitudeDelta: 100,
                        longitudeDelta: 100
                        }}>
                        <Marker coordinate={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        }}>
                            <Image source={require('../assets/iss_icon.png')}></Image>
                        </Marker>
                    </MapView>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    cartografia: {
        width: "100%",
        height: "100%"
    },
    localDesign: {
        flex: 0.7
    }
})
