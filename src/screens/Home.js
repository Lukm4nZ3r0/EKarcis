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
import axios from 'axios';

const HEIGHT = Dimensions.get('window').height;


class Home extends Component {

    static navigationOptions = () => ({
        header: null
    })

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
                    image:'https://cdn.idntimes.com/content-images/post/20180726/cf1e504e2e1dd20616253ecdce7beb10.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 3",
                    image:'https://cdn.brilio.net/news/2019/03/08/160528/1003118-1000xauto-wisata-jogja-murah-meriah.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 4",
                    image:'https://www.nativeindonesia.com/wp-content/uploads/2019/03/jelajah-hutan.jpg',
                    price: '20.000'
                },
                {
                    title:"Item 5",
                    image:'https://nyero.id/wp-content/uploads/2017/08/Wisata-Baru-Watu-Goyang-Mangunan-Jogja.png',
                    price: '200.000'
                }
            ],
            tour: []
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

export default Home