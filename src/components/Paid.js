import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Fontisto';

const data = [
    {
        title:"Ticket has been purchased",
        time:"22-07-2019 11:50"
    },
    {
        title:"Ticket has been purchased",
        time:"25-07-2019 12:50"
    },
    {
        title:"Ticket has been purchased",
        time:"10-07-2019 16:50"
    },
];

export default class Paid extends Component {
    
    static navigationOptions = {
        title: 'Paid',
    }

    constructor(props) {
        super(props);
        this.state = {
            data:data
        }
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
                                    <Text style={{ fontSize:16, marginBottom:2 }}>{item.title}</Text>
                                    <Text>{item.time}</Text>
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