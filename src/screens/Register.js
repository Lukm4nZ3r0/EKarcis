import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

const {width,height} = Dimensions.get('window')

class Register extends Component {
    //nama-, email-, gender-,
    constructor(props){
        super(props)
        this.state = {
            password:'',
            errorPassword:false,
            errorSpacePassword:false,
            confirmPassword:'',
            confirmPasswordError:false,
            name:'',
            errorName:false,
            email:'',
            errorEmail:false,
            errorEmailFormat:false,
            errorForm:false,
            buttonDisabled:false,
            gender:'',
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    validatePassword = (text) =>{
        if(text.length>6){
            this.setState({password:text,errorPassword:false})
        }
        else{
            this.setState({password:'',errorPassword:true})
        }
    }
    validateConfirmPassword = (text) =>{
        if(text!==this.state.password){
            this.setState({confirmPassword:'',confirmPasswordError:true})
        }
        else{
            this.setState({confirmPassword:text,confirmPasswordError:false})
        }
    }
    validateName = (text) =>{
        if(text.length>0){
            this.setState({name:text,errorName:false})
        }
        else{
            this.setState({name:'',errorName:true})
        }
    }
    validateEmail = (text) =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(text)===false){
            this.setState({errorEmailFormat:true,email:''})
        }
        else{
            if(text.length>0){
                this.setState({email:text,errorEmail:false})
            }
            else{
                this.setState({email:'',errorEmail:true})
            }
            this.setState({errorEmailFormat:false})
        }
    }
    registerEvent = () =>{
        const {password,errorPassword,errorSpacePassword,confirmPassword,confirmPasswordError,name,errorName,email,errorEmail,errorEmailFormat,gender} = this.state
        if(password.length>0 && confirmPassword.length>0 && email.length>0 && name.length>0 && errorPassword==false && errorSpacePassword==false && confirmPasswordError==false && errorName==false && errorEmail==false && errorEmailFormat==false && gender.length>0){
            // register event
            this.setState({errorForm:false,buttonDisabled:true})
            this.props.navigation.goBack()
        }
        else{
            this.setState({errorForm:true,buttonDisabled:true})
        }
    }
    buttonEnabled = () =>{
        this.setState({buttonDisabled:false})
    }
    render() {
        const gender = [ { key:'Laki - laki', label:'Male' }, { key:'Perempuan', label:'Female' } ]
        const {password,errorPassword,errorSpacePassword,confirmPassword,confirmPasswordError,name,errorName,email,errorEmail,errorEmailFormat,errorForm,buttonDisabled} = this.state
        return (
            <View style={{flex:1, width:'100%', backgroundColor:'#C9E4BB'}}>
                <View style={{ flex:1, height:height, width:'100%'}}>
                    <ScrollView style={{flex:1, width:'100%'}}>
                        <View style={{width:'100%', marginTop:100, marginBottom:100, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flex:1, borderRadius:30, elevation:5, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:15, width:'90%'}}>
                                <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                                    <Image style={{flex:1,width:200, height:200,resizeMode: 'contain',}} source={require('../../assets/images/3.png')}/>
                                </View>
                                {errorForm && <Text style={{color:'red'}}>please fill in the form correctly.</Text>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorEmailFormat || errorEmail ?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="envelope" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validateEmail} placeholder="Your Email" placeholderTextColor="grey"/></View>
                                </View>
                                {errorEmailFormat && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Wrong email.</Text></View>}
                                {errorEmail && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Email characters must be more than one.</Text></View>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorPassword || errorSpacePassword?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validatePassword} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey"/></View>
                                </View>
                                {errorPassword && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>password must be more than 6 characters.</Text></View>}
                                {errorSpacePassword && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>don't use spaces.</Text></View>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:confirmPasswordError?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validateConfirmPassword} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor="grey"/></View>
                                </View>
                                {confirmPasswordError && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>password is not match.</Text></View>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorName?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="tags" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validateName} placeholder="Your Name" placeholderTextColor="grey"/></View>
                                </View>
                                {errorName && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Please fill your name.</Text></View>}
                                <View style={{flex:1, padding:25}}>
                                    <Text style={{color:'#a7a9ab'}}>Jenis Kelamin</Text>
                                    <View style={{flex:1, width:'100%',alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flexDirection:'row', flex:1, marginTop:15, alignItems:'center', justifyContent:'center'}}>   
                                        {gender.map(item=>
                                            <View key={item.key} style={{flex:1,flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:10}}>
                                                <TouchableOpacity 
                                                style={{height:20, width:20, borderRadius:10, borderWidth:1, borderColor:'black', alignItems:'center',justifyContent:'center'}}
                                                onPress={()=>{this.setState({gender:item.key,buttonDisabled:false})}}
                                                >
                                                    { this.state.gender === item.key && (<View style={{width:14, height:14, borderRadius:7, backgroundColor:'black'}} />) }
                                                </TouchableOpacity>
                                                <Text style={{color:'#a7a9ab', fontSize:18}}>  {item.label}</Text>
                                            </View>
                                        )}
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.registerEvent} disabled={buttonDisabled}>
                                    <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={buttonDisabled?['grey','black']:['#60935C','#C9E4BB']}>
                                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Register</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
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

export default Register