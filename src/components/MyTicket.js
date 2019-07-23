import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Payment extends Component {
    
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#64BA5A',
        },  
        headerTintColor: '#fff',
        title: 'MY TICKET',
    }

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            visible: false,
            paymentName: '' || 'Indomaret',
            paymentImage: '' || 'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png',
            paymentStatus: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={{padding:20, borderColor:'#3b366c'}}>
                        <Text style={{ fontSize:20, fontWeight:'bold' }}>Total Ticket 2</Text>
                    </View>
                    <View style={{alignItems:'center', borderColor:'#3b366c'}}>
                        <View style={{ padding: 10, elevation:2, width:'92%' }}>
                            <Text style={{ fontSize:20, fontWeight:'bold' }}>Total Ticket 2</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    },

    modal:{
        height: 320,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    }

});