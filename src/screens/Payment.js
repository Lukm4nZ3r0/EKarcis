import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TextInput, DatePickerAndroid, ActivityIndicator } from 'react-native';
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
        let date = Date.now()
        this.state = {
            
            loading: true,
            isEmpty: false,
            dataTour: [],
            dataUser: [],
            price: 0,
            total: 0,
            coins: 0,
            isDateTimePickerVisible: false,
            checkIn: "" || date,
            nameBuyer: '',
            amount: 1,
            visible: false,
            paymentMethod: ''|| 'bni',
            paymentName: '' || 'Bank BNI',
            paymentImage: '' || 'https://um.undip.ac.id/uploads/filemanager/bni.png',
            paymentStatus: false,
            isLoading: false,
        }
    }

    formatNumber = num => {
        let format = parseInt(num)
        return format.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    componentDidMount() {
        console.log('haloo', this.props.navigation.state.params.idUser)
        console.log('tess', this.props.navigation.state.params.idTour)
        this.getData();
    }

    getData = () => {
        axios.post("http://52.27.82.154:7000/gettransaction",{
            id_user: this.props.navigation.state.params.idUser,
            id_tour: this.props.navigation.state.params.idTour
        })
        .then((res) => {
            const dataUser = res.data.data.user[0]
            const dataTour = res.data.data.tour[0]
            if (dataUser.length < 0 && dataTour.length < 0 ) {
                this.setState({ loading: false, isEmpty: true });
            }
            else {
                this.setState({ 
                    dataUser: dataUser,
                    nameBuyer: dataUser.name,
                    dataTour: dataTour,
                    price: dataTour.cost,
                    coins: dataTour.cost * 2/100,
                    total: dataTour.cost * this.state.amount,
                    loading: false 
                });
            }

            })
            .catch(error => {
                this.setState({ loading: false, error: "something went wrong" });
            });
    }

    Transaksi = () =>{
        this.setState({ isLoading: true})
        if ( this.state.nameBuyer != '' && this.state.amount != 0) {
            let dataReg = {
                id_user : this.state.dataUser.id_user,
                name : this.state.nameBuyer,
                id_tour : this.state.dataTour.id_tour,
                ticket_amount : this.state.amount,
                booking_date : this.state.checkIn,
                coins_bonus : Math.ceil(this.state.coins),
                total_price : this.state.total,
                payment_method : this.state.paymentMethod
            };
            axios.post('http://52.27.82.154:7000/transaction',dataReg)
            .then((res)=>{
                this.setState({ isLoading: false })
                this.props.navigation.navigate('Checkout', res.data.data[0])
            })
            .catch(error => {
                this.setState({ isLoading: false });
                alert("Failed to get tokens, please check your connection")
            });
        } 
        else {
            this.setState({ isLoading: false });
            Alert.alert("Field cannot empty");
        }
    }

    handlePaymentCek = () => {
        this.Transaksi();
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
                  checkIn: year+"/"+(month+1)+"/"+day
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

                { (this.state.isLoading == true) ?
                    <View style={styles.modalLoading}>
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    </View>
                    : null
                }

                { this.state.loading ?
                  <ActivityIndicator size="large" color="#CFD8DC" style={{ marginVertical: 25 }} /> :

                <ScrollView style={{flex:1}}>
                    <View style={{justifyContent:'flex-start', alignItems:'center', height: 200, borderColor:'#3b366c'}}>
                        <Image
                            style={{width: '100%', height:200}}
                            source={{uri: this.state.dataTour.photo}}
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
                            {this.state.dataTour.tour}
                        </Text>
                        <Text numberOfLines={1} style={{fontSize:16, marginBottom:10,}}>
                            Open 08:00 - Close 16:00
                        </Text>
                        <Text numberOfLines={1} style={{fontSize:25, marginBottom:2, color:'#595653'}}>
                            Rp. {this.formatNumber(this.state.dataTour.cost)}
                        </Text>
                    </View>
                    <View style={{ alignItems:'center', marginBottom:20 }}>
                        <View style={{ width:'90%', flexDirection:'row', borderBottomWidth:2, borderBottomColor:'#f1f1f1' }}>
                            <Text numberOfLines={1} style={{ fontSize:17, marginBottom:13 }}>
                                Full Name
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <TextInput
                                    numberOfLines={1} 
                                    placeholder='Fill your name'
                                    style={{ fontSize:19, marginBottom:13, maxWidth:'90%', height:46, color:'#363838', borderBottomWidth:1, borderColor:'#bfb50a'}}
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
                                            total: this.state.price * text,
                                            coins: (this.state.price * text) * (2/100)
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
                                Booking Date
                            </Text>
                            <View style={{ flex:1, alignItems:'flex-end' }}>
                                <TouchableOpacity
                                    onPress={this.datePicker}
                                >
                                    <Text numberOfLines={1} style={{ fontSize:19, marginBottom:13,  color:'#363838'}}>
                                        { moment(this.state.checkIn).format('dddd, DD MMMM YYYY') }
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
                                    {Math.ceil(this.state.coins)}
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
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.formatNumber(this.state.total)}</Text>
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
                }
                <Modal style={styles.modal} position={"bottom"} ref={"modal6"} swipeArea={30} swipeToClose={true}>
                    <ScrollView>
                        <View style={{ paddingHorizontal:20, paddingVertical:12, borderBottomWidth:1.5, borderColor:'#e8e8e6'}}>
                            <Text style={{ fontSize:18, fontWeight:'bold' }}>Payment Method</Text>
                        </View>
                        <View style={{ marginHorizontal:10 }}>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() & 
                                    alert('this payment method is under maintenance')
                                    // this.setState({
                                    //     paymentName:'Indomaret',
                                    //     paymentCost:'',
                                    //     paymentImage:'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png',
                                    // })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Indomaret</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://i.pinimg.com/originals/84/1c/d2/841cd2c6a7c47838c99541f901fac4fb.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.formatNumber(this.state.total)}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() &
                                    this.setState({
                                        paymentMethod: 'bni',
                                        paymentName:'Bank BNI',
                                        paymentCost:'',
                                        paymentImage:'https://um.undip.ac.id/uploads/filemanager/bni.png',
                                    })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Bank BNI</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://um.undip.ac.id/uploads/filemanager/bni.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.formatNumber(this.state.total)}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() &
                                    alert('this payment method is under maintenance')
                                    // this.setState({
                                    //     paymentName:'Bank BRI',
                                    //     paymentCost:'',
                                    //     paymentImage:'https://pngimage.net/wp-content/uploads/2018/06/icon-bri-png-6.png',
                                    // })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Bank BRI</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://pngimage.net/wp-content/uploads/2018/06/icon-bri-png-6.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.formatNumber(this.state.total)}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => 
                                    this.refs.modal6.close() & 
                                    alert('this payment method is under maintenance')
                                    // this.setState({
                                    //     paymentName:'ATM Bersama',
                                    //     paymentCost:'',
                                    //     paymentImage:'https://upload.wikimedia.org/wikipedia/id/e/e8/ATM_Bersama_2016.png',
                                    // })
                                }
                                style={{ borderRadius: 8, height:55, flexDirection:'row', padding:8, elevation:2, backgroundColor:'#009bf4', alignItems:'center', marginTop:10}}
                            >
                                <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>ATM Bersama</Text>
                                <Image
                                    style={{width:70, height:30}}
                                    source={{uri: 'https://upload.wikimedia.org/wikipedia/id/e/e8/ATM_Bersama_2016.png'}}
                                />
                                <View style={{ alignItems:'flex-end', flex:1 }}>
                                    <Text style={{ color:'#d8ffff', fontSize:17, marginRight:7, marginLeft:5 }}>Rp. {this.formatNumber(this.state.total)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Modal>

                {/* <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                    <Text style={styles.text}>Modal centered</Text>
                    <Button onPress={() => this.setState({isDisabled: !this.state.isDisabled})} style={styles.btn}>Disable ({this.state.isDisabled ? "true" : "false"})</Button>
                </Modal> */}
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
    },

    modalLoading : {
        height: '100%',
        width: '100%',
        zIndex:1,
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.22)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    loading: {
        backgroundColor: 'white',
        width: 200,
        height: 100,
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
      },

});