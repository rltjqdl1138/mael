import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import deviceCheck from '../deviceCheck'

import PlayingBar from './PlayingBar'

const Playbar = (props)=>{
    //const {title, list, index, url} = props
    const { handlePlay, handlePause, isPlaying } = props
    const title = props.title ? props.title : 'Testing!'
    const testing = {
        title: 'this is title, Testing!',
        index: 0,
        url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
    return(
        <View style={styles.container}>
            <View style={styles.playingbarContainer}>
                <PlayingBar />
            </View>
            <View style={styles.mainContainer}>

                

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        borderTopColor:'#000',
        borderTopWidth:1,
        backgroundColor:'#fff'
    },
    playingbarContainer:{
        height:25,
        width:'100%',
    },
    mainContainer:{
        flex:5,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',

        backgroundColor:'#fff'
    },


})


export default Playbar