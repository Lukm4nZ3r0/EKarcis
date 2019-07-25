import React, {Component} from 'react'
import {View,Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

class RedeemPoints extends Component{
    constructor(props){
        super(props)
        this.state = {
            redeemOption:[
                {key:0, label:'Voucher Indomaret 100.000', amount:100000, icon:'credit-card'},
                {key:1, label:'Voucher Facebook 70.000', amount:70000, icon:'facebook'},
                {key:2, label:'Voucher Steam 10 USD', amount:140000, icon:'steam'},
                {key:3, label:'Voucher Google Play 10 USD', amount:140000, icon:'google'},
                {key:4, label:'Voucher Telkomsel 50.000', amount:50000, icon:'credit-card'},
                {key:5, label:'0.001 BTC', amount:160000, icon:'bitcoin'}
            ],
            yourPoint:300000
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            headerStyle: {
                backgroundColor : 'green',
            },
            headerTintColor: 'white',
            headerTitle: (
                <Text style={{color:'white', fontSize:20}}>Redeem Points</Text>
            )
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                {/* <LinearGradient style={{flex:1}} start={{x: 0, y: 0}} end={{x: 2, y: 2}} colors={['#60935C','#9effa6']}/> */}
                <Image style={{flex:1, width:'100%', height:'100%'}} source={require('../../assets/images/5.png')}/>
                <View style={{flex:2, backgroundColor:'#F2F6FE'}}>
                    <ScrollView>
                        {this.state.redeemOption.map(item=>
                        <TouchableOpacity key={item.key} style={{flexDirection:'row',justifyContent:'center', padding:15, elevation:5, backgroundColor:'white', borderWidth:0.1, borderColor:'grey'}}>
                            <View style={{alignItems:'center', justifyContent:'center', width:45, height:45, borderRadius:30, backgroundColor:'#F0F0F0'}}><FontAwesome name={item.icon} style={{fontSize:20,color:'#353535'}}/></View>
                            <View style={{flex:5, justifyContent:'center', marginLeft:20}}><Text style={{fontSize:20}}>{item.label}</Text></View>
                        </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
                <View style={{ flex:1,position:'absolute', alignItems:'center', justifyContent:'center', width:'100%', flexDirection:'row'}}>
                    <Image style={{flex:1,width:200, height:200, resizeMode:'contain'}} source={require('../../assets/images/8.png')} />
                    <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'white', borderRadius:20, padding:10, margin:15, elevation:5}}>
                        <Text style={{color:'tomato', fontSize:20, fontWeight:'bold'}}>Your Points:</Text>
                        <Text style={{color:'tomato', fontSize:30, fontWeight:'bold'}}>{this.state.yourPoint}</Text>
                        <Text style={{textAlign:'center', color:'purple'}}>continue to collect points to be exchanged for attractive prizes! :)</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default RedeemPoints