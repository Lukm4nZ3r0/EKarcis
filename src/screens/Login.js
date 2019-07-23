import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

const {width,height} = Dimensions.get('window')

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            errorUsername:false,
            errorSpaceUsername:false,
            errorPassword:false,
            errorSpacePassword:false,
            loginButtonDisabled:false,
            loginButtonError:false
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    usernameValidate = (text) =>{
        let reg = /^[a-zA-Z0-9]*$/
        if(reg.test(text)===false){
            this.setState({errorSpaceUsername:true, username:''})
        }
        else{
            if(text.length<6){
                this.setState({errorUsername:true, username:''})
            }
            else{
                this.setState({username:text, errorUsername:false})
            }
            this.setState({errorSpaceUsername:false})
        }
    }
    passwordValidate = (text) =>{
        if(text.length<6){
            this.setState({errorPassword:true, password:''})
        }
        else{
            this.setState({password:text, errorPassword:false})
        }
    }
    loginEvent = () =>{
        const {username,password} = this.state
        if(username.length>0 && password.length>0){
            this.setState({loginButtonDisabled:true, username:'', password:'',loginButtonError:false})
        }
        else{
            this.setState({loginButtonDisabled:true,loginButtonError:true})
        }
    }
    componentDidMount(){
        
    }
    render() {
        const {errorUsername,errorPassword,errorSpaceUsername,errorSpacePassword,loginButtonDisabled,loginButtonError} = this.state
        return (
            <View style={{flex:1, width:'100%', backgroundColor:'#C9E4BB'}}>
                <View style={{ flex:1, height:height, width:'100%'}}>
                    <ScrollView style={{flex:1, width:'100%'}}>
                        <View style={{width:'100%', marginTop:100, marginBottom:100, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flex:1, borderRadius:30, elevation:5, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:15, width:'90%'}}>
                                <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                                    <Image style={{flex:1,width:200, height:200,resizeMode: 'contain',}} source={require('../../assets/images/1.png')}/>
                                </View>
                                {loginButtonError && <View style={{justifyContent:'center'}}><Text style={{color:'red'}}>Please fill in the form correctly.</Text></View>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorUsername || errorSpaceUsername?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="user" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={()=>this.setState({loginButtonDisabled:false})} onChangeText={this.usernameValidate} placeholder="Username" placeholderTextColor="grey"/></View>
                                </View>
                                {errorUsername && <View style={{justifyContent:'center', width:'90%'}}><Text style={{color:'red'}}>- username must be more than 6 characters.</Text></View>}
                                {errorSpaceUsername && <View style={{justifyContent:'center', width:'90%'}}><Text style={{color:'red'}}>- don't use spaces.</Text></View>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorPassword || errorSpacePassword?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={()=>this.setState({loginButtonDisabled:false})} onChangeText={this.passwordValidate} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey"/></View>
                                </View>
                                {errorPassword && <View style={{justifyContent:'center', width:'90%'}}><Text style={{color:'red'}}>- password must be more than 6 characters.</Text></View>}
                                {errorSpacePassword && <View style={{justifyContent:'center', width:'90%'}}><Text style={{color:'red'}}>- don't use spaces.</Text></View>}
                                <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.loginEvent} disabled={loginButtonDisabled}>
                                    <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={loginButtonDisabled?['grey','black']:['#60935C','#C9E4BB']}>
                                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Login</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Text>Forgot the password?</Text>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                                        <Text style={{color:'#60935C'}}> Click here.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{position:'absolute', left:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.goBack()}>
                        <FontAwesome name="arrow-left" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', right:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.navigate('Register')}>
                        <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login