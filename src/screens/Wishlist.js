import React, {Component, Fragment} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    Alert, 
    ActivityIndicator,
    FlatList
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Wishlist extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isLogin: false,
            tour: [],
            id: this.props.navigation.state.params.id
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        axios.get(`http://52.27.82.154:7000/wishlist?id_user=${this.state.id}`)
        .then((res) => {
            this.setState({ 
                tour: res.data.data,
                isLoading: false
            })
        })
        .catch(() => Alert.alert(
            'Uhoh :(',
            'Please check your internet connection'
        ) & this.setState({ isLoading: false }))
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', elevation:10, alignSelf:'center', borderRadius:8, width:'88%', marginBottom:50}} onPress={() => this.props.navigation.navigate('DetailTour', {item})}>
                <Image source={{uri:item.photo}} style={{height:100, width:100, marginTop:-15, marginLeft:-15, borderRadius:8}} />
                <View style={{flex:1}}>
                <View style={{paddingHorizontal:10, paddingVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:5}}>
                                    <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>{item.tour}</Text>
                                </View>
                                <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={() => this.favourite(item.id_tour)}>
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
                        <Text numberOfLines={2}>{item.description}</Text>
                    </View>
                </View>
                </View>
            </TouchableOpacity>
        )
    }

    favourite = (idTour) => {
        this.setState({ isLoading: true });

        axios.post(`http://52.27.82.154:7000/wishlist?id_user=${this.state.id}&id_tour=${idTour}`)
        .then((response) => {
            this.setState((prevState) => {
                return {
                    tour: response.data.data,
                    isLoading: false
                }
            })
        })
        .catch(() => {
            Alert.alert(
                'Uhoh :(',
                'Please check your internet connection'
            )
        })
    }

    render() {
        return (
            <Fragment>

                <ScrollView style={{marginTop:60}}>

                    <View style={{flex:1, marginTop: 30}}>
                    {
                        this.state.isLoading == true ? <ActivityIndicator size={'large'} /> : 

                        <FlatList 
                        data={this.state.tour}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()} />

                    }
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