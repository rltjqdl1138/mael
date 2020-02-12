import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import PlayingBar from '../components/PlayingBar'



export default class PlayingContainer extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.albumContainer}>
                    <Image style={styles.albumArt}
                        source={require('../image/owl.jpg')}
                    />
                    <Text>
                        Mostly Series > Mostly Animals 이런거
                    </Text>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.props.conf.title}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#aaa',
        alignItems: 'center',
    },
    playingBarContainer:{
        height:80,
        backgroundColor:'#fff'
    },

    // ALBUM ART
    albumContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height:200,
        backgroundColor:'#fff',
        width:'100%'
    },
    albumArt:{
        height:140,
        width:140,
        resizeMode:'cover'
    },

    // TITLE
    titleContainer:{
        width:'100%'
    },
    title:{
        textAlign:'center',
        fontSize:20
    }
})