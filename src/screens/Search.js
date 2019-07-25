import React, {Component} from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import URL from '../public/redux/actions/URL'
import querystring from 'querystring'

const {width,height} = Dimensions.get('window')

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataFeed:[],
            searchKey:'',
            nextPage:1,
            currentPage:1,
            totalPages:0,
            isLoading:false
        }
    }
    componentDidMount(){
        axios.get(`${URL}/tour`).then((response)=>{
            console.warn(response.data)
            this.setState({
                dataFeed:response.data.data.rows,
                totalPages:response.data.data.totalPage,
            })
        })
    }
    nextPage = () =>{
        const {dataFeed} = this.state
        axios.get(`${URL}/tour?page=${this.state.nextPage+1}`).then((response)=>{
            console.warn('data baru', response.data.data.rows)
            this.setState({
                dataFeed:[...dataFeed, ...response.data.data.rows],
                nextPage: this.state.nextPage+1
            })
        })
    }
    searchFunction = () =>{
        this.state.searchKey.length>0 ? 
        this.props.navigation.navigate('SearchChild',{searchKey:this.state.searchKey}):Alert.alert('please enter the keyword correctly')
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#FFFFFF', elevation:5, height:70}}>
                    <View style={{flex:1,flexDirection:'row', alignItems:'center', margin:10, padding:5, backgroundColor:'#F0F0F0', borderRadius:20}}>
                        <FontAwesome name="search" style={{fontSize:25, color:'grey'}} />
                        <TextInput placeholder="Search .." placeholderTextColor="grey" style={{flex:5}} onChangeText={(text)=>this.setState({searchKey:text})} />
                    </View>
                    <TouchableOpacity style={{borderRadius:30, width:50, height:50, backgroundColor:'#F0F0F0', alignItems:'center', justifyContent:'center', marginRight:5}} onPress={this.searchFunction}>
                        <FontAwesome name="search" style={{fontSize:20, color:'#353535'}} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:10}}>
                <FlatList 
                    data={this.state.dataFeed}
                    renderItem={({item})=>{
                        return(
                        <Image source={{uri:item.photo}} style={{backgroundColor:'white', width:width/3, height:width/3}} />
                        )
                    }}
                    numColumns={3}
                    refreshing={this.state.isLoading}
                    onEndReached={()=>this.state.nextPage<=this.state.totalPages&&this.nextPage()}
                    onEndReachedThreshold={0.1}
                />
                </View>
            </View>
        )
    }
}