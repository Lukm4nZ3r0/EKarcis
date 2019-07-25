import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, AsyncStorage, } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

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
            isEmpty: false,
            loading: true,
            visible: false,
            paymentName: '' || 'Indomaret',
            paymentImage: '' || 'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png',
            paymentStatus: false,
            transactionId : this.props.navigation.state.params.id_transaction,
            tour: '',
            idUser: 0,
            name_booking: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async() => {
        await AsyncStorage.getItem('idUser', (error, result) => {
            if(result) {
                console.warn('ini respon', result)
                this.setState({ idUser: result })
            }
        })
        axios.get("http://52.27.82.154:7000/ticket?id_transaction="+this.state.transactionId)
        .then((res) => {
            let user = res.data.data.data_ticket[0]
            if(user.id_user == this.state.idUser){
                this.setState({ name_booking: user.name_booking, tour: user.tour })
                let data = res.data.data.ticket;
                if (data.length < 0) {
                    this.setState({ loading: false, isEmpty: true });
                }
                else {
                    this.setState({
                        'data': data,
                        loading: false,
                        isEmpty: false
                    });
                }
            }
            else{
                this.setState({ loading: false, isEmpty: true });
            }
        })
        .catch(error => {
            this.setState({ loading: false, isEmpty: true });
        })
    }

    render() {
        if (this.state.isEmpty){
            return(
                <React.Fragment>
                    <View style={{flex:2, backgroundColor:'#F2F6FE',alignItems:'center', justifyContent:'center', opacity:0.5}}>
                        <Image style={{width:250, height:250}} source={require('../assets/images/datanotfound.png')}/>
                    </View>
                </React.Fragment>
            )
        }
        else{
            return (
                <View style={styles.container}>
                    { this.state.loading ?
                    <ActivityIndicator size="large" color="#CFD8DC" style={{ marginVertical: 25 }} /> :
                        <ScrollView>
                            <View style={{padding:20, borderColor:'#3b366c'}}>
                                <Text style={{ fontSize:21, fontWeight:'bold', color:'#232d42' }}>Total Ticket {(this.state.data).length}</Text>
                            </View>
                            <FlatList
                                style={{ paddingVertical:20 }}
                                data={this.state.data}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <View style={{alignItems:'center', justifyContent:'center', flex:1, marginBottom:10 }}>
                                        <View style={{ padding: 10, borderRadius:8, width:'90%', alignItems:'center', justifyContent:'center', elevation:2 }}>
                                            <View style={{ flex:1, position:'absolute', alignItems:'center', justifyContent:'center', zIndex:1}}>
                                                {(item.status == 1) &&
                                                    <Image
                                                        style={{ width:200, height:200}}
                                                        source={{uri:'http://www.alashjan.net/images/used-stamp.png'}}
                                                    />
                                                }
                                            </View>
                                            <View style={{ width:'95%', height:70, alignItems:'center', flexDirection:'row' }}>
                                                <Text style={{ fontSize:18,  }}>{ moment(item.booking_date).format('DD.MM.YYYY') }</Text>
                                                <View style={{ flex:1, alignItems:'flex-end' }}>
                                                    <Image
                                                        style={{ width:100, height:48 }}
                                                        source={require('../assets/logo.png')}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width:'95%', height:40, justifyContent:'center', flexDirection:'row' }}>
                                                <Text style={{ fontSize:23, color:'#000', fontWeight:'400' }}>{this.state.tour}</Text>
                                            </View>
                                            <View style={{ width:'95%', height:160, justifyContent:'center', alignItems:'center', flexDirection:'row', marginBottom:2 }}>
                                                <QRCode
                                                    size={120}
                                                    value={ 'http:///52.27.82.154:7000/checkin?ticket='+item.ticket }
                                                    logo={require('../assets/logo.png')}
                                                />
                                            </View>
                                            <View style={{ width:'95%', height:50, flexDirection:'row' }}>
                                                <Text style={{ fontSize:18,  }}>Name</Text>
                                                <View style={{ flex:1, alignItems:'flex-end' }}>
                                                    <Text style={{ fontSize:18, color:'#888f98' }}>{this.state.name_booking}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width:'95%', height:40, flexDirection:'row' }}>
                                                <Text style={{ fontSize:18,  }}>Ticket Expired</Text>
                                                <View style={{ flex:1, alignItems:'flex-end' }}>
                                                    <Text style={{ fontSize:19, color:'#888f98' }}>{ moment(item.expaired_date).format('DD.MM.YYYY') }</Text>
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
                                    </View>
                                )}
                                keyExtractor={(item,index)=>index.toString()}
                            />
                        </ScrollView>
                    }
                </View>
            )
        }
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