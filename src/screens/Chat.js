import React, {Component} from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            chatMessages:[
                {no:0, imageLink:'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887', msgFrom:'Asep', msgTo:'Hakim',msg:'hehehe'},
                {no:1, imageLink:'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887', msgFrom:'Hakim', msgTo:'Asep',msg:'hehehe'},
            ],
            chatMessage:''
        }
    }
    
    render() {
        const you = 'Asep'
        return (
            <View style={{flex:1}}>
                <ScrollView 
                    ref={ref => this.scrollView = ref} 
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                    style={{flex:7, padding:20, marginBottom:'20%'}}
                >
                {this.state.chatMessages.length>0 && this.state.chatMessages.map(message=>(
                    <View key={message.no} style={{padding:5, borderRadius:30, marginBottom:20, alignItems:message.msgFrom==you?'flex-end':'flex-start'}}>
                        <View style={{flexDirection:'row', flex:1}}>
                            {message.msgFrom!==you && <Image style={{width:50, height:50, borderRadius:30}} source={{uri:message.imageLink}}/>}
                            <View style={{padding:10, borderRadius:20, backgroundColor:message.msgFrom==you?'#DCF8C6':'white'}}>
                                <Text style={{color:'blue', fontSize:20}}>{message.msgFrom}</Text>
                                <Text style={{}}>{message.msg}</Text>
                            </View>
                        </View>
                    </View>
                ))}
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