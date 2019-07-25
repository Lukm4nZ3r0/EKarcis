import React, { Component, Fragment } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions, 
    StyleSheet, 
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';

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

        this._bootstrapAsync()

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
            tour: [],
            activeKey: 0,
            favourite: false,
            token: '',
            isLogin: false,
            idUser: '',
            idTour: this.props.navigation.state.params.item.id_tour
        }
    }

    _bootstrapAsync = async () => {
        await AsyncStorage.getItem('token', (error, result) => {
			if(result) {
				this.setState({
					token: result
				})
			}
        });

        await AsyncStorage.getItem('idUser', (error, result) => {
            if(result) {
                this.setState({ idUser: result })
            }
        })

        if(this.state.token) {
            this.setState({ isLogin: true })
        } else {
            this.setState({ isLogin: false})
        }

        console.warn(this.state.token);
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
                    <View style={{ marginBottom:100 }}>
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

    favourite = () => {
        if(this.state.favourite === false) {
            this.setState({
                favourite: true
            })
            axios.post(`http://52.27.82.154:7000/wishlist?id_user=${this.state.idUser}&id_tour=${this.props.navigation.state.params.item.id_tour}`)
            .then((response) => {
                console.warn(response);
            })
        } else {
            this.setState({
                favourite: false
            })
            axios.post(`http://52.27.82.154:7000/wishlist?id_user=${this.state.idUser}&id_tour=${this.props.navigation.state.params.item.id_tour}`)
            .then((response) => {
                console.warn(response);
            })
        }
    }

    render() {
        console.warn(this.state.idUser);
        console.warn(this.props.navigation.state.params.item.id_tour);
        return (
            <Fragment>
                <View>
                    <Image source={{ uri: this.props.navigation.state.params.item.photo }} style={{ height: height-400, borderBottomLeftRadius:20, borderBottomRightRadius: 20 }} />
                </View>
                <View style={{flexDirection:'row', paddingHorizontal:20}}>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <TouchableOpacity style={{backgroundColor:'white', padding:15, marginTop:-30, borderRadius:100, elevation:15}} onPress={() => this.state.isLogin == false ? this.props.navigation.navigate('Login') & ToastAndroid.showWithGravity('Please login first!', ToastAndroid.SHORT, ToastAndroid.CENTER) : this.favourite()}>
                            <AntDesign name={this.state.favourite == false ? 'hearto' : 'heart'} size={25} color={this.state.favourite == false ? '#808080' : 'red'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: '#fff'}}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.state.button.map(data => (
                                <TouchableOpacity style={{ flex: 1, padding: 20, borderBottomWidth: data.key == this.state.buttonSelected ? 1 : 0, borderBottomColor:'#66c00c' }} onPress={() => this.setActive(data.key) & this.setState({activeKey: data.key})} key={data.key} >
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'sans-serif-medium', color: data.key == this.state.buttonSelected ? '#282833' : '#808080' }}>{data.buttonName}</Text>
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
                                <TouchableOpacity style={{ backgroundColor: '#66c00c', paddingVertical: 11, borderRadius: 50, elevation: 5 }} onPress={() => this.state.isLogin == false ? this.props.navigation.navigate('Login') & ToastAndroid.showWithGravity('Please login first!', ToastAndroid.SHORT, ToastAndroid.CENTER) : this.props.navigation.navigate('Payment', {
                                    idUser: this.state.idUser,
                                    idTour: this.state.idTour
                                })}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Buy Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row', position:'absolute', top:0, left:0, backgroundColor: 'rgba(0,0,0,0.1)'}}>
                    <View style={{flex:1, paddingHorizontal:15, paddingVertical:15}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicon name='ios-arrow-back' size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, paddingHorizontal:15, paddingVertical:15, alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.state.isLogin == false ? this.props.navigation.navigate('Login') & ToastAndroid.showWithGravity('Please login first!', ToastAndroid.SHORT, ToastAndroid.CENTER) : this.favourite()}>
                            <Ionicon name='ios-chatbubbles' size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
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