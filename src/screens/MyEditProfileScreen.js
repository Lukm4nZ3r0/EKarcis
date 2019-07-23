import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

const {width,height} = Dimensions.get('window')

class MyEditProfileScreen extends Component {
    //nama-, email-, gender-,
    constructor(props){
        super(props)
        this.state = {
            name:'',
            errorName:false,
            email:'',
            errorEmail:false,
            errorEmailFormat:false,
            errorForm:false,
            buttonDisabled:false,
            gender:'',
            imageLink:'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887',
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
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
    validateProfileImage = (text) =>{
        if(text>0){
            this.setState({imageLink:text, errorImage:false})
        }
        else{
            this.setState({errorImage:true})
        }
    }
    editProfileEvent = () =>{
        const {name,errorName,email,errorEmail,errorEmailFormat,gender} = this.state
        if(email.length>0 && name.length>0 && errorName==false && errorEmail==false && errorEmailFormat==false && gender.length>0){
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
        const {name,errorName,email,errorEmail,errorEmailFormat,errorForm,buttonDisabled,imageLink,errorImage} = this.state
        return (
            <View style={{flex:1, width:'100%', backgroundColor:'#C9E4BB'}}>
                <View style={{ flex:1, height:height, width:'100%'}}>
                    <ScrollView style={{flex:1, width:'100%'}}>
                        <View style={{width:'100%', marginTop:100, marginBottom:100, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flex:1, borderRadius:30, elevation:5, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:15, width:'90%'}}>
                                <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                                    <Image style={{width:150, height:150,borderWidth:5, borderColor:'white', borderRadius:80}} source={{uri:imageLink}}/>
                                </View>
                                {errorForm && <Text style={{color:'red'}}>please fill in the form correctly.</Text>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorEmailFormat || errorEmail ?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="image" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={(text)=>this.setState({imageLink:text})} value={imageLink} placeholder="Your Profile Image Link" placeholderTextColor="grey"/></View>
                                </View>
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorEmailFormat || errorEmail ?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="envelope" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validateEmail} placeholder="Your Email" placeholderTextColor="grey"/></View>
                                </View>
                                {errorEmailFormat && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Wrong email.</Text></View>}
                                {errorEmail && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Email characters must be more than one.</Text></View>}
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
                                <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.editProfileEvent} disabled={buttonDisabled}>
                                    <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={buttonDisabled?['grey','black']:['#60935C','#C9E4BB']}>
                                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Edit Your Profile</Text>
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

export default MyEditProfileScreen