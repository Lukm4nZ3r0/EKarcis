import React, { Component } from 'react';
import {
    Animated,
    AsyncStorage,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigationFocus } from "react-navigation";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const {width,height} = Dimensions.get('window')

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,
            carouselItems: [
                {
                    title: "Gunung Kidul",
                    image: 'https://cdn1-production-images-kly.akamaized.net/mIha9hxFCGnwEUaxXl34JqAvdVk=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1543044/original/046378200_1490090990-Untitled-1.jpg',
                    price: '20.000',
                    description: 'Lorem ipsum dolor sit amet kolor molor ga kendor kendor'
                },
                {
                    title: "Pantai Kidul",
                    image: 'https://cdn.idntimes.com/content-images/post/20180726/cf1e504e2e1dd20616253ecdce7beb10.jpg',
                    price: '20.000',
                    description: 'Lorem ipsum dolor sit amet kolor molor ga kendor kendor'
                },
                {
                    title: "Dieng",
                    image: 'https://cdn.brilio.net/news/2019/03/08/160528/1003118-1000xauto-wisata-jogja-murah-meriah.jpg',
                    price: '20.000',
                    description: 'Lorem ipsum dolor sit amet kolor molor ga kendor kendor'
                },
                {
                    title: "Rawa Batu",
                    image: 'https://www.nativeindonesia.com/wp-content/uploads/2019/03/jelajah-hutan.jpg',
                    price: '20.000',
                    description: 'Lorem ipsum dolor sit amet kolor molor ga kendor kendor'
                },
                {
                    title: "Gelora Asmara",
                    image: 'https://nyero.id/wp-content/uploads/2017/08/Wisata-Baru-Watu-Goyang-Mangunan-Jogja.png',
                    price: '200.000',
                    description: 'Lorem ipsum dolor sit amet kolor molor ga kendor kendor'
                }
            ],
            activeSlide: 0,
            category: [],
            categoryImage: [
                {
                    id: '1',
                    name: 'Nature',
                    url: 'https://image.freepik.com/free-photo/tropical-green-leaves-background_53876-88891.jpg'
                },
                {
                    id: '2',
                    name: 'Culture',
                    url: 'https://image.freepik.com/free-photo/rice-field-bali_1385-1643.jpg'
                },
                {
                    id: '3',
                    name: 'Myth',
                    url: 'https://image.freepik.com/free-vector/ancient-egypt-hieroglyphics-background-with-flat-design_23-2147890315.jpg'
                },
                {
                    id: '4',
                    name: 'Beach',
                    url: 'https://image.freepik.com/free-vector/realistic-beautiful-sea-view-summer-vacation-concept_1262-11902.jpg'
                },
                {
                    id: '5',
                    name: 'Flora Fauna',
                    url: 'https://image.freepik.com/free-photo/butterfly-perched-flower_1253-106.jpg'
                }
            ],
            tour: [],
            page: 1,
            totalPage: 1,
            isLoadingFooter: false,
            favourite: [],
            role:0
        };
    }

    get pagination() {
        const { carouselItems, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 1,
                    backgroundColor: 'yellow'
                }}
                inactiveDotStyle={{
                    // waht
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={{ marginTop: -40 }}
            />
        );
    }

    nextPage = async () => {
        if(this.state.page < this.state.totalPage) {
            this.setState({ isLoadingFooter: true })
            console.warn('masukkk')
            await axios.get(`http://52.27.82.154:7000/tour?page=${this.state.page+1}`)
                .then((response) => {
                    this.setState({
                        tour: this.state.tour.concat(response.data.data.rows),
                        isLoadingFooter: false,
                        page: response.data.data.page
                    })
                    console.warn(this.state.page);
                    console.warn(this.state.tour);
                })
                .catch(error => console.warn(error));
        }
    }

    refresh = () => {
        if(this.state.isLoadingFooter) {
            return (
                <ActivityIndicator size={'large'} /> 
            )
        }

        if(this.state.page == this.state.totalPage) {
            return (
                null
            )
        } else {
            return (
                <View style={{flexDirection:'row', marginBottom:20, paddingHorizontal:25}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{borderColor:'#80c7cd', borderWidth:1, padding:10, borderRadius:5}} onPress={this.nextPage}>
                            <Text style={{textAlign:'center'}}>Load More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    favourite = (id) => {
        this.setState({
            favourite: [...this.state.favourite, id]
        })
    }

    _renderScrollViewContent() {
        return (
            <React.Fragment>
                <View style={styles.scrollViewContent}>
                    <LinearGradient 
                        style={{backgroundColor:'#6fbcc6', borderBottomRightRadius:250, borderBottomLeftRadius:250}} 
                        start={{x: 0, y: 0}} 
                        end={{x: 0, y: 1}}
                        colors={['#80c7cd','#3297b3']}>
                    <Carousel
                        data={this.state.carouselItems}
                        sliderWidth={wp('100%')}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                        itemWidth={wp(90)}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ flex: 1, paddingTop: 5 }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 13, marginTop: -30, marginBottom: 5, justifyContent: 'center', width: wp(86), height: hp(42) }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <ImageBackground source={{ uri: item.image }} style={{ width: wp(100), height: hp(30), justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <View style={{ backgroundColor: '#fff', width: '70%', borderRadius: 5, elevation: 5, marginBottom: -20, paddingVertical: 10 }}>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Text style={{ paddingHorizontal: 20, fontSize: 18, color: '#282833' }}>{item.title}</Text>
                                                    </View>
                                                    <Text style={{ paddingHorizontal: 20, paddingBottom: 10, }} numberOfLines={1}>{item.description}</Text>
                                                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, }}>
                                                        <View style={{ flex: 1 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Ionicons name='ios-star' size={18} color={'#f8d807'} />
                                                                <Text style={{ color: '#282833', marginLeft: 5 }}>Score 5</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Ionicons name='ios-star' size={18} color={'#f8d807'} />
                                                                <Text style={{ color: '#282833', marginLeft: 5 }}>Score 5</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Ionicons name='ios-star' size={18} color={'#f8d807'} />
                                                                <Text style={{ color: '#282833', marginLeft: 5 }}>Score 5</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    </LinearGradient>

                    {this.pagination}
                    
                    <View style={{flex:1}}>
                    <View style={{flexDirection:'row', paddingHorizontal:10, paddingBottom:7}}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Category</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{flex:1.7}}>
                            <FlatList
                                data={this.state.categoryImage.slice(0, 2)}
                                horizontal={true}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity>
                                            <ImageBackground source={{ uri: item.url }} style={{ height: hp(10), width: wp(32), borderRadius: 20 }}>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.090)' }}>
                                                    <Text style={{ color: '#fff', fontSize: 22 }}>{item.name}</Text>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                )
                                }} />
                                <FlatList
                                    data={this.state.categoryImage.slice(2, 4)}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity>
                                                <ImageBackground source={{ uri: item.url }} style={{ height: hp(10), width: wp(32), borderRadius: 20 }}>
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.090)' }}>
                                                        <Text style={{ color: '#fff', fontSize: 22 }}>{item.name}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        )
                                    }} />
                        </View>
                        <TouchableOpacity style={{flex:1, alignItems:'flex-end'}}>
                            <ImageBackground source={{ uri: this.state.categoryImage[4].url }} style={{ height: hp(20), width: wp(37), borderRadius: 20 }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.090)' }}>
                                    <Text style={{ color: '#fff', fontSize: 22 }}>{this.state.categoryImage[4].name}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    </View>

                    <View style={{flex:1, paddingHorizontal:10}}>
                        <View style={{flexDirection:'row', marginTop:20}}>
                            <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>Recomended</Text>
                        </View>

                        <FlatList 
                            data={this.state.tour}
                            keyExtractor={(item, index) => index.toString()}
                            style={{marginTop:30}}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', elevation:10, alignSelf:'center', borderRadius:8, width:wp(83), marginBottom:50}} onPress={() => this.props.navigation.navigate('DetailTour', {item})}>
                                        <Image source={{uri:item.photo}} style={{height:hp(16), width:wp(29), marginTop:-15, marginLeft:-15, borderRadius:8}} />
                                        <View style={{flex:1}}>
                                        <View style={{paddingHorizontal:10, paddingVertical:5}}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flex:1}}>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}} numberOfLines={1}>{item.tour}</Text>
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
                                                <Text numberOfLines={2}>{item.description}</Text>
                                            </View>
                                        </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                             />
                    </View>

                    {this.refresh()}

                </View>
            </React.Fragment>
        )
    }

    componentDidMount() {
        axios.get(`http://52.27.82.154:7000/category`)
            .then((response) => {
                this.setState({ category: response.data })
            })
            .catch(error => console.warn(error));

        axios.get(`http://52.27.82.154:7000/tour`)
            .then((response) => {
                this.setState((prevState) => {
                    return {
                        tour: response.data.data.rows,
                        page: response.data.data.page,
                        totalPage: response.data.data.totalPage
                    }
                })
            })
            .catch(error => console.warn(error));
    }

    componentDidUpdate(prevProps){
        if (prevProps.isFocused !== this.props.isFocused) {
            this.getRole = AsyncStorage.getItem('role').then((role)=>{
                console.warn('ini role dari Home.js ',role)
                this.setState({
                    role:Number(role)
                })
            })
        }
    }

    render() {

        if(this.state.role==1){
            return(
                <AdminScreen navigation={this.props.navigation} />
            )
        }
        else{
            // Because of content inset the scroll value will be negative on iOS so bring
            // it back to 0.
            const scrollY = Animated.add(
                this.state.scrollY,
                Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
            );
            const headerTranslate = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, -HEADER_SCROLL_DISTANCE],
                extrapolate: 'clamp',
            });

            const imageOpacity = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
                outputRange: [1, 1, 0],
                extrapolate: 'clamp',
            });
            const imageTranslate = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, 100],
                extrapolate: 'clamp',
            });

            const titleScale = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
                outputRange: [1, 1, 0.8],
                extrapolate: 'clamp',
            });
            const titleTranslate = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
                outputRange: [0, 0, -8],
                extrapolate: 'clamp',
            });

            return (
                <View style={styles.fill}>
                    <Animated.ScrollView
                        style={styles.fill}
                        scrollEventThrottle={1}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true },
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });
                                    axios.get('http://52.27.82.154:7000/tour')
                                    .then((response) => {
                                        this.setState((prevState) => {
                                            return {
                                                tour: response.data.data,
                                                page: response.data.page,
                                                totalPage: response.data.totalPage,
                                                refreshing: false
                                            }
                                        })
                                    })
                                    .catch(error => {
                                        console.warn(error);
                                        this.setState({
                                            refreshing: false
                                        })
                                    });
                                }}
                                // Android offset for RefreshControl
                                progressViewOffset={HEADER_MAX_HEIGHT}
                            />
                        }
                        // iOS offset for RefreshControl
                        contentInset={{
                            top: HEADER_MAX_HEIGHT,
                        }}
                        contentOffset={{
                            y: -HEADER_MAX_HEIGHT,
                        }}
                    >
                        {this._renderScrollViewContent()}
                    </Animated.ScrollView>
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.header,
                            { transform: [{ translateY: headerTranslate }] },
                        ]}
                    >
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],
                                },
                            ]} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                transform: [
                                    { translateY: titleTranslate },
                                ],
                            },
                        ]}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor:'#80c7cd', padding:20}}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent:'center' }}>
                                    <Text style={{ fontSize: 24, color: '#fff' }}>EXtick</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DashboardChat')}>
                                            <Ionicons name='ios-chatbubbles' size={26} color={'#fff'} style={{ marginRight: 20 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Wishlist')}>
                                            <AntDesign name='heart' size={24} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            );
        }
    }
}

