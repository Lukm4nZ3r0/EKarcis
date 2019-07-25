import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput, AsyncStorage, Alert, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from "react-native-modal-datetime-picker"
import ImagePicker from 'react-native-image-picker'
import axios from 'axios'
import URL from '../public/redux/actions/URL'

const {width,height} = Dimensions.get('window')

class MyEditProfileScreen extends Component {
    //file, name-, phone-, address-, gender-, birthday-, work-
    constructor(props){
        super(props)
        this.state = {
            name:'',
            errorName:false,
            address:'',
            errorAddress:false,
            errorAddressFormat:false,
            errorForm:false,
            buttonDisabled:false,
            gender:'',
            imageLink:'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887',
            filePath:{},
            photo:[],
            phone:'',
            birthday:'',
            isDateTimePickerVisible: false,
            work:''
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    handleChoosePhoto = () => {
        this.setState({ buttonDisabled:false })
        const options = {
          noData: true,
        }
        ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
			    Alert.alert('User cancelled image picker');
			} else if (response.error) {
			    Alert.alert('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
			    Alert.alert('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri }
				const sendSource = response
			    this.setState({
				  filePath: source,
				  photo: sendSource
			    });
			}
		})
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    }
    handleDatePicked = date => {
        console.warn("A date has been picked: ", date);
        this.setState({
            birthday: date
        })
        this.hideDateTimePicker();
    }
    validateName = (text) =>{
        if(text.length>0){
            this.setState({name:text,errorName:false})
        }
        else{
            this.setState({name:'',errorName:true})
        }
    }
    validateAddress = (text) =>{
        if(text.length>0){
            this.setState({address:text,errorAddress:false})
        }
        else{
            this.setState({address:'',errorAddress:true})
        }
        this.setState({errorAddressFormat:false})
    }
    editProfileEvent = () =>{
        const {name,errorName,address,errorAddress,errorAddressFormat,gender,photo,phone,birthday,work,filePath} = this.state
        if(address.length>0 && name.length>0 && errorName==false){
            // edit event
            console.log(
                JSON.stringify(photo)+'\n'+
                photo.uri+'\n'+
                photo.fileName+'\n'+
                filePath.uri+'\n'+
                name+'\n'+
                phone+'\n'+
                address+'\n'+
                gender+'\n'+
                birthday+'\n'+
                work+'\n'
            )
            let fd = new FormData()
            fd.append('file',{
                uri: this.state.photo.uri,
                name: this.state.photo.fileName,
                type:this.state.photo.type
            })
            fd.append('name',name)
            fd.append('phone',phone)
            fd.append('address',address)
            fd.append('gender',gender)
            fd.append('birthday',birthday)
            fd.append('work',work)

            AsyncStorage.getItem('idUser').then((idUser)=>{
                axios.patch(`${URL}/auth_register/${idUser}`,fd).then((response)=>{
                    console.log('ini response dari patch', response)
                }).catch((err)=>console.log('ini error dari axios',err))
            })
            .catch((error) => console.log(error));

            this.setState({errorForm:false,buttonDisabled:true})
            this.props.navigation.goBack()
        }
        else{
            this.setState({errorForm:true,buttonDisabled:true})
        }
    }
    buttonEnabled = () =>{
        this.setState({buttonDisabled:false})
    }
    componentDidMount(){
        AsyncStorage.getItem('idUser').then((idUser)=>{
            axios.get(`${URL}/user/${idUser}`).then((responseData)=>{
                console.log('dari axios',responseData.data.result[0])
                const {email,name,phone,address,birthday,gender,work,photo,points} = responseData.data.result[0]
                this.setState({
                    address:address,
                    name:name,
                    phone:phone.toString(),
                    work:work,
                    birthday:birthday,
                    gender:gender,
                    imageLink:photo.length==0?'https://i0.wp.com/cultofdigital.com/wp-content/uploads/2018/01/wallpapers-whatsapp-cute-panda.jpg?resize=500%2C887':photo
                })
            })
        })
    }
    render() {
        const gender = [ { key:'Laki - laki', label:'Male' }, { key:'Perempuan', label:'Female' } ]
        const {name,errorName,address,errorAddress,errorAddressFormat,errorForm,buttonDisabled,imageLink,errorImage,photo,work} = this.state

        let newDate = new Date(this.state.birthday).toString().split(' ')
        newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[3]
        return (
            <View style={{flex:1, width:'100%', backgroundColor:'#C9E4BB'}}>
                <View style={{ flex:1, height:height, width:'100%'}}>
                    <ScrollView style={{flex:1, width:'100%'}}>
                        <View style={{width:'100%', marginTop:100, marginBottom:100, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flex:1, borderRadius:30, elevation:5, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:15, width:'90%'}}>

                                <TouchableOpacity style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}} onPress={this.handleChoosePhoto}>
                                    <Image style={{width:150, height:150,borderWidth:5, borderColor:'blue', borderRadius:80}} source={{uri:photo.length!=0?photo.uri:imageLink}}/>
                                </TouchableOpacity>
                                {errorForm && <Text style={{color:'red'}}>please fill in the form correctly.</Text>}

                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorAddressFormat || errorAddress ?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="map-marker" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validateAddress} value={this.state.address} placeholder="Your Address" placeholderTextColor="grey"/></View>
                                </View>

