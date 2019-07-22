import React, { Component, Fragment } from 'react';
import { 
    View, 
    Text, 
    Dimensions, 
    Image, 
    FlatList, 
    TouchableOpacity 
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const HEIGHT = Dimensions.get('window').height;

export default class Home extends Component {

    static navigationOptions = () => {

        return {
            header: null
        }
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, marginBottom:10, elevation:5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
                        <Image source={{ uri: item.image }} style={{ width: 110, height: 110, borderRadius: 8 }} />
                    </View>
                    <View style={{ padding: 5, flex: 1 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'sans-serif-medium', color: '#282833' }}>{item.name}</Text>
                        <Text numberOfLines={2}>{item.description}</Text>
                        <EvilIcon name='location' />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const data = [
            {
                id: '1',
                name: 'Nama Tempat',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'http://www.paketwisatajogja.biz/wp-content/uploads/2017/11/Pantai-Pulau-Kalong.jpg',
                price: '20.000',
                ticketAmount: '200/200',
                category: 'Nature',
                lat: '',
                lng: ''
            },
            {
                id: '2',
                name: 'Nama Tempat',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'https://cdn-image.hipwee.com/wp-content/uploads/2018/01/hipwee-Pesona-Pantai-Gesing.jpg',
                price: '20.000',
                category: 'Nature',
                ticketAmount: '200/200',
                lat: '',
                lng: ''
            },
            {
                id: '3',
                name: 'Nama Tempat',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'https://cdn-image.hipwee.com/wp-content/uploads/2018/01/hipwee-20170221040347-750x563.jpeg',
                price: '20.000',
                category: 'Nature',
                ticketAmount: '200/200',
                lat: '',
                lng: ''
            },
            {
                id: '4',
                name: 'Nama Tempat',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'https://cdn-image.hipwee.com/wp-content/uploads/2018/01/hipwee-pinus-pengger-foto-dari-@kangnuriel-758x505-750x500.jpg',
                price: '20.000',
                category: 'Nature',
                ticketAmount: '200/200',
                lat: '',
                lng: ''
            },
            {
                id: '5',
                name: 'Nama Tempat',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                image: 'https://cdn-image.hipwee.com/wp-content/uploads/2018/01/hipwee-Air-Terjun-Kedung-Kandang-By-oddzhaheho-740x493.jpg',
                price: '20.000',
                category: 'Nature',
                ticketAmount: '200/200',
                lat: '',
                lng: ''
            }
        ]

        return (
            <Fragment>
                <View style={{ flex: 1, backgroundColor: '#f1f1f1', marginTop: 60, paddingHorizontal: 7, paddingVertical: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FlatList 
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem} />
                    </View>
                </View>

                <View style={{ backgroundColor: '#fff', elevation: 5, position: 'absolute', top: 0, right: 0, left: 0 }}>
                    <View style={{ flex: 1, padding: 20 }}>
                        <Text>Tes</Text>
                    </View>
                </View>
            </Fragment>
        )
    }
}