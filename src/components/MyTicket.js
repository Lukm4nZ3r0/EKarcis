import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import axios from 'axios';

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
            data: [],
            visible: false,
            paymentName: '' || 'Indomaret',
            paymentImage: '' || 'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png',
            paymentStatus: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get("http://192.168.6.101:7000/ticket",{
            id_user: 1,
            id_tour: 1
        })
        .then((res) => {
            let data = res.data.data;
            let newData = {...data}
            if (data.length < 0) {
                this.setState({ loading: false, isEmpty: true });
            }
            else {
                this.setState({
                    'data': newData[0],
                    loading: false 
                });
            }

            })
            .catch(error => {
                this.setState({ loading: false, error: "something went wrong" });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                { this.state.loading ?
                  <ActivityIndicator size="large" color="#CFD8DC" style={{ marginVertical: 25 }} /> :
                <ScrollView style={{flex:1}}>
                    <View style={{padding:20, borderColor:'#3b366c'}}>
                        <Text style={{ fontSize:21, fontWeight:'bold', color:'#232d42' }}>Total Ticket 2</Text>
                    </View>
                    <View style={{alignItems:'center', flex:1, marginBottom:10 }}>
                        <View style={{ padding: 10, borderRadius:8, width:'90%', alignItems:'center', elevation:2 }}>
                            <View style={{ width:'95%', height:70, alignItems:'center', flexDirection:'row' }}>
                                <Text style={{ fontSize:18,  }}>{ moment(this.state.data.booking_date).format('DD.MM.YYYY') }</Text>
                                <View style={{ flex:1, alignItems:'flex-end' }}>
                                    <Image
                                        style={{ width:100, height:48 }}
                                        source={require('../assets/logo.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ width:'95%', height:40, justifyContent:'center', flexDirection:'row' }}>
                                <Text style={{ fontSize:23, color:'#000', fontWeight:'400' }}>Borobudur Tour</Text>
                            </View>
                            <View style={{ width:'95%', height:160, justifyContent:'center', alignItems:'center', flexDirection:'row', marginBottom:2 }}>
                                <QRCode
                                    size={120}
                                    value={ this.state.data.ticket }
                                />
                            </View>
                            <View style={{ width:'95%', height:50, flexDirection:'row' }}>
                                <Text style={{ fontSize:18,  }}>Name</Text>
                                <View style={{ flex:1, alignItems:'flex-end' }}>
                                    <Text style={{ fontSize:18, color:'#888f98' }}>{this.state.data.name}</Text>
                                </View>
                            </View>
                            <View style={{ width:'95%', height:40, flexDirection:'row' }}>
                                <Text style={{ fontSize:18,  }}>Ticket Expired</Text>
                                <View style={{ flex:1, alignItems:'flex-end' }}>
                                    <Text style={{ fontSize:19, color:'#888f98' }}>{ moment(this.state.data.expaired_date).format('DD.MM.YYYY') }</Text>
                                </View>
                            </View>
                            <View style={{ borderTopWidth:1.5, borderColor:'#cdced2', width:'100%', height:40, justifyContent:'center', alignItems:'center' }}>
                                <TouchableOpacity
                                    style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }}
                                >
                                    <Icon
                                        style={{marginRight:7}}
                                        name='eye-outline'
                                        size={20}
                                        color='#888f98'
                                    />
                                    <Text style={{ fontSize:17, color:'#888f98' }}>Receipt photo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                }
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