import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

export default class DashboardChat extends Component {
    render() {
        return (
            <Fragment>
                <ScrollView style={{marginTop:60}}>
                    <View style={{paddingHorizontal:15, marginVertical:20,}}>
                        <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15}} onPress={() => this.props.navigation.navigate('Chat')}>
                            <Image source={require('../assets/images/header.jpg')} style={{height:50, width:50, borderRadius:100}} />
                            <View style={{flex:1, marginLeft:10}}>
                                <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Andre Feri Saputra</Text>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor, hey kamu yang disana... iya kamuu :*</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15, marginTop:20}}>
                            <Image source={require('../assets/images/header.jpg')} style={{height:50, width:50, borderRadius:100}} />
                            <View style={{flex:1, marginLeft:10}}>
                                <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Andre Feri Saputra</Text>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor, hey kamu yang disana... iya kamuu :*</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15, marginTop:20}}>
                            <Image source={require('../assets/images/header.jpg')} style={{height:50, width:50, borderRadius:100}} />
                            <View style={{flex:1, marginLeft:10}}>
                                <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Andre Feri Saputra</Text>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor, hey kamu yang disana... iya kamuu :*</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15, marginTop:20}}>
                            <Image source={require('../assets/images/header.jpg')} style={{height:50, width:50, borderRadius:100}} />
                            <View style={{flex:1, marginLeft:10}}>
                                <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Andre Feri Saputra</Text>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor, hey kamu yang disana... iya kamuu :*</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15, marginTop:20}}>
                            <Image source={require('../assets/images/header.jpg')} style={{height:50, width:50, borderRadius:100}} />
                            <View style={{flex:1, marginLeft:10}}>
                                <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Andre Feri Saputra</Text>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor, hey kamu yang disana... iya kamuu :*</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15, marginTop:20}}>
                            <Image source={require('../assets/images/header.jpg')} style={{height:50, width:50, borderRadius:100}} />
                            <View style={{flex:1, marginLeft:10}}>
                                <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Andre Feri Saputra</Text>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor, hey kamu yang disana... iya kamuu :*</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <LinearGradient 
                    style={{height:300, width:300, borderRadius: 600, marginBottom:-40, marginRight:-80, bottom:0, right:0, position:'absolute', zIndex:-1}}
                    colors={['#60935C','#C9E4BB']}
                    start={{x: 1, y: 0.4}} 
                    end={{x: 0, y: 0}} />

                <View style={{ backgroundColor: 'green', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0, }}>
                    <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal:15 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <AntDesign name='arrowleft' size={27} color={'#fff'} />
                            </TouchableOpacity>
                            <Text style={{fontSize:20, marginLeft:15, fontFamily:'sans-serif-medium', color:'#fff'}}>Chat</Text>
                        </View>
                    </View>
                </View>                
            </Fragment>
        )
    }
}