import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from '../screens/Home'
import Notification from '../screens/Notification'
import Payment from '../screens/Payment'
import Checkout from '../components/Checkout'
import MyTicket from '../components/MyTicket'

const appStackNavigator = createStackNavigator({
    Notification : {
        screen: Notification,
        navigationOptions:({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#64BA5A',
                elevation:0
            },  
            headerTintColor: '#fff',
            title: 'Notification',
        })
    },
    Payment : {
        screen: Payment,
    },
    Checkout : {
        screen: Checkout,
    },
    MyTicket : {
        screen: MyTicket,
    },
},
    {
        initialRouteName: 'Notification'
    },
)

export default createAppContainer(appStackNavigator);