                                {errorAddress && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Address must be more than one.</Text></View>}
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:errorName?1:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="tags" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={this.validateName} value={this.state.name} placeholder="Your Name" placeholderTextColor="grey"/></View>
                                </View>

                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="phone" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} keyboardType={'numeric'} value={this.state.phone} onChangeText={(text)=>this.setState({phone:text})} placeholder="Phone Number" placeholderTextColor="grey"/></View>
                                </View>

                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', elevation:5, borderRadius:30, padding:5, margin:10, borderWidth:0, borderColor:'red'}}>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <FontAwesome name="tags" style={{fontSize:20, color:'grey'}} />
                                    </View>
                                    <View style={{flex:4, justifyContent:'center'}}><TextInput onFocus={this.buttonEnabled} onChangeText={(text)=>this.setState({work:text})} value={this.state.work} placeholder="Your Occupation" placeholderTextColor="grey"/></View>
                                </View>

                                <View style={{flex:1, marginTop:20, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                    <TouchableOpacity style={{flex:1, flexDirection:'row', alignContent:'flex-start', width:'85%'}} onPress={this.showDateTimePicker}>
                                        <View style={{flex:1}}>
                                            <Text>Birth Date : {this.state.birthday == '' ?'Tanggal Lahir': newDate}</Text>
                                        </View>
                                        <FontAwesome name="sort-down"/>
                                    </TouchableOpacity>
                                    <DateTimePicker 
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                    <View style={{width:'88%', height:1, backgroundColor:'grey', marginTop:15}} />
                                </View>

                                {errorName && <View style={{width:'90%',flex:1}}><Text style={{color:'red'}}>Please fill your name.</Text></View>}
                                <View style={{flex:1, padding:25}}>
                                    <Text style={{color:'#a7a9ab'}}>Jenis Kelamin</Text>
                                    <View style={{flex:1, width:'100%',alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flexDirection:'row', flex:1, marginTop:15, alignItems:'center', justifyContent:'center'}}>   
                                        {gender.map(item=>
                                            <View key={item.key} style={{flex:1,flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:10}}>
                                                <TouchableOpacity 
                                                style={{height:20, width:20, borderRadius:10, borderWidth:1, borderColor:'black', alignItems:'center',justifyContent:'center'}}
                                                onPress={()=>{this.setState({gender:item.key,buttonDisabled:false})}}
                                                >
                                                    { this.state.gender === item.key && (<View style={{width:14, height:14, borderRadius:7, backgroundColor:'black'}} />) }
                                                </TouchableOpacity>
                                                <Text style={{color:'#a7a9ab', fontSize:18}}>  {item.label}</Text>
                                            </View>
                                        )}
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity style={{width:'95%', marginTop:10}} onPress={this.editProfileEvent} disabled={buttonDisabled}>
                                    <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={buttonDisabled?['grey','black']:['#60935C','#C9E4BB']}>
                                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Edit Your Profile</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{position:'absolute', left:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.goBack()}>
                        <FontAwesome name="arrow-left" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default MyEditProfileScreen