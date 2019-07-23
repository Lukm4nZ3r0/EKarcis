import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

class Overview extends Component {
    render() {
        return (
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicon name='ios-timer' size={24} color={'#66c00c'} />
                    <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'sans-serif-medium', color: '#282833' }}>8 hours</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <EvilIcon name='location' size={26} color={'#66c00c'} style={{ marginLeft: -4 }} />
                    <Text style={{ fontSize: 18, marginLeft: 6, fontFamily: 'sans-serif-medium', color: '#282833' }}>{this.props.navigation.state.params.item.province}</Text>
                </View>
                <View style={{ flex: 1, marginTop: 8, marginBottom: 100 }}>
                    <Text style={{ fontSize: 15 }}>
                        {this.props.navigation.state.params.item.description}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

export default class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActiveHome: false,
            isActiveImage: false,
            isActiveMaps: false,
            button: [
                {
                    key: 0,
                    buttonName: 'Overview',
                    isActive: true
                },
                {
                    key: 1,
                    buttonName: 'Maps',
                    isActive: true
                },
                {
                    key: 2,
                    buttonName: 'Review',
                    isActive: true
                }
            ],
            buttonSelected: 0,
            tour: []
        }
    }

    setActive = (key) => {
        this.setState({
            buttonSelected: key
        })
    }

    renderItem = (key) => {
        if(key == 0) {
            return (
                <Overview navigation={this.props.navigation} />
            )
        } else if(key == 1) {
            return (
                <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicon name='ios-timer' size={24} color={'#66c00c'} />
                        <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'sans-serif-medium', color: '#282833' }}>8 hours</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <EvilIcon name='location' size={26} color={'#66c00c'} style={{ marginLeft: -4 }} />
                        <Text style={{ fontSize: 18, marginLeft: 6, fontFamily: 'sans-serif-medium', color: '#282833' }}>{this.props.navigation.state.params.item.location}</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 8, marginBottom: 100 }}>
                        <Text style={{ fontSize: 15 }}>
                            Tes
                        </Text>
                    </View>
                </ScrollView>
            )
        } else if(key == 2) {
            return (
                <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicon name='ios-timer' size={24} color={'#66c00c'} />
                        <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'sans-serif-medium', color: '#282833' }}>8 hours</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <EvilIcon name='location' size={26} color={'#66c00c'} style={{ marginLeft: -4 }} />
                        <Text style={{ fontSize: 18, marginLeft: 6, fontFamily: 'sans-serif-medium', color: '#282833' }}>{this.props.navigation.state.params.item.location}</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 8, marginBottom: 100 }}>
                        <Text style={{ fontSize: 15 }}>
                            Tes
                        </Text>
                    </View>
                </ScrollView>
            )
        }
    }

    // componentDidMount() {
    //     axios.get()
    // }

    render() {
        return (
            <Fragment>
                <View style={{ backgroundColor: '#0000ff' }}>
                    <Image source={{ uri: this.props.navigation.state.params.item.photo }} style={{ height: 350, zIndex: -999 }} />
                </View>
                <View style={{ backgroundColor: '#fff', marginTop: -20, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.state.button.map(data => (
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setActive(data.key)}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'sans-serif-medium', color: '#808080' }}>{data.buttonName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                {   
                    this.renderItem(this.state.buttonSelected)
                }

                <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, color: '#282833', fontFamily: 'sans-serif-medium' }}>Rp. {this.props.navigation.state.params.item.cost}</Text>
                                <Text>/person</Text>
                            </View>
                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#66c00c', paddingVertical: 11, borderRadius: 50, elevation: 5 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Buy Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ position: 'absolute', top: 15, left: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicon name='ios-arrow-back' size={30} color={'#fff'} style={{ backgroundColor: 'rgba(0,0,0,0.087)', paddingHorizontal: 10, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
            </Fragment>
        )
    }
}