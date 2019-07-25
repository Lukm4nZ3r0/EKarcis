import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    TextInput, 
    SafeAreaView, 
    Picker, 
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    PermissionsAndroid,
    AsyncStorage
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class extends Component {

    constructor(props) {
        super(props);

        this.getUserLocation()
        this._bootstrapAsync()

        this.state = {
            province: [],
            category: [],
            selectedProvince: '',
            filePath: {},
            image: null,
            tour: '',
            address: '',
            description: '',
            selectedCategory: '',
            isLoading: false,
            price: 0,
            latitude: 0,
            longitude: 0,
            idUser: 0
        }
    }
    
    async getUserLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert("You can use the location")
                await navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                    },
                    (error) => {
                        console.warn('Error ' + error.message)
                    },
                    { enableHighAccuracy: true, maximumAge: 1000, timeout: 200000 }
                )
            }
            else {
                alert("Location permission denied")
            }
        }
        catch (err) {
            console.warn(err)
        }
    }

    async _bootstrapAsync() {
        await AsyncStorage.getItem('idUser', (error, result) => {
            if(result) {
                this.setState({ idUser: result})
            }
        })
    }

    componentDidMount() {
        axios.get('http://52.27.82.154:7000/province')
        .then((responses) => {
            this.setState({
                province: responses.data
            })
        })

        axios.get('http://52.27.82.154:7000/category')
        .then((responses) => {
            this.setState({
                category: responses.data
            })
        })
    }

    handleUpdateImage = async () => {
		const options = {
			noData: true,
			mediaType: 'photo'
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
				  image: source,
				  filePath: sendSource
			    });
			}
		})
    }
    
    changeAddress = (val) => {
        this.setState({
            address: val
        })
    }

    changeTour = (val) => {
        this.setState({
            tour: val
        })
    }

    changeDescription = (val) => {
        this.setState({
            description: val
        })
    }

    changeDistrict = (val) => {
        this.setState({  })
    }

    addTour = () => {
        this.setState({
            isLoading: true
        })
        let data = new FormData();
        data.append('photo',{
            uri:this.state.filePath.uri,
            name:this.state.filePath.fileName,
            type:'image/jpg'
        });
        data.append('tour', this.state.tour);
        data.append('addres', this.state.address);
        data.append('description', this.state.description);
        data.append('latitude', this.state.latitude);
        data.append('longitude', this.state.longitude);
        data.append('cost', this.state.price);
        data.append('id_province', this.state.selectedProvince);
        data.append('id_category', this.state.selectedCategory);
        data.append('id_admin', this.props.navigation.state.params.id);

        axios.post('http://52.27.82.154:7000/tour', data)
        .then((responses) => {
            console.warn(responses)
            this.setState({ isLoading: false })
        })
        .catch(error => {
            console.warn(error)
            this.setState({ isLoading: false })
        });
    }

    render() {
        return (
            <React.Fragment>
                <ScrollView style={{marginTop:80, paddingHorizontal:20, paddingVertical:10}}>
                    <SafeAreaView style={{marginBottom:20}}>
                        <View>
                            {
								this.state.image != null ? 
                                <Image style={{height: 200, margin: 2}} source={this.state.image}/> : 
                                <TouchableOpacity style={{borderStyle:'dashed', height:200, borderWidth:1, borderRadius:5, alignItems:'center', justifyContent:'center'}} onPress={this.handleUpdateImage}>
                                    <AntDesign name='plus' size={24} />
                                    <Text>Click to select image</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{backgroundColor:'#fff', marginTop:10}}>
                            <TextInput placeholder='Tour name...' style={{borderWidth:1, borderColor:'#5bf41a', padding:10, backgroundColor:'#fff', borderRadius:5}} onChangeText={this.changeTour} />

                            <TextInput placeholder='Tour address...' style={{borderWidth:1, borderColor:'#5bf41a', padding:10, backgroundColor:'#fff', borderRadius:5, marginTop:10}} onChangeText={this.changeAddress} />

                            <TextInput placeholder='District...' style={{borderWidth:1, borderColor:'#5bf41a', padding:10, backgroundColor:'#fff', borderRadius:5, marginTop:10}} onChangeText={this.changeDistrict} />

                            <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 18, marginBottom:5}}>Price</Text>
                                    <NumericInput 
                                            value={this.state.price} 
                                            onChange={text => {
                                                this.setState({
                                                    price: text
                                                })
                                            }} 
                                            totalWidth={wp(60)} 
                                            totalHeight={40} 
                                            iconSize={25}
                                            step={1}
                                            minValue={1}
                                            rounded 
                                            rightButtonBackgroundColor='#41d11f' 
                                            leftButtonBackgroundColor='#41d11f' 
                                        />
                                </View>
                            </View>

                            <TextInput placeholder='Description...' style={{borderWidth:1, borderColor:'#5bf41a', padding:10, marginTop:10, height:150, borderRadius:5}} multiline={true} onChangeText={this.changeDescription} />
                        </View>

                        <View style={{marginTop:10, backgroundColor:'#f1f1f1'}}>
                            <Picker
                                selectedValue={this.state.selectedProvince}
                                mode={'dropdown'}
                                style={{width:200, height:50}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({selectedProvince: itemValue})
                                }>
                                    <Picker.Item value='' label="Select Province" />
                                {
                                    this.state.province.map(data => (
                                        <Picker.Item value={data.id} label={data.province} key={data.id} />
                                    ))
                                }
                            </Picker>
                        </View>

                        <View style={{marginTop:10, backgroundColor:'#f1f1f1'}}>
                            <Picker
                                selectedValue={this.state.selectedCategory}
                                mode={'dropdown'}
                                style={{width:200, height:50}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({selectedCategory: itemValue})
                                }>
                                    <Picker.Item value='' label="Select Category" />
                                {
                                    this.state.category.map(data => (
                                        <Picker.Item value={data.id} label={data.name} key={data.id} />
                                    ))
                                }
                            </Picker>
                        </View>

                        {
                            this.state.isLoading === true ? 
                            <ActivityIndicator size={'large'} style={{justifyContent:'center', alignItems:'center', padding:20}} /> :
                            <TouchableOpacity style={{backgroundColor:'#30d922', marginTop:30, marginBottom:30, alignItems:'center', padding:10, borderRadius:15, elevation:4}} onPress={() => this.addTour()}>
                                <Text style={{color:'#fff', fontSize:20}}>Send!</Text>
                            </TouchableOpacity>
                        }
                    </SafeAreaView>
                </ScrollView>

                <View style={{ backgroundColor: '#30d922', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0, }}>
                    <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal:20 }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <AntDesign name='arrowleft' size={27} color={'#fff'} />
                            </TouchableOpacity>
                            <Text style={{fontSize:20, marginLeft:10, fontFamily:'sans-serif-medium', color:'#fff'}}>Add Tour</Text>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        )
    }
}