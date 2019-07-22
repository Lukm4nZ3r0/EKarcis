import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from '../screens/Home'

const appStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
    }
})

export default createAppContainer(appStackNavigator);