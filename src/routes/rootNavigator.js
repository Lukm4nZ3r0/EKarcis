import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Search from '../screens/Search';
import SearchChild from '../screens/SearchChild';
// import User from '../screens/User';
import TimeLine from '../screens/TimeLine';
import AddTour from '../screens/AddTour';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Detail from '../screens/Detail';
import Login from '../screens/Login'
import Register from '../screens/Register'
import ForgotPassword from '../screens/ForgotPassword'
import MyProfileScreen from '../screens/MyProfileScreen'
import MyEditProfileScreen from '../screens/MyEditProfileScreen'
import RedeemPoints from '../screens/RedeemPoints'
import Chat from '../screens/Chat';
import Wishlist from '../screens/Wishlist';
import Payment from '../screens/Payment'
import Checkout from '../components/Checkout'
import MyTicket from '../components/MyTicket'
import DashboardChat from '../screens/DashboardChat';
import RecentTour from '../screens/RecentTour';

const bottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home
    },
    Timeline: {
        screen: TimeLine
    },
    Search: {
        screen: Search
    },
    Notification: {
        screen: Notification
    },
    User: {
        screen: MyProfileScreen
    },
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`;
                } else if (routeName === 'User') {
                    iconName = `ios-person`;
                } else if (routeName === 'Notification') {
                    iconName = `ios-notifications-outline`;
                } else if (routeName === 'Search') {
                    iconName = `ios-search`
                } else if (routeName === 'Timeline') {
                    iconName = `ios-today`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
          activeTintColor: 'white',
          inactiveTintColor: '#6DA765',
          style:{
              backgroundColor:'black'
          }
        },
    }
    )
    
    const appStackNavigator = createStackNavigator({
        Home: {
            screen: bottomTabNavigator,
            navigationOptions: () => ({
                header: null,
            }),
        },
        DetailTour: {
            screen: Detail,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Wishlist: {
            screen: Wishlist,
            navigationOptions: () => ({
                header: null
            })
        },
        AddTour: {
            screen: AddTour,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Login: {screen:Login},
        Register,
        ForgotPassword,
        MyProfileScreen,
        MyEditProfileScreen,
        Chat,
        SearchChild,
        RedeemPoints,
        RecentTour: {
            screen: RecentTour,
            navigationOptions: () => ({
                header: null,
            }),
        },
    // Notification : {
        //     screen: Notification,
        //     navigationOptions:({ navigation }) => ({
            //         headerStyle: {
    //             backgroundColor: '#64BA5A',
    //             elevation:0
    //         },  
    //         headerTintColor: '#fff',
    //         title: 'Notification',
    //     })
    // },
    Payment : {
        screen: Payment,
    },
    Checkout : {
        screen: Checkout,
    },
    MyTicket : {
        screen: MyTicket,
    },
    DashboardChat: {
        screen: DashboardChat,
        navigationOptions: () => ({
            header: null,
        }),
    },
})

export default createAppContainer(appStackNavigator);