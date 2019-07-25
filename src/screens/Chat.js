import React, {Component} from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, AsyncStorage } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase/Config';
import axios from 'axios';
import URL from '../public/redux/actions/URL';

class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            messageList:[],
            messageText:'',
            from: this.props.navigation.state.params.idUser,
            to: this.props.navigation.state.params.idAdmin,
            photo: this.props.navigation.state.params.photoAdmin,
            token: this.props.navigation.state.params.token,
            user: {},
            tour: this.props.navigation.state.params.tour
        }
    }

    componentWillMount() {
        db.ref('messages').child(this.state.from).child(this.state.to).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    componentDidMount() {
        axios.get(`${URL}/user/${this.state.from}`,{
            headers:{'auth': this.state.token}
        }).then((profileData)=>{
            console.warn('profileData:',profileData.data)
            this.setState({
                user:profileData.data.result[0]
            })
        })
    }

    sendMessage = async () => {
        if (this.state.messageText.length > 0) {
            let msgId = db.ref('messages').child(this.state.from).child(this.state.to).push().key;
            let updates = {};
            let updateUserMessage = {};
            let message = {
                message: this.state.messageText,
                from: this.state.from,
                timestamp: Date.now(),
            }
            let receiverProfile = {
                uid: this.state.to,
                avatar: this.state.photo,
                messageText: this.state.messageText,
                name: this.state.tour
            }

            let senderProfile = {
                uid: this.state.from,
                avatar: this.state.user.photo == '' ? 'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887' : this.state.user.photo,
                messageText: this.state.messageText,
                name: this.state.user.name
            }
            updates['messages/' + this.state.from + '/' + this.state.to + '/' + msgId] = message;
            updates['messages/' + this.state.to + '/' + this.state.from + '/' + msgId] = message;
            db.ref().update(updates);
            updateUserMessage['users/' + this.state.from + '/message/' + this.state.to] = receiverProfile;
            updateUserMessage['users/' + this.state.to + '/message/' + this.state.from] = senderProfile;
            db.ref().update(updateUserMessage);
            this.setState({
                messageText: ''
            })
        }
    }
    
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView 
                    ref={ref => this.scrollView = ref} 
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                    style={{flex:7, padding:20, marginBottom:'20%'}}
                >
                {this.state.messageList.length>0 && this.state.messageList.map((message, i)=>(
                    <View key={i} style={{padding:5, borderRadius:30, marginBottom:20, alignItems:message.from==this.state.from?'flex-end':'flex-start'}}>
                        <View style={{flexDirection:'row', flex:1}}>
                            {message.from!==this.state.from}
                            <View style={{padding:10, borderRadius:20, backgroundColor:message.from==this.state.from?'#DCF8C6':'white'}}>
                                <Text style={{fontSize:16}}>{message.message}</Text>
                            </View>
                        </View>
                    </View>
                ))}
                </ScrollView>
                <View style={{position:'absolute', flexDirection:'row', padding:10, bottom:0, width:'100%'}}>
                    <View style={{flex:1, padding:5, borderRadius:30, backgroundColor:'white', elevation:5, flexDirection:'row'}}>
                        <TextInput style={{flex:4}} value={this.state.messageText} onChangeText={(text)=>this.setState({messageText:text})}/>
                        <TouchableOpacity style={{flex:1,padding:10, margin:5, backgroundColor:'#4EC9B0', borderRadius:50, alignItems:'center', justifyContent:'center'}} onPress={this.sendMessage}>
                            <FontAwesome name="paper-plane" style={{fontSize:20, color:'white'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Chat