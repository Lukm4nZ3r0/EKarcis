import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MapView, {Marker} from 'react-native-maps';

const { height, width } = Dimensions.get('window');

class Overview extends Component {
    render() {
        return (
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <Ionicon name='ios-timer' size={20} color={'#66c00c'} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'sans-serif-medium', color: '#282833' }}>8 hours</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems:'center' }}>
                    <EvilIcon name='location' size={22} color={'#66c00c'} style={{ marginLeft: -4 }} />
                    <Text style={{ fontSize: 18, marginLeft: 6, fontFamily: 'sans-serif-medium', color: '#282833' }}>{this.props.navigation.state.params.item.province}</Text>
                </View>
                <View style={{ flex: 1, marginTop: 8, marginBottom: 100 }}>
                    <Text style={{ fontSize: 15 }}>
                        {this.props.navigation.state.params.item.description}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

export default class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActiveHome: false,
            isActiveImage: false,
            isActiveMaps: false,
            button: [
                {
                    key: 0,
                    buttonName: 'Overview',
                    isActive: true
                },
                {
                    key: 1,
                    buttonName: 'Maps',
                    isActive: true
                },
                {
                    key: 2,
                    buttonName: 'Review',
                    isActive: true
                }
            ],
            buttonSelected: 0,
            tour: []
        }
    }

    setActive = (key) => {
        this.setState({
            buttonSelected: key
        })
    }

    renderItem = (key) => {
        if(key == 0) {
            return (
                <Overview navigation={this.props.navigation} />
            )
        } else if(key == 1) {
            return (
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <MapView
                        style={[styles.map, {height:250}]}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0043,
                            longitudeDelta: 0.0034,
                        }}
                    >
                        <Marker 
                            title={this.props.navigation.state.params.item.tour}
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0043,
                                longitudeDelta: 0.0034,
                            }} />
                    </MapView>
                </View>
            )
        } else if(key == 2) {
            return (
                <ScrollView style={{ backgroundColor:'#f1f1f1' }}>
                    <View style={{marginBottom:100}}>
                    <View style={{ flexDirection: 'row', alignItems:'center', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10 }}>
                        <Ionicon name='ios-star' size={26} color={'#f8d807'} />
                        <Text style={{ fontSize: 24, marginLeft: 10, fontFamily: 'sans-serif-medium', color: '#282833' }}>4</Text>
                        <Text style={{alignSelf:'flex-end', fontSize:15}}>/5</Text>
                        <Text style={{fontSize:20, color:'#282833', marginLeft:15}}>Good</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 8, backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={{uri:'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'}} style={{height:30, width:30}} />
                            <Text style={{marginLeft:10}}>Andre Feri</Text>
                        </View>
                        <Text style={{marginTop:10}}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 8, backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={{uri:'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'}} style={{height:30, width:30}} />
                            <Text style={{marginLeft:10}}>Asep Lukman</Text>
                        </View>
                        <Text style={{marginTop:10}}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                        </Text>
                    </View>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <View style={{ backgroundColor: '#0000ff' }}>
                    <Image source={{ uri: this.props.navigation.state.params.item.photo }} style={{ height: height-400 }} />
                </View>
                <View style={{ backgroundColor: '#fff', padding: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.state.button.map(data => (
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setActive(data.key)}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'sans-serif-medium', color: '#808080' }}>{data.buttonName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                {   
                    this.renderItem(this.state.buttonSelected)
                }

                <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, color: '#282833', fontFamily: 'sans-serif-medium' }}>Rp. {this.props.navigation.state.params.item.cost}</Text>
                                <Text>/person</Text>
                            </View>
                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#66c00c', paddingVertical: 11, borderRadius: 50, elevation: 5 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Buy Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ position: 'absolute', top: 15, left: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicon name='ios-arrow-back' size={30} color={'#fff'} style={{ backgroundColor: 'rgba(0,0,0,0.087)', paddingHorizontal: 10, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})