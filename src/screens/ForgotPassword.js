import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput, Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import URL from '../public/redux/actions/URL'
import querystring from 'querystring'

const {width,height} = Dimensions.get('window')

class ForgotPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstSession:true,
            firstSessionError:false,
            firstSessionButtonDisabled:false,
            secordSession:false,
            secordSessionError:false,
            secondSessionButtonDisabled:false,
            thirdSession:false,
            thirdSessionError:false,
            thirdSessionButtonDisabled:false,
            textValue:'',
            errorTextValue:false,
            errorText:false,
            userId:'',
            tokenFromEmail:'',
            newPassword:'',
            errorPassword:false
        }
    }
    valueValidate = (text) =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(reg.test(text)===false){
            this.setState({errorTextValue:true, textValue:''})
        }
        else{
            if(text.length<1){
                this.setState({errorText:true, textValue:''})
            }
            else{
                this.setState({textValue:text, errorText:false})
            }
            this.setState({errorTextValue:false})
        }
    }
    submitEvent = () =>{
        this.setState({firstSessionButtonDisabled:true})
        axios.post(`${URL}/auth_forgot`,querystring.stringify({
            receiver:this.state.textValue
        })).then((response)=>{
            if(response.data.status){
                this.setState({
                    firstSession:false,
                    secondSession:true,
                    userId:response.data.result[0].id_user
                })
            }
            else{
                this.setState({
                    firstSessionError:true
                })
            }
            
        })
    }
    secondSessionEvent = () =>{
        this.setState({secondSessionButtonDisabled:true})
        axios.post(`${URL}/auth_token_check/${this.state.userId}`,querystring.stringify({
            token:Number(this.state.tokenFromEmail)
        })).then((response)=>{
            console.warn(response.data)
            if(response.data.status){
                this.setState({
                    secondSession:false,
                    thirdSession:true,
                })
            }
            else{
                this.setState({
                    secondSessionError:true
                })
            }
        })
    }
    newPasswordValidate = (text) =>{
        if(text.length<6){
            this.setState({errorPassword:true, newPassword:''})
        }
        else{
            this.setState({newPassword:text, errorPassword:false})
        }
    }
    thirdSessionEvent = () =>{
        if(this.state.errorPassword){
            Alert.alert('password length must be more than six character')
        }
        else{
            this.setState({thirdSessionButtonDisabled:true})
            axios.post(`${URL}/auth_password/${this.state.userId}`,querystring.stringify({
                password:this.state.newPassword
            })).then((response)=>{
                console.warn(response.data)
                if(response.data.status){
                    Alert.alert('Password is successfull updated! Please Login ..')
                    this.props.navigation.goBack()
                }
                else{
                    this.setState({
                        thirdSessionError:true
                    })
                }
            })
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    render() {
        const {errorTextValue, errorText,firstSessionError, secondSessionError, thirdSessionError, errorPassword} = this.state
        return (
            <View style={{flex:1, width:'100%', backgroundColor:'#C9E4BB'}}>
                <View style={{ flex:1, height:height, width:'100%'}}>
                    <ScrollView style={{flex:1, width:'100%'}}>
                        <View style={{width:'100%', marginTop:100, marginBottom:100, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flex:1, borderRadius:30, elevation:5, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:15, width:'90%'}}>
                                <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                                    <Image style={{flex:1,width:200, height:200,resizeMode: 'contain',}} source={require('../../assets/images/4.png')}/>
                                </View>

                                {this.state.firstSession &&
                                <View style={{width:'100%', alignItems:'center'}}>
                                    {errorTextValue&&<Text style={{color:'red'}}>invalid email format</Text>}
                                    {errorText&&<Text style={{color:'red'}}>email characters must be more than one.</Text>}
                                    {firstSessionError&&<Text style={{color:'red'}}>email not found. :(.</Text>}
                                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10}}>
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                        </View>
                                        <View style={{flex:4, justifyContent:'center'}}>
                                            <TextInput placeholder="Input Your Email / Phone Number" placeholderTextColor="grey" onChangeText={this.valueValidate} onFocus={()=>this.setState({firstSessionButtonDisabled:false})} />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.submitEvent} disabled={this.state.firstSessionButtonDisabled}>
                                        <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['#60935C','#C9E4BB']}>
                                            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Submit</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}

                                {this.state.secondSession &&
                                <View style={{width:'100%', alignItems:'center'}}>
                                    {secondSessionError&&<Text style={{color:'red'}}>Token not valid. :(.</Text>}
                                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10}}>
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                        </View>
                                        <View style={{flex:4, justifyContent:'center'}}>
                                            <TextInput keyboardType="numeric" placeholder="Input Key" placeholderTextColor="grey" onChangeText={(text)=>this.setState({tokenFromEmail:text})} onFocus={()=>this.setState({secondSessionButtonDisabled:false})} />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.secondSessionEvent} disabled={this.state.secondSessionButtonDisabled}>
                                        <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['#60935C','#C9E4BB']}>
                                            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Submit Key</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}

                                {this.state.thirdSession &&
                                <View style={{width:'100%', alignItems:'center'}}>
                                    {thirdSessionError&&<Text style={{color:'red'}}>error?. :(.</Text>}
                                    {errorPassword&&<Text style={{color:'red'}}>password length must be more than six character.</Text>}
                                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10}}>
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                        </View>
                                        <View style={{flex:4, justifyContent:'center'}}>
                                            <TextInput secureTextEntry={true} placeholder="Input New Password" placeholderTextColor="grey" onChangeText={this.newPasswordValidate} onFocus={()=>this.setState({thirdSessionButtonDisabled:false})} />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.thirdSessionEvent} disabled={this.state.thirdSessionButtonDisabled}>
                                        <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['#60935C','#C9E4BB']}>
                                            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Submit New Password</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{position:'absolute', left:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.goBack()}>
                        <FontAwesome name="arrow-left" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ForgotPassword