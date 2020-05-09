import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, Dimensions} from 'react-native'
import deviceCheck from '../deviceCheck'
import PlayingBar from './PlayingBar'
import { AudioActions } from '../store/actionCreator'
const {width} = Dimensions.get('window')



const MiniPlayingbar = (props)=>{
    const { list, index, url, title, albumTitle, handleNext } = props
    const { isPlaying, isLoaded } = props
    const PLAYBACK_LIMIT = 5000
    const minibarSize = props.minibarSize * 0.7
    
    const getButton = (props) =>{
        const {isPlaying, isLoaded, handlePause, handleResume } = props
        if(isPlaying)
            return (
                <TouchableOpacity style={styles.buttonItem}
                    onPress={()=>{if(isLoaded)handlePause()}}>
                        <Image style={styles.buttonItemImage}
                            source={require('../icon/pause.png')} />
                </TouchableOpacity>)
        return (
            <TouchableOpacity style={styles.buttonItem}
                onPress={()=>{handleResume()}} >
                    <Image style={styles.buttonItemImage}
                        source={require('../icon/play.png')} />
            </TouchableOpacity>)
    }
    return(
        <View style={styles.container}>
            <View style={styles.playingbarContainer}>
                <PlayingBar isPlaying={isPlaying} theme='gray'/>
            </View>

            <View style={[styles.mainContainer, {opacity:isLoaded?1:0.5}]}>

                <View style={styles.leftPadding}/>
                <View style={[styles.albumContainer,{height:minibarSize-10, width:minibarSize-10, backgroundColor:'green'}]}>
                    {/*<Image style={styles.circle} 
                        source={require('../image/circle2.jpg')}  />
                    <Image style={styles.albumImage}
    source={require('../image/owl2.jpg')}  />*/}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.albumTitle}>
                        {albumTitle}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.controllerContainer}>
                        <View style={styles.leftPadding}/>
                        
                        {getButton(props)}

                        <TouchableOpacity style={styles.buttonItem}
                            onPress={()=>{handleNext({})}}>
                            <Image style={styles.buttonItemImage}
                                    source={require('../icon/next.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonItem}
                            onPress={()=>{
                                //handleNext({index})
                                handleNext({index:index+1})
                                //AudioActions.next({infoNumber:1, index})
                            }}>
                                <Image style={styles.addItemImage}
                                    source={require('../icon/add.png')} />
                        </TouchableOpacity>
                        <View style={styles.rightPadding}/>
                    </View>
                </View>
                <View style={styles.rightPadding}/>

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    },
    playingbarContainer:{
        height:10,
        width:'100%',
    },
    mainContainer:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#ddd',

        backgroundColor:'#F2EFEF',
    },

    leftPadding:{
        left:0,
        height:'100%',
        width:'6%',
    },
    rightPadding:{
        right:0,
        height:'100%',
        width:10
    },


    albumContainer:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    albumImage:{
        position:'absolute',
        height:'40%',
        width:'40%',
        resizeMode:'contain'
    },
    circle:{
        position:'absolute',
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    },


    titleContainer:{
        flex:1,
        justifyContent:'center',
        paddingLeft:20
    },
    title:{
        fontSize:15,
        fontWeight:'bold',
        color:'#121111'
    },
    albumTitle:{
        fontSize:10,
        color:'#767171'
    },

    buttonContainer:{
        width:140,
        height:'100%',
        flexDirection:'column',
        height:'80%',
        alignSelf:'center'
    },
    controllerContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    
    buttonTestItem:{
        flex:1,
        height:'100%',
        borderWidth:1,
        borderColor:'#000',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonItem:{
        flex:1,
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
    },
    buttonItemImage:{
        width:'100%',
        height:'70%',
        resizeMode:'contain'
    },
    addItemImage:{
        width:'40%',
        height:'70%',
        resizeMode:'contain'
    },

    testing1:{
        flex:1,
        height:'100%',
        backgroundColor:'#f00',
        borderWidth:1,
        borderColor:'#777'
    },

    testing2:{
        flex:1,
        height:'100%',
        backgroundColor:'#00f',
        borderWidth:1,
        borderColor:'#777'
    },


})


export default MiniPlayingbar