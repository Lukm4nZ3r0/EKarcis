import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class MyProfileScreen extends Component{
    //nama-, to tlp-, email-, alamat-, tgl lahir-, gender-, pekerjaan-, pprofil, points
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                {/* <LinearGradient style={{flex:1}} start={{x: 0, y: 0}} end={{x: 2, y: 2}} colors={['#60935C','#9effa6']}/> */}
                <Image style={{flex:1, width:'100%', height:'100%'}} source={require('../../assets/images/5.png')}/>
                <View style={{flex:2}}/>
                <View style={{flex:1,position:'absolute', alignItems:'center', width:'100%'}}>
                    <Image style={{width:130, height:130, borderRadius:70, margin:25, borderWidth:5, borderColor:'white'}} source={{uri:'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887'}} />
                    <View style={{flex:1,borderRadius:20, backgroundColor:'white', elevation:7, alignItems:'center', width:'80%'}}>
                        <Text style={{flex:1,color:'#4C5156', fontSize:25, fontWeight:'bold', margin:15}}>Asep Lukman Hakim</Text>
                        <View style={{flexDirection:'row', flex:1, margin:5}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome style={{color:'#4C5156', fontSize:25}} name="phone"/></View>
                            <View style={{flex:4, justifyContent:'center'}}><Text style={{color:'#4C5156', fontSize:18}}>082625921625</Text></View>
                        </View>
                        <View style={{flexDirection:'row', flex:1, margin:5}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome style={{color:'#4C5156', fontSize:25}} name="envelope"/></View>
                            <View style={{flex:4, justifyContent:'center'}}><Text style={{color:'#4C5156', fontSize:18}}>your_email@email.com</Text></View>
                        </View>
                        <View style={{flexDirection:'row', flex:1, margin:5}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome style={{color:'#4C5156', fontSize:25}} name="map-marker"/></View>
                            <View style={{flex:4, justifyContent:'center'}}><Text style={{color:'#4C5156', fontSize:18}}>Jalan-Mu</Text></View>
                        </View>
                        <View style={{flexDirection:'row', flex:1, margin:5}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome style={{color:'#4C5156', fontSize:25}} name="calendar"/></View>
                            <View style={{flex:4, justifyContent:'center'}}><Text style={{color:'#4C5156', fontSize:18}}>18 July 1998</Text></View>
                        </View>
                        <View style={{flexDirection:'row', flex:1, margin:5}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome style={{color:'#4C5156', fontSize:25}} name="mars"/></View>
                            <View style={{flex:4, justifyContent:'center'}}><Text style={{color:'#4C5156', fontSize:18}}>Male</Text></View>
                        </View>
                        <View style={{flexDirection:'row', flex:1, margin:5}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><FontAwesome style={{color:'#4C5156', fontSize:25}} name="address-card"/></View>
                            <View style={{flex:4, justifyContent:'center'}}><Text style={{color:'#4C5156', fontSize:18}}>Programmer Kacang</Text></View>
                        </View>
                        <View style={{marginBottom:30}}/>
                    </View>
                    <TouchableOpacity style={{margin:25}}>
                        <LinearGradient style={{flexDirection:'row', borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20, elevation:5}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['#fc03f0','#820c7c']}>
                            <FontAwesome style={{color:'#ffffff', fontSize:25}} name="star"/>
                            <Text style={{color:'#ffffff', fontSize:18}}> 3000 Points</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', right:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.navigate('MyEditProfileScreen')}>
                        <FontAwesome name="pencil" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default MyProfileScreen