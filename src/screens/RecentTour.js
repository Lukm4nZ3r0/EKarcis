import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class RecentTour extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isLogin: false,
            tour: []
        }
    }

    componentDidMount() {
        axios.get(`http://52.27.82.154:7000/tour/admin/${this.props.navigation.state.params.id}`)
        .then((res) => {
            this.setState({ tour: res.data })
        })
        .catch((error) => Alert.alert(
            'Uhoh :(',
            'Please check your internet connection'
        ))
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', elevation:10, alignSelf:'center', borderRadius:8, width:'88%', marginBottom:50}} onPress={() => this.props.navigation.navigate('DetailTour', {item})}>
                <Image source={{uri:item.photo}} style={{height:80, width:80, marginTop:-15, marginLeft:-15, borderRadius:8}} />
                <View style={{flex:1}}>
                <View style={{paddingHorizontal:10, paddingVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:5}}>
                                    <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>{item.tour}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <Text numberOfLines={2}>{item.description}</Text>
                    </View>
                </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Fragment>

                <ScrollView style={{marginTop:60}}>
                    <View style={{flex:1, marginTop: 30}}>

                        <FlatList 
                        data={this.state.tour}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem} />

                    </View>
                </ScrollView>

                <View style={{ backgroundColor: 'green', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0, }}>
                    <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal:15 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <AntDesign name='arrowleft' size={27} color={'#fff'} />
                            </TouchableOpacity>
                            <Text style={{fontSize:20, marginLeft:15, fontFamily:'sans-serif-medium', color:'#fff'}}>Recent Tour</Text>
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }
}