import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { db } from '../firebase/Config';

export default class DashboardChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            id: this.props.navigation.state.params.id,
            token: this.props.navigation.state.params.token
        }
    }

    componentWillMount() {
        let dbRef = db.ref(`users/${this.state.id}/message`);
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            this.setState((prevState) => {
                return {
                    user: [...prevState.user, person]
                }
            })
        })

        dbRef.on('child_changed', (val) => {
            let person = val.val();
            person.uid = val.key;
            this.setState((prevState) => {
                return {
                    user: prevState.user.map(user => {
                        if(user.uid === person.uid) {
                            user = person
                        }
                        return user
                    })
                }
            })
        })
    }

    _renderItem = ({item}) => {        
        return (
            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, elevation:15}} onPress={() => this.props.navigation.navigate('Chat', {
                idAdmin: item.uid,
                idUser: this.state.id,
                photoAdmin: item.avatar,
                token: this.state.token,
                tour: item.name
            })}>
                <Image source={{uri:item.avatar}} style={{height:50, width:50, borderRadius:100}} />
                <View style={{flex:1, marginLeft:10}}>
                    <Text style={{fontSize:18, fontFamily:'sans-serif-medium', color:'#282833'}}>{item.name}</Text>
                    <Text numberOfLines={2}>{item.messageText}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.warn(this.state.user);
        return (
            <Fragment>
                <ScrollView style={{marginTop:60}}>
                    <View style={{paddingHorizontal:15, marginVertical:20,}}>
                        <FlatList 
                        data={this.state.user}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem} />
                    </View>
                </ScrollView>

                <LinearGradient 
                    style={{height:300, width:300, borderRadius: 600, marginBottom:-40, marginRight:-80, bottom:0, right:0, position:'absolute', zIndex:-1}}
                    colors={['#60935C','#C9E4BB']}
                    start={{x: 1, y: 0.4}} 
                    end={{x: 0, y: 0}} />

                <View style={{ backgroundColor: 'green', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0, }}>
                    <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal:15 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <AntDesign name='arrowleft' size={27} color={'#fff'} />
                            </TouchableOpacity>
                            <Text style={{fontSize:20, marginLeft:15, fontFamily:'sans-serif-medium', color:'#fff'}}>Chat</Text>
                        </View>
                    </View>
                </View>                
            </Fragment>
        )
    }
}