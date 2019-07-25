import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, AsyncStorage } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Wishlist extends Component {

    constructor(props) {
        super(props)

        this._bootstrapAsync()
        this.state = {
            isLoading: false,
            isLogin: false,
            wishlist: [],
            tour: []
        }
    }

    _bootstrapAsync = async () => {
        let idUser;
        await AsyncStorage.getItem('idUser', (error, result) => {
            if(result) {
                idUser = result;
            }
        })
    }

    render() {
        return (
            <Fragment>

                <ScrollView style={{marginTop:60}}>
                    <View style={{flex:1, marginTop: 30}}>

                    <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', elevation:10, alignSelf:'center', borderRadius:8, width:'88%', marginBottom:50}} onPress={() => this.props.navigation.navigate('DetailTour', {item})}>
                        <Image source={{uri:'https://e-tiketing.s3.amazonaws.com/1563964934834-1.jpg'}} style={{height:100, width:100, marginTop:-15, marginLeft:-15, borderRadius:8}} />
                        <View style={{flex:1}}>
                        <View style={{paddingHorizontal:10, paddingVertical:5}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:5}}>
                                            <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Gunung Watu</Text>
                                        </View>
                                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                            <AntDesign name='heart' size={20} color={'red'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={{flex:1, flexDirection:'row', alignItems:'center', marginVertical:5}}>
                                <Ionicons name={'ios-star'} color={'#f8d807'} style={{marginRight:2}} />
                                <Ionicons name={'ios-star'} color={'#f8d807'} style={{marginRight:2}} />
                                <Ionicons name={'ios-star'} color={'#f8d807'} style={{marginRight:2}} />
                                <Ionicons name={'ios-star'} color={'#f8d807'} style={{marginRight:2}} />
                                <Ionicons name={'ios-star'} color={'#f8d807'} style={{marginRight:2}} />
                                <Text>5</Text>
                            </View>

                            <View style={{flex:1}}>
                                <Text numberOfLines={2}>Lorem ipsum dolor sit amet kolor molor ga kendor kendor sih wkwkwk</Text>
                            </View>
                        </View>
                        </View>
                    </TouchableOpacity>

                    </View>
                </ScrollView>

                <View style={{ backgroundColor: 'green', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0, }}>
                    <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal:15 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <AntDesign name='arrowleft' size={27} color={'#fff'} />
                            </TouchableOpacity>
                            <Text style={{fontSize:20, marginLeft:15, fontFamily:'sans-serif-medium', color:'#fff'}}>Wishlist</Text>
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }
}