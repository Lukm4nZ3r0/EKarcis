import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import ForgotPassword from '../screens/ForgotPassword'
import MyProfileScreen from '../screens/MyProfileScreen'
import MyEditProfileScreen from '../screens/MyEditProfileScreen'
import Chat from '../screens/Chat'

const appStackNavigator = createStackNavigator({
    Home,
    Login,
    Register,
    MyEditProfileScreen,
    MyProfileScreen,
    ForgotPassword,
    Chat,
})

export default createAppContainer(appStackNavigator);