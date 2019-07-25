import React, {Component} from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase/Config';

class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            messageList:[],
            messageText:'',
            from: this.props.navigation.state.params.idUser,
            to: this.props.navigation.state.params.idAdmin
        }
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.from).child(this.state.to).push().key;
            let updates = {};
            let updateUserMessage = {};
            let message = {
                message: this.state.messageText,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.from
            }
            let receiverProfile = {
                uid: this.state.to,
                avatar: this.state.person.avatar,
                time: firebase.database.ServerValue.TIMESTAMP,
                messageText: this.state.textMessage
            }

            let senderProfile = {
                uid: User.uid,
                name: User.name,
                avatar: User.avatar,
                time: firebase.database.ServerValue.TIMESTAMP,
                messageText: this.state.messageText
            }
            updates['messages/' + User.uid + '/' + this.state.person.uid + '/' + msgId] = message;
            updates['messages/' + this.state.person.uid + '/' + User.uid + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            updateUserMessage['users/' + User.uid + '/message/' + this.state.person.uid] = receiverProfile;
            updateUserMessage['users/' + this.state.person.uid + '/message/' + User.uid] = senderProfile;
            firebase.database().ref().update(updateUserMessage);
            this.setState({
                textMessage: ''
            })
        }
    }
    
    render() {
        console.warn(this.props.navigation.state.params.idAdmin);
        return (
            <View style={{flex:1}}>
                <ScrollView 
                    ref={ref => this.scrollView = ref} 
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                    style={{flex:7, padding:20, marginBottom:'20%'}}
                >
                {/* {this.state.messageList.length>0 && this.state.messageList.map(message=>(
                    <View key={message.no} style={{padding:5, borderRadius:30, marginBottom:20, alignItems:message.msgFrom==you?'flex-end':'flex-start'}}>
                        <View style={{flexDirection:'row', flex:1}}>
                            {message.msgFrom!==you && <Image style={{width:50, height:50, borderRadius:30}} source={{uri:message.imageLink}}/>}
                            <View style={{padding:10, borderRadius:20, backgroundColor:message.msgFrom==you?'#DCF8C6':'white'}}>
                                <Text style={{color:'blue', fontSize:20}}>{message.msgFrom}</Text>
                                <Text style={{}}>{message.msg}</Text>
                            </View>
                        </View>
                    </View>
                ))} */}
                </ScrollView>
                <View style={{position:'absolute', flexDirection:'row', padding:10, bottom:0, width:'100%'}}>
                    <View style={{flex:1, padding:5, borderRadius:30, backgroundColor:'white', elevation:5, flexDirection:'row'}}>
                        <TextInput style={{flex:4}} value={this.state.chatMessage} onChangeText={(text)=>this.setState({chatMessage:text})}/>
                        <TouchableOpacity style={{flex:1,padding:10, margin:5, backgroundColor:'#4EC9B0', borderRadius:50, alignItems:'center', justifyContent:'center'}} onPress={this.sendChat}>
                            <FontAwesome name="paper-plane" style={{fontSize:20, color:'white'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Chat