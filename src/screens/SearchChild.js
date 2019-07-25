import React, {Component} from 'react'
import {View,Text,FlatList,Image, Dimensions} from 'react-native'
import axios from 'axios'
import URL from '../public/redux/actions/URL'
import querystring from 'querystring'

const {width,height} = Dimensions.get('window')

class SearchChild extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchData:[],
            nextPage:1,
            currentPage:1,
            totalPages:0,
            isLoading:false
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            headerStyle: {
                backgroundColor : 'green',
            },
            headerTintColor: 'white',
            headerTitle: (
                <Text style={{color:'white', fontSize:20}}>Search Result</Text>
            )
        }
    }
    componentDidMount(){
        axios.get(`${URL}/tour?search=${this.props.navigation.state.params.searchKey}&page=${this.state.currentPage}`).then((response)=>{
            console.warn(response.data.data)
            this.setState({
                searchData:response.data.data
            })
        })
    }
    nextPage = () =>{
        const {searchData} = this.state
        axios.get(`${URL}/tour?search=${this.props.navigation.state.params.searchKey}&page=${this.state.nextPage+1}`).then((response)=>{
            console.warn('data baru', response.data.data)
            this.setState({
                searchData:[...searchData, ...response.data.data],
                nextPage: this.state.nextPage+1
            })
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
            {this.state.searchData.length>0?
            <FlatList 
            data={this.state.searchData}
            renderItem={({item})=>{
                return(
                    <Image source={{uri:item.photo}} style={{backgroundColor:'green', width:width/3, height:width/3}} />
                    )
                }}
                numColumns={3}
                refreshing={this.state.isLoading}
                onEndReached={()=>this.state.nextPage<=this.state.totalPages&&this.nextPage()}
                onEndReachedThreshold={0.1}
                />
            :
            <View style={{alignItems:'center', justifyContent:'center', height:'100%', width:'100%'}}>
                <Image style={{width:250, height:250, opacity:0.3}} source={require('../../assets/images/6.png')}/>
                <Text style={{color:'#DFEFF9', fontSize:25, fontWeight:'bold'}}>Data Not Found</Text>
            </View>
            }
            </View>
        )
    }
}

export default SearchChild