import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image  } from 'react-native';
import { 
    createAppContainer, 
    createMaterialTopTabNavigator, 
} from 'react-navigation';
import { 
    FlatList, 
    TouchableOpacity
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import Paid from '../components/Paid';
import moment from 'moment';
import axios from 'axios';
// import LottieView from 'lottie-react-native';

class Notification extends Component {
    
    static navigationOptions = {
        title: 'Unpaid',
    }

    
    constructor(props) {
        super(props);
        this._bootstrapAsync();
        this.state = {
            data: [],
            loading: true,
            isEmpty: false,
            token: '',
            isLogin: false
        }
    }

    _bootstrapAsync = async () => {
        await AsyncStorage.getItem('token', (error, result) => {
            if(result) {
                this.setState({ token: result })
            }
        })

        if(this.state.token) {
            this.setState({ isLogin: true })
        } else {
            this.setState({ isLogin: false })
        }
    }

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
              () => {
                this._bootstrapAsync();
              }
          );
        this.getData();
    }

    getData = () => {
        axios.get(`http://52.27.82.154:7000/get_data_transaction?id_user=${1}&status=${'unpaid'}`)
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
        console.warn(this.state.token);
        if(this.state.isLogin == false) {
            return (
                <React.Fragment>
                    <View style={{flex:2, backgroundColor:'#F2F6FE',alignItems:'center', justifyContent:'center', opacity:0.3}}>
                        <Image style={{width:250, height:250}} source={require('../../assets/images/6.png')}/>
                        <Text style={{color:'#575757', fontSize:20}}>Anda belum login</Text>
                    </View>
                </React.Fragment>
            )
        } else {
            return (
                <View style={{ flex:1 }}>
                    {/* <LottieView source={require('..assets/spinner.json')} autoPlay loop /> */}
                    <View>
                        <FlatList
                            style={{ paddingVertical:20 }}
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Checkout', item)}
                                    style={{ flexDirection:'row', borderRadius:5, padding:8, marginHorizontal:20, elevation:2, backgroundColor:'#e9f5f3', alignItems:'center', marginVertical:6}}
                                >
                                    <Icon
                                        style={{marginLeft: 10, marginRight:25}}
                                        name='ticket'
                                        size={32}
                                        color='#894cba'
                                    />
                                    <View>
                                        <Text style={{ fontSize:16, marginBottom:2 }}>Please complete your payment</Text>
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
