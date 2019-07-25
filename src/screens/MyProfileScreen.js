import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, AsyncStorage} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
import { withNavigationFocus } from "react-navigation";
import axios from 'axios';
import URL from '../public/redux/actions/URL'

const {width, height} = Dimensions.get('window')

class MyProfileScreen extends Component{
    //nama-, to tlp-, email-, alamat-, tgl lahir-, gender-, pekerjaan-, pprofil, points
    constructor(props){
        super(props)
        this.state = {
            isLogged:false,
            userId:'',
            userData:[],
            profileData:[]
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    loginEvent = (dataLogin) =>{
        AsyncStorage.setItem('token',dataLogin.token)
        AsyncStorage.setItem('idUser',dataLogin.id_user.toString())
        AsyncStorage.setItem('role',dataLogin.role.toString())
        this.setState({isLogged:true, userData:dataLogin})
    }
    logoutEvent = () =>{
        AsyncStorage.clear()
        this.setState({isLogged:false})
    }
    componentDidMount(){
        AsyncStorage.getItem('token').then((token)=>{
            if(token!=null){
                AsyncStorage.getItem('idUser').then((idUser)=>{
                    this.setState({isLogged:true,userId:idUser})

                    AsyncStorage.getItem('role').then((role)=>{
                        console.warn('ini adalah token:'+token)
                        console.warn('ini adalah idUser:'+idUser)
                        console.warn('ini adalah role:'+role)
                        axios.get(`${URL}/user/${idUser}`).then((profileData)=>{
                            console.warn('profileData:',profileData.data)
                            this.setState({
                                profileData:profileData.data.result[0]
                            })
                        })
                    })
                })
            }
        })
    }
    componentDidUpdate(prevProps){
        if (prevProps.isFocused !== this.props.isFocused) {
            AsyncStorage.getItem('token').then((token)=>{
                if(token!=null){
                    AsyncStorage.getItem('idUser').then((idUser)=>{
                        this.setState({isLogged:true,userId:idUser})
    
                        axios.get(`${URL}/user/${idUser}`).then((profileData)=>{
                            console.warn('profileData:',profileData.data)
                            this.setState({
                                profileData:profileData.data.result[0]
                            })
                        })
                        AsyncStorage.getItem('role').then((role)=>{
                            console.warn('ini adalah token:'+token)
                            console.warn('ini adalah idUser:'+idUser)
                            console.warn('ini adalah role:'+role)
                        })
                    })
                }
            })
        }
    }
    render(){
        const {isLogged} = this.state
        return(
            <View style={{flex:1}}>
                {/* <LinearGradient style={{flex:1}} start={{x: 0, y: 0}} end={{x: 2, y: 2}} colors={['#60935C','#9effa6']}/> */}
                <Image style={{flex:1, width:'100%', height:'100%'}} source={require('../../assets/images/5.png')}/>
                {isLogged?
                <View style={{flex:2, backgroundColor:'#F2F6FE'}}>
                    <ScrollView>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center', padding:15, elevation:5, backgroundColor:'white', borderWidth:0.1, borderColor:'grey'}} onPress={()=>this.props.navigation.navigate('RedeemPoints')}>
                            <View style={{alignItems:'center', justifyContent:'center', width:45, height:45, borderRadius:30, backgroundColor:'#F0F0F0'}}><FontAwesome name="credit-card" style={{fontSize:20,color:'#353535'}}/></View>
                            <View style={{flex:5, justifyContent:'center', marginLeft:20}}><Text style={{fontSize:20}}>Redeem Your Points</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center', padding:15, elevation:5, backgroundColor:'white', borderWidth:0.1, borderColor:'grey'}} onPress={()=>this.props.navigation.navigate('MyEditProfileScreen')}>
                            <View style={{alignItems:'center', justifyContent:'center', width:45, height:45, borderRadius:30, backgroundColor:'#F0F0F0'}}><FontAwesome name="pencil" style={{fontSize:20,color:'#353535'}}/></View>
                            <View style={{flex:5, justifyContent:'center', marginLeft:20}}><Text style={{fontSize:20}}>Edit Your Profile</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center', padding:15, elevation:5, backgroundColor:'white', borderWidth:0.1, borderColor:'grey'}}>
                            <View style={{alignItems:'center', justifyContent:'center', width:45, height:45, borderRadius:30, backgroundColor:'#F0F0F0'}}><FontAwesome name="cog" style={{fontSize:20,color:'#353535'}}/></View>
                            <View style={{flex:5, justifyContent:'center', marginLeft:20}}><Text style={{fontSize:20}}>Preference</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center', padding:15, elevation:5, backgroundColor:'white', borderWidth:0.1, borderColor:'grey'}} onPress={this.logoutEvent}>
                            <View style={{alignItems:'center', justifyContent:'center', width:45, height:45, borderRadius:30, backgroundColor:'#F0F0F0'}}><FontAwesome name="sign-out" style={{fontSize:20,color:'#353535'}}/></View>
                            <View style={{flex:5, justifyContent:'center', marginLeft:20}}><Text style={{fontSize:20}}>Logout</Text></View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                :
                <View style={{flex:2, backgroundColor:'#F2F6FE',alignItems:'center', justifyContent:'center', opacity:0.3}}>
                    <Image style={{width:250, height:250}} source={require('../../assets/images/6.png')}/>
                    <Text style={{color:'#575757', fontSize:20}}>Anda belum login</Text>
                </View>
                }
                <View style={{flex:1,position:'absolute', alignItems:'center', width:'100%', }}>
                {isLogged?
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:130, height:130, borderRadius:70, margin:25, borderWidth:5, borderColor:'white'}} source={{uri:this.state.profileData.photo}} />
                        <View style={{flex:1}}>
                        <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>{this.state.profileData.name}</Text>
                        <Text style={{color:'white', fontSize:17, fontWeight:'200'}}>{this.state.profileData.email}</Text>
                        {/* ['#4287f5','#88b6fc'] */}
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 2, y: 3}} colors={this.state.profileData.gender=='Perempuan'?['#fc03c6','#ff45d7']:['#4287f5','#88b6fc']} style={{flexDirection:'row', alignItems:'center', marginTop:20, width:'50%', padding:6, borderRadius:15, elevation:3}}>
                                <View style={{flex:1,alignItems:'center'}}><FontAwesome style={{ color:'white', fontSize:25}} name={this.state.profileData.gender=='Perempuan'?'venus':'mars'}/></View>
                                <View style={{flex:4,alignItems:'center'}}><Text style={{ color:'white', fontSize:17}}>{this.state.profileData.gender=='Perempuan'?'Female':'Male'}</Text></View>
                            </LinearGradient>
                        </View>
                    </View>
                :
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login',{loginEvent:this.loginEvent})} style={{flex:1,backgroundColor:'green', padding:15, borderRadius:5, top:height/9, elevation:5}}>
                        <Text style={{color:'white', fontSize:20}}>Login</Text>
                    </TouchableOpacity>
                }
                </View>
                {isLogged&&<View style={{position:'absolute', right:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}}>
                        <FontAwesome name="cogs" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>}
            </View>
        )
    }
}

export default withNavigationFocus(MyProfileScreen)