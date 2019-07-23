import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Search from '../screens/Search';
import User from '../screens/User';
import TimeLine from '../screens/TimeLine';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Detail from '../screens/Detail';

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
        screen: User
    }
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
        })
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
    }
})

export default createAppContainer(appStackNavigator);