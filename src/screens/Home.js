import React, {Component} from 'react'
import { View, Text } from 'react-native';

class Home extends Component {
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    render() {
        return (
            <View>
                <Text>Heloo</Text>
            </View>
        )
    }
}

export default Home