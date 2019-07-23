import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TextInput, DatePickerAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modalbox';
import NumericInput from 'react-native-numeric-input'
import moment from 'moment';
import axios from 'axios';

export default class Payment extends Component {
    
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#64BA5A',
        },  
        headerTintColor: '#fff',
        title: 'Payment',
    }

    constructor(props) {
        super(props);
        this.state = {
            
            loading: true,
            isEmpty: false,
            dataPayment: [],
            destination:{
                price:'80000'
            },
            total: '',
            coins: 80000 * 2/100,
            isDateTimePickerVisible: false,
            checkIn: "" || moment().format('DD/MM/YYYY'),
            nameBuyer: 'Ilham Yoga Pratama',
            amount: 1,
            visible: false,
            paymentName: '' || 'Indomaret',
            paymentImage: '' || 'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png',
            paymentStatus: false
        }
    }

    // formatNumber = nums => {
    //     return nums.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // }

    componentDidMount() {
        console.log('Cekkkkkkkk')
        this.getData;    
    }

    getData = () => {
        axios.post("http://192.168.6.101:7000/gettransaction/",{
            id_user: 1,
            id_tour: 1
        })
        .then((res) => {
            console.log('Cek data', res)
            const data = res.data;
            console.log('Cek data2', data)
            if (Object.keys(data).length < 0) {
                this.setState({ dataPayment: data.data, loading: false, isEmpty: true });
            }
            else {
                this.setState({ dataPayment: data.data, loading: false });
            }

            })
            .catch(error => {
                this.setState({ loading: false, error: "something went wrong" });
            });
    }

    handlePaymentCek = () => {
        this.props.navigation.navigate('Checkout');
    }

    datePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              this.setState({
                  checkIn: day+"/"+month+"/"+year
              })
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
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
                            {this.state.dataPayment.tour}
                        </Text>
                        <Text numberOfLines={1} style={{fontSize:16, marginBottom:10,}}>
                            Open 08:00 - Close 16:00
                        </Text>
                        <Text numberOfLines={1} style={{fontSize:25, marginBottom:2, color:'#595653'}}>
                            Rp. {this.state.dataPayment.cost}
                        </Text>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                Name
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <TextInput
                                    numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}
                                    onChangeText={(text) => this.setState({ nameBuyer: text })}
                                    value={this.state.nameBuyer}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                Ticket Amount
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end', marginBottom:13 }}>
                                <NumericInput 
                                    value={this.state.amount} 
                                    onChange={text => {
                                        this.setState({
                                            amount: text,
                                            total: this.state.destination.price * text,
                                            coins: (this.state.destination.price * text) * (2/100)
                                        })
                                    }} 
                                    totalWidth={100} 
                                    totalHeight={40} 
                                    iconSize={25}
                                    step={1}
                                    minValue={1}
                                    rounded 
                                    rightButtonBackgroundColor='#41d11f' 
                                    leftButtonBackgroundColor='#41d11f' 
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                CheckIn
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <TouchableOpacity
                                    onPress={this.datePicker}
                                >
                                    <Text numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}>
                                        {this.state.checkIn}
                                    </Text>
                                </TouchableOpacity>
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
                                    {this.state.coins}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%' }}>
                            <Image
                                style={{width: '100%', height:170}}
                                source={{uri: 'https://www.beritateknologi.com/wp-content/uploads/2017/08/Dewi-Persik.png'}}
                            />   
                        </View>
                    </View>
                    <View style={{ alignItems:'center', borderBottomWidth:2, borderBottomLeftRadius:10, borderBottomRightRadius:10, borderColor:'#e8e8e6' }}>
                        <View style={{ width:'93%' }}>
                            <TouchableOpacity
                                onPress={() => this.refs.modal6.open()}
                                style={{ flexDirection:'row', borderTopLeftRadius:10, borderTopRightRadius:10, padding:8, elevation:1, backgroundColor:'#009bf4', alignItems:'center'}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>{this.state.paymentName}</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: this.state.paymentImage}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.state.destination.price * this.state.amount}</Text>
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
                                    onPress={this.handlePaymentCek} 
                                    style={{ height:40, padding:5, paddingHorizontal:20, backgroundColor:'#55c843', justifyContent:'center', alignItems:'center', borderRadius:5}}
                                >
                                    <Text>CHECK OUT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <Modal style={styles.modal} position={"bottom"} ref={"modal6"} swipeArea={20}>
                    <ScrollView>
                        <View style={{ paddingHorizontal:20, paddingVertical:12, borderBottomWidth:1.5, borderColor:'#e8e8e6'}}>
                            <Text style={{ fontSize:18, fontWeight:'bold' }}>Payment Method</Text>
                        </View>
                        <View style={{ marginHorizontal:10 }}>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() & 
                                    this.setState({
                                        paymentName:'Indomaret',
                                        paymentCost:'',
                                        paymentImage:'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png',
                                    })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Indomaret</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.state.destination.price * this.state.amount}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() & 
                                    this.setState({
                                        paymentName:'Alfamart',
                                        paymentCost:'',
                                        paymentImage:'https://dad0jvgioe6jb.cloudfront.net/logos/78/578/logo_alfamart.png',
                                    })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Alfamart</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://dad0jvgioe6jb.cloudfront.net/logos/78/578/logo_alfamart.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.state.total}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() & 
                                    this.setState({
                                        paymentName:'Bank BRI',
                                        paymentCost:'',
                                        paymentImage:'https://pngimage.net/wp-content/uploads/2018/06/icon-bri-png-6.png',
                                    })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Bank BRI</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://pngimage.net/wp-content/uploads/2018/06/icon-bri-png-6.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.state.destination.price * this.state.amount}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() & 
                                    this.setState({
                                        paymentName:'ATM Bersama',
                                        paymentCost:'',
                                        paymentImage:'https://upload.wikimedia.org/wikipedia/id/e/e8/ATM_Bersama_2016.png',
                                    })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>ATM Bersama</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://upload.wikimedia.org/wikipedia/id/e/e8/ATM_Bersama_2016.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.state.destination.price}{this.state.destination.price * this.state.amount}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Modal>
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