class CarouselItem extends Component {

    _goNavigate(key) {
        if(key == 0) {
            this.props.navigation.navigate('AddTour', { id: this.props.id });
        }
    }

    render() {
        return (
            <View style={{width:'100%', padding:20}}>
                <TouchableOpacity style={{backgroundColor:'white', padding:20, borderRadius:30, elevation:5, alignItems:'center', justifyContent:'center'}} onPress={() => this._goNavigate(this.props.item.key)}>
                    <Image style={{width:100, height:100}} source={require('../../assets/images/7.png')}/>
                    <Text style={{color:'blue', fontSize:20, fontWeight:'bold'}}>{this.props.item.label}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class AdminScreen extends Component{
    constructor(props){
        super(props)
        this._bootstrapAsync()
        this.state = {
            carouselButton:[
                {key:0, label:'Upload New Tour', image:''},
                {key:1, label:'View Recent Tour', image:''},
                {key:2, label:'History of Ticket Purchase', image:''}
            ],
            idUser: 0
        }
    }

    async _bootstrapAsync() {
        await AsyncStorage.getItem('idUser', (error, result) => {
            if(result) {
                this.setState({ idUser: result })
            }
        })
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
                            renderItem={({item, index}) => {
                                return (
                                    <CarouselItem navigation={this.props.navigation} item={item} index={index} id={this.state.idUser} />
                                )
                            }}
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

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#C9E4BB',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: 'cover',
    },
    bar: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? 60 : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default withNavigationFocus(Home)