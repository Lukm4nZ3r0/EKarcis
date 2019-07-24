import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

export default class CheckOut extends Component {
    
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#64BA5A',
        },  
        headerTintColor: '#fff',
        title: 'CheckOut',
    }

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            visible: false,
            paymentName: '' || 'Bank BNI',
            paymentImage: '' || 'https://um.undip.ac.id/uploads/filemanager/bni.png'
        }
    }

    componentDidMount = () => {
        let data = this.props.navigation.state.params;
        this.setState({ 'data': data})
    }

    formatNumber = num => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    handleCancel= () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to cancel this tour Ticket',
            [
              {
                text: 'Cancel',
                onPress: () => console.warn('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <View style={{justifyContent:'flex-start', alignItems:'center', height: 200, borderColor:'#3b366c'}}>
                        <Image
                            style={{width: '100%', height:200}}
                            source={{uri: 'https://paketwisatajogja75.com/wp-content/uploads/2018/09/PAKET-STUDY-TOUR-DESA-TEMBI-JOGJA-3HARI-2MALAM-START-SORE.jpg'}}
                        />
                    </View>
                    <View style={{justifyContent:'center', flex:1, flexDirection:'row', marginTop:-67, marginBottom:10}}>
                        <Image
                            style={{width:150, height:135, borderRadius:50}}
                            source={{uri: 'https://lh3.googleusercontent.com/RYRLpIXtT_kAAKh3ki-774owiRx3UvwFBjVASJTdPr27rSRtl2Grsc2FrhiLRkjPCg'}}
                        />  
                    </View>
                    <View style={{alignItems:'center', marginBottom:18}}>
                        <Text numberOfLines={1} style={{fontSize:20, marginBottom:2, color:'#595653'}}>
                            
                        </Text>
                        <Text numberOfLines={1} style={{fontSize:16, marginBottom:10,}}>
                            {this.state.data.id_transaction}
                        </Text>
                        <Text numberOfLines={1} style={{fontSize:25, marginBottom:2, color:'#595653'}}>
                            Rp. {this.formatNumber(80000)}
                        </Text>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                Name
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}>
                                    {this.state.data.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                Ticket Amount
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}>
                                    x {this.state.data.ticket_amount}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                Booking Date
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}>
                                    {moment(this.state.booking_date).format('dddd, DD MMMM YYYY')}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{fontSize:17, marginBottom:13,}}>
                                Coins Bonus
                            </Text>
                            <View style={{ flex:1, justifyContent:'flex-end', flexDirection:'row' }}>
                                <Icon
                                    style={{marginRight:5}}
                                    name='coins'
                                    size={22}
                                    color='green'
                                />
                                <Text numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}>
                                    {this.state.data.coins_bonus}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', height: 170, justifyContent:'center', alignItems:'center' }}>
                            <Text style={{ fontSize:35, fontWeight:'bold' }}>NO REK</Text>
                            <Text style={{ fontSize:30, fontWeight:'bold' }}>{this.state.data.va}</Text>
                            <Text style={{ fontSize:25, fontWeight:'bold' }}>{this.state.data.payment_display_name}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', borderBottomWidth:2, borderBottomLeftRadius:10, borderBottomRightRadius:10, borderColor:'#e8e8e6' }}>
                        <View style={{ width:'93%' }}>
                            <TouchableOpacity
                                style={{ flexDirection:'row', borderTopLeftRadius:10, borderTopRightRadius:10, padding:8, elevation:1, backgroundColor:'#009bf4', alignItems:'center'}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>{this.state.paymentName}</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: this.state.paymentImage}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.state.data.total_price}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex:1, alignItems:'center', marginTop:7 }}>
                        <View style={{ width:'90%', height:45, alignItems:'center', justifyContent:'center', paddingTop:5, marginBottom:20, flexDirection:'row' }}>
                            <TouchableOpacity 
                                onPress={this.handleCancel}
                                style={{ flex:1, padding:5, paddingHorizontal:20, borderColor:'#64BA5A', borderWidth:1, justifyContent:'center', borderRadius:5, marginRight:20 }}
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <View style={{ flex:1 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('help')} 
                                    style={{ height:40, padding:5, paddingHorizontal:20, backgroundColor:'#55c843', justifyContent:'center', alignItems:'center', borderRadius:5}}
                                >
                                    <Text>HOW TO TRANSACT</Text>
                                </TouchableOpacity>
                            </View>
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