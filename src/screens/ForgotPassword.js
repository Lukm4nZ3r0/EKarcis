import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

const {width,height} = Dimensions.get('window')

class ForgotPassword extends Component {
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    render() {
        return (
            <View style={{flex:1, width:'100%', backgroundColor:'#C9E4BB'}}>
                <View style={{ flex:1, height:height, width:'100%'}}>
                    <ScrollView style={{flex:1, width:'100%'}}>
                        <View style={{width:'100%', marginTop:100, marginBottom:100, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flex:1, borderRadius:30, elevation:5, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:15, width:'90%'}}>
                                <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                                    <Image style={{flex:1,width:200, height:200,resizeMode: 'contain',}} source={require('../../assets/images/4.png')}/>
                                </View>
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="key" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput secureTextEntry={true} placeholder="Input Your Email / Phone Number" placeholderTextColor="grey"/></View>
                                </View>
                                <TouchableOpacity style={{width:'95%', marginTop:10}}>
                                    <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['#60935C','#C9E4BB']}>
                                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Submit</Text>
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

export default ForgotPassword