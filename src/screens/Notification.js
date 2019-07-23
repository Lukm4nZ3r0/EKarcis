import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Fontisto';
import Paid from '../components/Paid'

const data = [
    {
        title:"Order not paid",
        time:"22-07-2019 11:50"
    },
    {
        title:"Order not paid",
        time:"25-07-2019 12:50"
    },
];

class Notification extends Component {
    
    static navigationOptions = {
        title: 'Unpaid',
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
                                onPress={() => this.props.navigation.navigate('Payment')}
                                style={{ flexDirection:'row', borderRadius:5, padding:8, marginHorizontal:20, elevation:2, backgroundColor:'#e9f5f3', alignItems:'center', marginVertical:6}}
                            >
                                <Icon
                                    style={{marginLeft: 10, marginRight:25}}
                                    name='ticket'
                                    size={32}
                                    color='#894cba'
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

//Tab Navigation
const TabNavigator = createMaterialTopTabNavigator(
    {
      unpaid: Notification,
      paid: Paid,
    },
    {
      tabBarOptions: {
        activeTintColor: "green",
        inactiveTintColor: "black",
        style: {
          backgroundColor: "#fff"
        },
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        indicatorStyle: {
          borderBottomColor: "#87B56A",
          borderBottomWidth: 2
        }
      }
    }
);
export default createAppContainer(TabNavigator);