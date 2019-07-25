import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import axios from 'axios';

export default class Paid extends Component {
    
    static navigationOptions = {
        title: 'Paid',
    }

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://192.168.6.101:7000/get_data_transaction?id_user=${1}&status=${'paid'}`)
        .then((res) => {
            let data = res.data.data;
            if (data.length < 0) {
                this.setState({ loading: false, isEmpty: true });
            }
            else {
                this.setState({
                    'data': data,
                    loading: false 
                });
            }
        })
        .catch(error => {
            alert(error)
            this.setState({ loading: false, error: "something went wrong" });
        });
    }

    render() {
        return (
            <View style={{ flex:1 }}>
                <View>
                    <FlatList
                        style={{ paddingVertical:20 }}
                        data={this.state.data}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('MyTicket')}
                                style={{ flexDirection:'row', borderRadius:5, padding:8, marginHorizontal:20, elevation:2, backgroundColor:'#e9f5f3', alignItems:'center', marginVertical:6}}
                            >
                                <Icon
                                    style={{marginLeft: 10, marginRight:25}}
                                    name='ticket'
                                    size={32}
                                    color='green'
                                />
                                <View>
                                    <Text style={{ fontSize:16, marginBottom:2 }}>Ticket purchased & check your ticket</Text>
                                    <Text>{moment(item.booking_date).format('DD-MM-YYYY hh:mm')}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item,index)=>index.toString()}
                    />
                </View>
            </View>
        )
    }
}