import React, { Component, Fragment } from 'react';
import { 
    View, 
    Text, 
    Dimensions, 
    Image, 
    FlatList, 
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios';

const {width,height} = Dimensions.get('window')

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselItems: [
                {
                    title:"Item 1",
                    image: 'https://cdn1-production-images-kly.akamaized.net/mIha9hxFCGnwEUaxXl34JqAvdVk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1543044/original/046378200_1490090990-Untitled-1.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 2",
                    image:'https://cdn1-production-images-kly.akamaized.net/mIha9hxFCGnwEUaxXl34JqAvdVk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1543044/original/046378200_1490090990-Untitled-1.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 3",
                    image:'https://cdn1-production-images-kly.akamaized.net/mIha9hxFCGnwEUaxXl34JqAvdVk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1543044/original/046378200_1490090990-Untitled-1.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 4",
                    image:'https://cdn1-production-images-kly.akamaized.net/mIha9hxFCGnwEUaxXl34JqAvdVk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1543044/original/046378200_1490090990-Untitled-1.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 5",
                    image:'https://cdn1-production-images-kly.akamaized.net/mIha9hxFCGnwEUaxXl34JqAvdVk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1543044/original/046378200_1490090990-Untitled-1.jpg',
                    price: '200.000'
                }
            ],
            tour: [],
            role:1
        }
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, marginBottom:10, elevation:5 }} onPress={() => {this.props.navigation.navigate('DetailTour', {item})}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 5, justifyContent:'center' }}>
                        <Image source={{ uri: item.photo }} style={{ width: 110, height: 110, borderRadius: 8 }} />
                    </View>
                    <View style={{ padding: 5, flex: 1 }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{backgroundColor:'#66c00c', color:'#fff', borderRadius:5, paddingHorizontal:5, fontSize:12, marginRight:5}}>{item.name_category}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: 'sans-serif-medium', color: '#282833' }}>{item.tour}</Text>
                            <Text>Rp. {item.cost}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text numberOfLines={2} style={{fontSize:12}}>{item.description}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row', marginTop:5}}>
                            <View style={{flex:2.6, justifyContent:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <EvilIcon name='location' size={18} />
                                    <Text style={{fontSize:13}}>{item.province}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Entypo name='ticket' color={'green'} size={16} />
                                    <Text style={{fontSize:12, marginLeft:3}}>{item.ticketAmount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderCarousel({item,index}){
        return (
            <TouchableOpacity>
                <ImageBackground style={{flex:1, justifyContent:'flex-end', width:300, marginRight:20, elevation:5}} source={{uri:item.image}}>
                    <View style={{padding:10}}>
                        <Text style={{color:'#fff', fontSize:20}}>{item.title}</Text>
                        <Text style={{color:'#fff'}}>Rp. {item.price}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        axios.get('http://52.27.82.154:7000/tour')
        .then((response) => {
            console.log(response)
            this.setState((prevState) => {
                return {
                    tour: response.data.data
                }
            })
        })
    }

    render() {
        if(this.state.role==1){
            return(
                <AdminScreen />
            )
        }
        else{

            return (
                <Fragment>
                    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 60, paddingHorizontal: 7, paddingTop:10, paddingBottom:10 }}>
                        {/* <View style={{ flexDirection: 'row'}}>
                        </View> */}
                        {/* <Carousel
                            data={this.state.carouselItems}
                            sliderWidth={400}
                            itemWidth={300}
                            renderItem={this._renderCarousel}
                            layout={'default'}
                        /> */}
                        <View style={{backgroundColor:'#fff', marginBottom:10}}>
                            <Text style={{fontFamily:'sans-serif', fontSize:18, color:'#282833'}}>Recomended for you</Text>
                        </View>
                        <FlatList 
                            data={this.state.carouselItems}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderCarousel} />
    
                        <FlatList 
                            data={this.state.tour}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderItem}
                            style={{marginTop:20}} />
                    </View>
    
                    <View style={{ backgroundColor: '#fff', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0 }}>
                        <View style={{ flex: 1, padding: 20 }}>
                            <Text>Tes</Text>
                        </View>
                    </View>
                </Fragment>
            )
        }
    }
}

class AdminScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            carouselButton:[
                {key:0, label:'Upload New Tour', image:''},
                {key:1, label:'View Recent Tour', image:''},
                {key:2, label:'History of Ticket Purchase', image:''}
            ]
        }
    }
    _renderItem({item,index}){
        return (                
            <View style={{width:'100%', padding:20}}>
                <View style={{backgroundColor:'white', padding:20, borderRadius:30, elevation:5, alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:100, height:100}} source={require('../../assets/images/7.png')}/>
                    <Text style={{color:'blue', fontSize:20, fontWeight:'bold'}}>{item.label}</Text>
                </View>
            </View>
        )
    }
    render(){
        return(
                <LinearGradient style={{flex:1}} start={{x: 0, y: 0}} end={{x: 2, y: 2}} colors={['#60935C','#9effa6']}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image style={{width:200,height:200}} source={require('../../assets/images/2.png')}/>
                    </View>
                    <ImageBackground source={require('../../assets/images/5.png')} style={{flex:2, resizeMode:'stretch', zIndex:1}}/>
                    {/* <Image source={require('../../assets/images/9.png')} style={{flex:2, resizeMode:'stretch', width:'100%'}}/> */}
                    <View style={{position:'absolute',marginTop:height/7}}>
                        <Carousel
                            ref={ref=>this.carousel = ref}
                            data={this.state.carouselButton}
                            sliderWidth={width}
                            itemWidth={width-(width*40/100)}
                            renderItem={this._renderItem}
                            onSnapToItem={
                                index=>this.setState({activeIndex:index})
                            }
                        />
                        <View style={{backgroundColor:'white', margin:20, padding:20, borderRadius:30, elevation:5, justifyContent:'center'}}>
                            <Text style={{fontSize:20, fontWeight:'bold', color:'blue', marginBottom:20}}>Lorem Ipsum Dolor Sit amet ?</Text>
                            <Text style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </View>
                    </View>
                </LinearGradient>
        )
    }
}

export default Home