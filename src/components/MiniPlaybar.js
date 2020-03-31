import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import deviceCheck from '../deviceCheck'
import PlayingBar from './PlayingBar'
import { AudioActions } from '../store/actionCreator'


const MiniPlayingbar = (props)=>{
    //const {title, list, index, url} = props

    const { isPlaying, playinfo, getTime } = props
    const { list, index } = playinfo
    const { title } = list ? list[index] : 'none'
    const PLAYBACK_LIMIT = 5000
    
    const getButton = (props) =>{
        const {isPlaying, handleResume, handlePause} = props
        if(isPlaying === 1)
            return (
                <TouchableOpacity style={styles.testing1}
                    onPress={()=>{handlePause({infoNumber:1}) }}>
                    <Text>ST</Text>
                </TouchableOpacity>)
        return (
            <TouchableOpacity style={styles.testing2}
                onPress={()=>{handleResume({infoNumber:1})}} >
                <Text>PY</Text>
            </TouchableOpacity>)
    }
    return(
        <View style={styles.container}>
            <View style={styles.playingbarContainer}>
                <PlayingBar playinfo={playinfo} infoNumber={1} isPlaying={isPlaying} theme='gray'/>
            </View>
            <View style={styles.mainContainer}>

                <View style={styles.leftPadding}/>
                <View style={styles.albumContainer}>
                    <Image style={styles.circle} 
                        source={require('../image/circle2.jpg')}
                    />
                    <Image style={styles.albumImage}
                        source={require('../image/owl2.jpg')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.controllerContainer}>
                        <View style={styles.leftPadding}/>
                        <TouchableOpacity style={styles.testing1}
                            onPress={()=>{
                                if(getTime() < PLAYBACK_LIMIT)
                                    AudioActions.replay()
                                else
                                    AudioActions.next({infoNumber:1, index})
                            }}>
                        </TouchableOpacity>
                        
                        {getButton(props)}

                        <TouchableOpacity style={styles.testing1}
                            onPress={()=>{AudioActions.next({infoNumber:1})}}>
                        </TouchableOpacity>
                        <View style={styles.rightPadding}/>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {index} : {title}
                        </Text>
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
    },
    playingbarContainer:{
        height:20,
        width:'100%',
    },
    mainContainer:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#ddd',
        justifyContent:'center',
        alignContent:'center',

        backgroundColor:'#c0c0c0',
    },

    leftPadding:{
        left:0,
        height:'100%',
        width:'15%',
    },
    rightPadding:{
        right:0,
        height:'100%',
        width:'15%',
    },


    albumContainer:{
        flex:1,
        height:'80%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
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

    buttonContainer:{
        flex:3,
        flexDirection:'column',
        height:'80%',
        alignSelf:'center',
    },
    controllerContainer:{
        flex:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
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

    titleContainer:{
        flex:1,
    },
    title:{
        textAlign:'center',
        fontSize:11
    }

})


export default MiniPlayingbar